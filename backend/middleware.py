from pathlib import Path
from fractions import Fraction
from data import OrganDt, Patient, DrugHist

import os
import websockets

import argparse, asyncio, concurrent, functools, json, logging, os, re, sys, threading, time

base_dir     = Path(__file__).parents[0]
psepsis_pgm  = base_dir     / 'psepsis.medik'
medik_dir    = base_dir     / 'ext'          / 'medik-semantics'
kompiled_dir = medik_dir    / '.build'       / 'llvm-exec'      / 'medik-llvm-kompiled'
krelease_dir = medik_dir    / 'ext'          / 'k'              / 'k-distribution'      / 'target' / 'release' / 'k'
kbin_dir     = krelease_dir / 'bin'

def set_env():
    path_entires = [ kbin_dir ]
    os.environ['PATH'] = str(kbin_dir.resolve()) \
                                + os.pathsep + os.environ['PATH']


class StubProcess:
    async def launch(self):
        tasks = []
        try:
            with open(self.stub_file_path, 'r') as stub_file:
                self.commands = map(lambda x: json.loads(x), stub_file.readlines())

            tasks += [asyncio.create_task(self.feed_commands(), name='stub-feed-commands')]
            tasks += [asyncio.create_task(self.read_commands(), name='stub-read-commands')]

            await asyncio.gather(*tasks)
        except Exception as e:
            print(str(e))
            for task in tasks:
                if not task.cancelled():
                    print('cancelling task {}'.format(str(task.get_name())))
                    task.cancel()



    async def feed_commands(self):
        for command in self.commands:
            await self.feed_event.wait()
            print('==== putting in to-app queue {}'.format(json.dumps(command, indent=2)))
            await self.to_app_queue.put(command)
            print('=== Successfully sent ===')
            self.feed_event.clear()

    async def read_commands(self):
        to_k = await self.to_k_queue.get()
        print('==== Got from app {}'.format(to_k))
        self.feed_event.set()

    async def broadcast(self, interface_id, name, args):
        await self.to_k_queue.put( { 'id'        : interface_id
                                   , 'action'    : 'broadcast'
                                   , 'eventName' : name
                                   , 'eventArgs' : args })


    def __init__(self, stub_file_path, to_app_queue):
        set_env()
        self.to_app_queue = to_app_queue
        self.to_k_queue = asyncio.Queue()
        self.stub_file_path = stub_file_path
        self.feed_event = asyncio.Event()
        self.feed_event.clear()


class MedikProcess:
    async def parse_json_stream(self, json_stream):
        open_brace_count  = 0
        close_brace_count = 0
        last_scan_index   = 0
        json_byte_str     = b''
        while True:
            logging.info("awaiting for json stream")
            json_byte_str     += await json_stream.readuntil(b'}')
            open_brace_count  += json_byte_str.count(b'{', last_scan_index)
            close_brace_count += json_byte_str.count(b'}', last_scan_index)
            if len(json_byte_str) == 0:
                logging.info("return from parse_json_stream")
                return None
            if open_brace_count == close_brace_count:
                obj = json.loads(json_byte_str)
                json_byte_str       = b''
                last_scan_index   = 0
                open_proce_count  = 0
                close_brace_count = 0
                logging.info('read {}'.format(json.dumps(obj, indent=2)))
                logging.info('json object: ' + str(obj))
                return obj
            last_scan_index = len(json_byte_str)


    async def _sleep(self, k_process, duration, tid):
        logging.info('sleeping for duration {} for tid {}'.format(duration, tid))
        await asyncio.sleep(duration)
        k_process.stdin.write(json.dumps({ 'tid'    : tid
                                         , 'action' : 'sleepResponse' }, sort_keys=True).encode('utf-8'))
        await k_process.stdin.drain()
        logging.info('sleep complete message sent for tid {}'.format(tid))

    def process_rats(self, out_json):
        if out_json.get('args') != None:
            processed_args = []
            rat_re = re.compile(r'\<(-?\d+),(\d+)\>Rat')
            for arg in out_json['args']:
                if isinstance(arg, str) and rat_re.match(arg) != None:
                    rat_match = rat_re.match(arg)
                    processed_args.append(Fraction( int(rat_match.group(1))
                                                  , int(rat_match.group(2))))
                else:
                    processed_args.append(arg)
            out_json['args'] = processed_args
        return out_json

    async def read_stdout(self, k_process):
        try:
            while True:
                print('awaiting input from json stream')
                out_json = await self.parse_json_stream(k_process.stdout)
                if out_json == None:
                    break;
                processed_json = self.process_rats(out_json)
                match out_json.get('action'):
                    case 'print':
                        print(*out_json['args'], end='', flush=True)
                    case 'sleep':
                        sleep_task = asyncio.create_task(self._sleep( k_process
                                                                    , out_json['duration']
                                                                    , out_json['tid']))
                    case 'exit':
                        break
                    case _:
                        match out_json.get('name'):
                            case 'Instruct':
                                print('putting to from-k-queue -  {}'.format(json.dumps(out_json)))
                                await self.to_app_queue.put(out_json)
                                print('put to from k queue successful')
                            case 'Obtain':
                                print('Not implemented yet!')

        except asyncio.CancelledError:
            return None


    async def read_stderr(self, k_process):
        try:
            while True:
                print('awaiting for stderr')
                err = await k_process.stderr.read()
                if not err:
                    break
                else:
                    sys.stderr.write(err.decode('utf-8'))
                    sys.stderr.flush()
        except asyncio.CancelledError:
            print('read std_err task cancelled')
            return None


    async def write_stdin(self, k_process):
        try:
            while True:
                print('awaiting for data to send to k')
                in_data = await self.to_k_queue.get()
                print('sending to k: {}'.format(json.dumps(in_data, indent=2)))
                k_process.stdin.write(json.dumps(in_data).encode('utf-8'))
                await k_process.stdin.drain()
                print('sending to k complete')
                if in_data.get('action') == 'exit':
                    break
        except asyncio.CancelledError:
            return None

    async def launch(self):
        k_command = ( 'krun' , ['-d' , str(kompiled_dir.resolve())
                               , '--output' , 'none'
                               , str(psepsis_pgm.resolve()) ])
        tasks = None
        try:
            k_process = await asyncio.create_subprocess_exec( k_command[0]
                                                            , *k_command[1]
                                                            , stdin=asyncio.subprocess.PIPE
                                                            , stdout=asyncio.subprocess.PIPE
                                                            , stderr=asyncio.subprocess.PIPE)

            tasks = [asyncio.create_task(self.write_stdin(k_process), name='write-stdin')]
            tasks += [asyncio.create_task(self.read_stdout(k_process), name='read-stdout')]
            tasks += [asyncio.create_task(self.read_stderr(k_process), name='read-stderr')]

            await asyncio.gather(*tasks)
        except Exception as e:
            print(str(e))
            for task in tasks:
                if not task.cancelled():
                    print('cancelling task {}'.format(str(task.get_name())))
                    task.cancel()


    async def broadcast(self, interface_id, name, args):
        await self.to_k_queue.put( { 'id'        : interface_id
                                   , 'action'    : 'broadcast'
                                   , 'eventName' : name
                                   , 'eventArgs' : args })

    def __init__(self, to_app_queue):
        set_env()
        self.to_app_queue = to_app_queue
        self.to_k_queue = asyncio.Queue()


class AppProcess:

    def __init__(self, ws_port, k_process, to_app_queue):
        self.ws_port = ws_port
        self.k_process = k_process
        self.interface_id = 'tabletApp'

        self.to_app_queue = to_app_queue


    async def to_app_handler(self, websocket):
        while True:
            to_app = await self.to_app_queue.get()
            await websocket.send(json.dumps(to_app))


    async def from_app_handler(self, websocket):
        async for message in websocket:
            message_json = json.loads(message)
            await k_process.broadcast( self.interface_id
                                     , message_json['eventName']
                                     , message_json.get('eventArgs', []))

    async def setup_connections(self, websocket):
        to_app_task = asyncio.create_task(self.to_app_handler(websocket))
        from_app_task = asyncio.create_task(self.from_app_handler(websocket))
        done, pending = await asyncio.wait(
                            [to_app_task, from_app_task],
                            return_when=asyncio.FIRST_COMPLETED,
                        )
        for task in pending:
            task.cancel()

    async def start(self):
        async with websockets.serve(self.setup_connections, '0.0.0.0', self.ws_port):
            await asyncio.Future()

class DataPortalProcess:

    def __init__(self, ws_port, k_process, to_app_queue):
        self.ws_port = ws_port
        self.k_process = k_process
        self.to_app_queue = to_app_queue

        self.organ_dt = OrganDt()

    async def from_portal_handler(self, websocket):
        async for message in websocket:
            message_json = json.loads(message)
            print('Recv from portal: {}'.format(message_json))
            self.organ_dt.update(message_json['measurement']
                               , message_json['timeStamp']
                               , message_json['value'])
            await self.to_app_queue.put({
                    "name": "OrganUpdate",
                    "args": [ self.organ_dt.get_all() ],
                })

    async def setup_connections(self, websocket):
        from_portal_task = asyncio.create_task(self.from_portal_handler(websocket))
        done, pending = await asyncio.wait([from_portal_task]
                                          , return_when=asyncio.FIRST_COMPLETED,)
        for task in pending:
            task.cancel()

    async def start(self):
        async with websockets.serve(self.setup_connections, '0.0.0.0', self.ws_port):
            await asyncio.Future()


async def main(app_process, k_process, portal_process):
    await asyncio.gather(app_process.start()
                       , k_process.launch()
                       , portal_process.start())

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='PSepsis Middleware')
    parser.add_argument( '-dp'
                       , '--data-port'
                       , metavar='PORT'
                       , type=int
                       , help='Port to accept data portal connections'
                       , default=4124)
    parser.add_argument( '-up'
                       , '--user-port'
                       , metavar='PORT'
                       , type=int
                       , help='Port to accept user app connections'
                       , default=4123)
    parser.add_argument( '-ts'
                       , '--stub'
                       , metavar='STUB_FILE'
                       , help='Path to stub containing simulate k messages' )

    args = parser.parse_args()
    to_app_queue = asyncio.Queue()
    if args.stub:
        k_process = StubProcess(args.stub, to_app_queue)
    else:
        k_process = MedikProcess(to_app_queue)
    app_process = AppProcess(args.user_port, k_process, to_app_queue)
    portal_process = DataPortalProcess(args.data_port, k_process, to_app_queue)
    asyncio.run(main(app_process, k_process, portal_process))
