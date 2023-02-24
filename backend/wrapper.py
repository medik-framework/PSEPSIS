# Simple Wrapper Around the K process running Medik
import  asyncio, json, logging, sys


class MedikWrapper:

    async def parse_json_stream(self, json_stream):
        open_brace_count  = 0
        close_brace_count = 0
        last_scan_index   = 0
        json_byte_str     = b''
        while True:
            print('==== wrapper: BEFORE await json_stream.readuntil')
            json_byte_str     += await json_stream.readuntil(b'}')
            open_brace_count  += json_byte_str.count(b'{', last_scan_index)
            close_brace_count += json_byte_str.count(b'}', last_scan_index)
            print('==== wrapper: AFTER await json_stream.readuntil with {}'.format(json_byte_str))
            if len(json_byte_str) == 0:
                print('==== wrapper: RETURN from parse_json_stream')
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

#    async def parse_json_stream(self, json_stream):
#        open_brace_count  = 0
#        close_brace_count = 0
#        last_scan_index   = 0
#        json_byte_str     = b''
#
#        while True:
#            json_byte_str     += await json_stream.readuntil(b'}')
#            open_brace_count  += json_byte_str.count(b'{', last_scan_index)
#            close_brace_count += json_byte_str.count(b'}', last_scan_index)
#            if len(json_byte_str) == 0:
#                return None
#            if open_brace_count == close_brace_count:
#                obj = json.loads(json_byte_str)
#                json_byte_str       = b''
#                last_scan_index   = 0
#                open_proce_count  = 0
#                close_brace_count = 0
#                return obj
#            last_scan_index = len(json_byte_str)
#
#        # read remaining data from the stream
#        json_byte_str     += await json_stream.readuntil(b'}')


    async def read_stdout(self, k_process):
        try:
            while True:
                print("=== wrapper: BEFORE k_process.stdout.parse_json_stream")
                out_json = await self.parse_json_stream(k_process.stdout)
                print('=== wrapper: AFTER k_process.stdout.parse_json_stream with data {}'.format(json.dumps(out_json)))
                if out_json == None:
                    break;
                print("=== wrapper: BEFORE from_k_queue.put()")
                await self.from_k_queue.put(out_json)
                print('=== wrapper: AFTER from_k_queue.put() with {}'.format(json.dumps(out_json)))
        except asyncio.CancelledError:
            return None
        except asyncio.IncompleteReadError:
            print('=== Returning from read stdout ')


    async def read_stderr(self, k_process):
        try:
            while True:
                err = await k_process.stderr.read()
                print('=== std error returned')
                if len(err) == 0:
                    break
                else:
                    print('==== wrapper: got error {}'.format(err))
                    sys.stderr.write(err.decode('utf-8'))
                    sys.stderr.flush()
        except asyncio.CancelledError:
            return None


    async def write_stdin(self, k_process):
        try:
            while True:
                print('==== wrapper: BEFORE await to_k_queue.get() ')
                in_data = await self.to_k_queue.get()
                print('==== wrapper: AFTER await to_k_queue.get() with data {}'.format(json.dumps(in_data)))
                in_data_str = (json.dumps(in_data,separators=(',',':')) + '\n').encode('utf-8')
                with open('wrapper-mock-in.json', 'wb+') as wrapper_mock_in_file:
                    print('==== wrapper: wrriting to file {}'.format(in_data_str))
                    wrapper_mock_in_file.write(in_data_str)
                print('==== wrapper: writing data {}:'.format(in_data_str))
                k_process.stdin.write(in_data_str)
                print('==== wrapper: BEFORE await k_process.stdin.drain()')
                await k_process.stdin.drain()
                print('==== wrapper: AFTER await k_process.stdin.drain()')
                if in_data[0].get('action') == 'exit':
                    print('=== wrapper: exiting')
                    k_process.stdin.close()
                    await k_process.stdin.wait_closed()
                    print('=== wrapper: After closing stdin')
                    break
        except asyncio.CancelledError:
            return None

    async def launch(self):
        k_command = ( 'krun' , ['-d' , str(self.kompiled_dir.resolve())
                              , '--output' , 'none'
                               , str(self.psepsis_pgm.resolve()) ])
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
            print('=== wrapper: Done with gathering tasks')
        except Exception as e:
            print('===== wrapper: exception {}'.format(str(e)))
            for task in tasks:
                if not task.cancelled():
                    task.cancel()

    def __init__(self, to_k_queue, from_k_queue, kompiled_dir, psepsis_pgm):
        self.from_k_queue = from_k_queue
        self.to_k_queue = to_k_queue
        self.kompiled_dir = kompiled_dir
        self.psepsis_pgm = psepsis_pgm

