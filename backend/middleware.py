from pathlib import Path
from fractions import Fraction
from data import OrganDt, Patient, DrugHist
from backend_env import kompiled_dir, psepsis_pgm, set_env
from wrapper import MedikWrapper

import os
import websockets

import argparse, asyncio, concurrent, functools, json, logging, os, re, sys, threading, time

#==== Common Helpers =====

def _broadcast(interface_id, event_name, event_args=[]):
        return [{ 'id'        : interface_id
                , 'action'    : 'broadcast'
                , 'eventName' : event_name
                , 'eventArgs' : event_args }]

def _obtain_response(tid, interface_id, args):
        return  [{ 'tid'       : tid
                 , 'id'        : inteface_id
                 , 'result'    : 'obtainResponse'
                 , 'args'      : args }]

def _sleep_response(tid):
    return [{ 'action' : 'sleepReponse'
            , 'tid'    : tid }]


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
            #print(str(e))
            for task in tasks:
                if not task.cancelled():
                    #print('cancelling task {}'.format(str(task.get_name())))
                    task.cancel()



    async def feed_commands(self):
        for command in self.commands:
            await self.feed_event.wait()
            #print('==== putting in to-app queue {}'.format(json.dumps(command, indent=2)))
            await self.to_app_queue.put(command)
            #print('=== Successfully sent ===')
            self.feed_event.clear()

    async def read_commands(self):
        to_k = await self.to_k_queue.get()
        #print('==== Got from app {}'.format(to_k))
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


class MedikHandler(MedikWrapper):

    async def _sleep(self, duration, tid):
        logging.info('sleeping for duration {} for tid {}'.format(duration, tid))
        await asyncio.sleep(duration)
        await self.to_k_queue.put(_sleep_response(tid))
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

    async def handle_from_k(self):
        while True:
            from_k_json = await self.from_k_queue.get()
            if from_k_json == None:
                break
            processed_json = self.process_rats(from_k_json)
            if 'action' in processed_json.keys():
                match processed_json['action']:
                    case 'print':
                        print(*out_json['args'], end='', flush=True)
                    case 'sleep':
                        asyncio.create_task(self._sleep( processed_json['duration']
                                                       , processed_json['tid']))

            if 'name' in processed_json.keys():
                match processed_json['name']:
                    case 'Obtain':
                        raise RuntimeError('Obtain not implemented!')
                    case _:
                        await self.to_app_queue.put(processed_json)

    def __init__(self, to_k_queue, from_k_queue, to_app_queue, kompiled_dir, psepsis_pgm):
        super().__init__(to_k_queue, from_k_queue, kompiled_dir, psepsis_pgm)
        self.to_app_queue = to_app_queue


class AppProcess:

    def __init__(self, ws_port, to_k_queue, to_app_queue):
        self.ws_port = ws_port
        self.to_k_queue = to_k_queue
        self.interface_id = 'tabletApp'
        self.to_app_queue = to_app_queue


    async def to_app_handler(self, websocket):
        while True:
            to_app = await self.to_app_queue.get()
            await websocket.send(json.dumps(to_app))


    async def from_app_handler(self, websocket):
        async for message in websocket:
            message_json = json.loads(message)
            await to_k_queue.put(_broadcast( self.interface_id
                                           , message_json['eventName']
                                           , message_json.get('eventArgs'
                                                             , [])))

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

    def __init__(self, ws_port, to_k_queue, to_app_queue):
        self.ws_port = ws_port
        self.to_k_queue = to_k_queue
        self.to_app_queue = to_app_queue

        self.organ_dt = OrganDt()

    async def from_portal_handler(self, websocket):
        async for message in websocket:
            message_json = json.loads(message)
            #print('Recv from portal: {}'.format(message_json))
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

    from_k_queue = asyncio.Queue()
    to_k_queue = asyncio.Queue()
    to_app_queue = asyncio.Queue()

    if args.stub:
        k_process = StubProcess(args.stub, to_app_queue)
    else:
        set_env()
        k_process = MedikHandler(to_k_queue, from_k_queue, to_app_queue, kompiled_dir, psepsis_pgm)
    app_process = AppProcess(args.user_port, to_k_queue, to_app_queue)
    portal_process = DataPortalProcess(args.data_port, to_k_queue, to_app_queue)
    asyncio.run(main(app_process, k_process, portal_process))
