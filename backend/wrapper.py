# Simple Wrapper Around the K process running Medik
from fractions import Fraction

import  asyncio, json, logging, re, sys

class MedikWrapper:

    async def parse_json_stream(self, json_stream):
        open_brace_count  = 0
        close_brace_count = 0
        last_scan_index   = 0
        json_byte_str     = b''
        try:
            while True:
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
                    return obj
                last_scan_index = len(json_byte_str)
        except asyncio.IncompleteReadError:
            return

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

    async def read_stdout(self):
        try:
            while True:
                out_json = await self.parse_json_stream(self.k_process.stdout)
                if out_json == None:
                    break;
                processed_json = self.process_rats(out_json)
                await self.from_k_queue.put(processed_json)
        except asyncio.CancelledError:
            return None


    async def read_stderr(self):
        try:
            while True:
                err = await self.k_process.stderr.read()
                if len(err) == 0:
                    break
                else:
                    sys.stderr.write(err.decode('utf-8'))
                    sys.stderr.flush()
        except asyncio.CancelledError:
            return None


    async def write_stdin(self):
        try:
            while True:
                in_data = await self.to_k_queue.get()
                in_data_str = (json.dumps(in_data,separators=(',',':')) + '\n').encode('utf-8')
                self.k_process.stdin.write(in_data_str)
                await self.k_process.stdin.drain()
                if in_data[0].get('action') == 'exit':
                    self.k_process.stdin.close()
                    await self.k_process.stdin.wait_closed()
                    break
        except asyncio.CancelledError:
            return None

    async def launch(self):
        k_command = ( 'krun' , ['-d' , str(self.kompiled_dir.resolve())
                             , '--output' , 'none'
                             , str(self.psepsis_pgm.resolve()) ])
        tasks = None
        try:
            self.k_process = await asyncio.create_subprocess_exec( k_command[0]
                                                                 , *k_command[1]
                                                                 , stdin=asyncio.subprocess.PIPE
                                                                 , stdout=asyncio.subprocess.PIPE
                                                                 , stderr=asyncio.subprocess.PIPE)

            tasks = [asyncio.create_task(self.write_stdin(), name='write-stdin')]
            tasks += [asyncio.create_task(self.read_stdout(), name='read-stdout')]
            tasks += [asyncio.create_task(self.read_stderr(), name='read-stderr')]
            await asyncio.gather(*tasks)

        except CancelledError as e:
            for task in tasks:
                if not task.cancelled():
                    task.cancel()

    def __init__(self, to_k_queue, from_k_queue, kompiled_dir, psepsis_pgm):
        self.from_k_queue = from_k_queue
        self.to_k_queue = to_k_queue
        self.kompiled_dir = kompiled_dir
        self.psepsis_pgm = psepsis_pgm

