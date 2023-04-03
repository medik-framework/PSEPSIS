# Simple Wrapper Around the K process running Medik
from fractions import Fraction

import  asyncio, subprocess, functools, json, logging, sys, utils

class ExecutionWrapper:

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
                    obj = utils.json_rat_strs_to_fractions(json.loads(json_byte_str))
                    json_byte_str     = b''
                    last_scan_index   = 0
                    open_proce_count  = 0
                    close_brace_count = 0
                    return obj
                last_scan_index = len(json_byte_str)
        except asyncio.IncompleteReadError:
            return


    async def read_stdout(self):
        try:
            while True:
                out_json = await self.parse_json_stream(self.k_process.stdout)
                if out_json == None:
                    break;
                logging.info('From Medik: {}'.format(json.dumps( out_json
                                                               , cls=functools.partial( utils.FractionEncoder
                                                                                      , self.rat_fmt))))
                await self.from_k_queue.put(out_json)
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
                in_data_str = json.dumps( in_data,separators=(',',':')
                                        , cls=functools.partial(utils.FractionEncoder, self.rat_fmt))
                logging.info('To MediK: {}'.format(in_data_str))
                self.k_process.stdin.write((in_data_str + '\n').encode('utf-8'))
                await self.k_process.stdin.drain()
                if in_data[0].get('action') == 'exit':
                    self.k_process.stdin.close()
                    await self.k_process.stdin.wait_closed()
                    break
        except asyncio.CancelledError:
            return None

    async def launch(self):
        k_command = ( 'krun' , ['-d' , str(self.kompiled_exec_dir.resolve())
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

        except asyncio.CancelledError as e:
            for task in tasks:
                if not task.cancelled():
                    task.cancel()

        await self.from_k_queue.put('exit')

    def __init__(self, to_k_queue, from_k_queue, kompiled_exec_dir, psepsis_pgm):
        self.from_k_queue = from_k_queue
        self.to_k_queue = to_k_queue
        self.kompiled_exec_dir = kompiled_exec_dir
        self.psepsis_pgm = psepsis_pgm
        self.rat_fmt = '<{},{}>Rat'


class MCheckWrapper:

    def launch(self):
        k_command = [ 'krun' , '-d' , str(self.kompiled_mcheck_dir.resolve())
                             , '--search'
                             , '--pattern', self.search_pattern
                             , str(self.psepsis_pgm.resolve()) ]

        search_result = subprocess.run(k_command, capture_output=True, timeout=200)
        return search_result

    def __init__(self, kompiled_mcheck_dir, psepsis_pgm, search_pattern):
        self.kompiled_mcheck_dir = kompiled_mcheck_dir
        self.psepsis_pgm         = psepsis_pgm
        self.search_pattern      = search_pattern
