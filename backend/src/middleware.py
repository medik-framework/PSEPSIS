from pathlib import Path
from fractions import Fraction

import argparse, asyncio, concurrent, functools, json, logging, os, re, sys, threading, time

base_dir     = Path(__file__).parents[0]
psepsis_pgm  = base_dir     / 'psepsis.medik'
medik_dir    = base_dir     / 'ext'           / 'medik-semantics'
kompiled_dir = medik_dir    / '.build'        / 'medik-kompiled'
krelease_dir = medik_dir    / 'ext'           / 'k' / 'k-distribution' / 'target' / 'release' / 'k'
kbin_dir     = krelease_dir / 'bin'

def set_env():
    path_entires = [ kbin_dir ]
    os.environ['PATH'] = str(kbin_dir.resolve()) \
                            + os.pathsep + os.environ['PATH']

class MedikProcess:

    async def parse_json_stream(self, json_stream):
        open_brace_count  = 0
        close_brace_count = 0
        last_scan_index   = 0
        json_byte_str       = b''
        while True:
            print("awaiting for json stream")
            json_byte_str     += await json_stream.readuntil(b'}')
            open_brace_count  += json_byte_str.count(b'{', last_scan_index)
            close_brace_count += json_byte_str.count(b'}', last_scan_index)
            if len(json_byte_str) == 0:
                return None
            if open_brace_count == close_brace_count:
                obj = json.loads(json_byte_str)
                json_byte_str       = b''
                last_scan_index   = 0
                open_proce_count  = 0
                close_brace_count = 0
                print('read {}'.format(json.dumps(obj, indent=2)))
                print('json object: ' + str(obj))
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
                        print('putting to from-k-queue'.format(json.dumps(out_json)))
                        await self.from_k_queue.put(out_json)
                        print('put to from k queue successful')
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

    async def _launch_medik(self):
        k_command = ( 'krun' , ['-d' , str(kompiled_dir.resolve())
                               , '--output' , 'none'
                               , str(psepsis_pgm.resolve()) ])
        try:
            k_process = await asyncio.create_subprocess_exec( k_command[0]
                                                            , *k_command[1]
                                                            , stdin=asyncio.subprocess.PIPE
                                                            , stdout=asyncio.subprocess.PIPE
                                                            , stderr=asyncio.subprocess.PIPE)

            tasks = [asyncio.create_task(self.write_stdin(k_process), name='write-stdin')]
            tasks += [asyncio.create_task(self.read_stdout(k_process), name='read-stdout')]
            tasks += [asyncio.create_task(self.read_stderr(k_process), name='read-stderr')]

            print('is loop running? {}'.format(self.event_loop.is_running()))
            await asyncio.gather(*tasks)
        except Exception as e:
            print(str(e))
            for task in tasks:
                if not task.cancelled():
                    print('cancelling task {}'.format(str(task.get_name())))
                    task.cancel()

    def launch_medik(self):
        self.event_loop.run_until_complete(self._launch_medik())
        print('loop completed')

    def __init__(self, event_loop):
        set_env()
        self.from_k_queue = asyncio.Queue()
        self.to_k_queue = asyncio.Queue()
        self.event_loop = event_loop

