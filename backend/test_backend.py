from wrapper import MedikWrapper
from pathlib import Path


import asyncio, copy, pytest, json, sys, os
import functools

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

def process_json(out_json, out):
    if 'action' in out_json.keys() and out_json['action'] == 'print':
        print(*out_json['args'])
        return
    if out_json.get('name') == 'StartGUI':
        print('+++ Medik Ready')
        return
    if 'tid' in out_json.keys():
        out_json.pop('tid')
    out.append(out_json)
    print('+++++ test_backend: added to actual out {}'.format(json.dumps(out_json)))

async def do_send(to_k_queue, msg):
    if 'waitFor' in msg.keys():
        msg.pop('waitFor')
    print('++++ adding to queue {}'.format(json.dumps([msg])))
    await to_k_queue.put([msg])
    print('++++ add to queue successful')
    #await asyncio.sleep(0.1)

def drain_queue(from_k_queue, out):
    while not from_k_queue.empty():
        out_json = from_k_queue.get_nowait()
        process_json(out_json, out)

def create_obtain_response(out_json, data):
    print('+++++ Creating obtain response')
    response =  { 'tid'    : out_json['tid']
                , 'id'     : out_json['id']
                , 'result' : 'obtainResponse'
                , 'args'   : data.get_value(out_json['args'][0]) }
    print('+++++ Obtain response: {}'.format(json.dumps(response)))
    return response

async def do_exit(medik_process, medik_task, out, exit_msg):
    await do_send(medik_process.to_k_queue, exit_msg)
    await asyncio.gather(medik_task)
    drain_queue(medik_process.from_k_queue, out)

async def medik_interact(in_jsons, data=None):
    set_env()
    out = []


    from_k_queue = asyncio.Queue()
    to_k_queue = asyncio.Queue()
    medik_process = MedikWrapper(to_k_queue, from_k_queue, kompiled_dir, psepsis_pgm)
    medik_task = asyncio.create_task(medik_process.launch())
    #print('+++= 1st message {}'.format(json.dumps(in_jsons[0])))
    #await medik_process.to_k_queue.put(in_jsons[0])
    #print('+++= 1st sent')
    exit_with_msg = functools.partial(do_exit, medik_process, medik_task, out)
    exit_flag = False
    i = 0
    while not medik_task.done():
        print('+++++ waiting for a message from k')
        out_json = await asyncio.wait_for(from_k_queue.get(), timeout=15)
        print('+++++ got from k {}'.format(json.dumps(out_json)))
        out_json_copy = copy.deepcopy(out_json)
        print('+++++ Copy is {}'.format(json.dumps(out_json_copy)))
        process_json(out_json, out)
        if out_json.get('name') == 'Obtain':
            if data == None:
                raise RuntimeError('Need datastore to run test')
            print('+++ Got an obtain message')
            await do_send(to_k_queue, create_obtain_response(out_json_copy, data))
            continue
        in_json = in_jsons[i]
        if 'action' in in_json.keys() and in_json['action'] == 'exit':
            exit_flag = True

        if 'waitFor' in in_json.keys():
            if in_json['waitFor'].items() <= out_json.items():
                # the waitFor is satisfied -> send
                #print('+++= sending {}'.format(json.dumps(in_json)))
                # If exit_flag set, then send exit
                if exit_flag:
                    await exit_with_msg(in_json)
                    break
                else:
                    print('++++ sending message after wait-for')
                    await do_send(to_k_queue, in_json)
                i += 1
            continue

        # Exit without wait-for
        if exit_flag:
            #print('+++= sending exit {}'.format(json.dumps(in_json)))
            #await do_send(medik_process, in_json)
            #print('+++= sent exit')
            #print('+++ waiting for medik task to exit')
            #await asyncio.gather(medik_task)
            #print('+++++ waiting asyncio gather successful')
            #drain_queue(from_k_queue, out)
            #break
            await exit_with_msg(in_json)
            break

        await do_send(to_k_queue, in_json)
        i += 1

    return out


class MockUser:
    def __init__(self, input_file_path):
        with open(input_file_path) as input_file:
            self.json_list = json.loads(input_file.read())

class Expected:
    def __init__(self, expected_file_path):
        with open(expected_file_path) as expected_file:
            self.json_list = json.loads(expected_file.read())

class MockDataStore:
    def __init__(self, data_file_path):
        with open(data_file_path) as data_file:
            self.data = json.loads(data_file.read())

    def get_value(self, measurement_name):
        if measurement_name in self.data.keys():
            return self.data[measurement_name]
        else:
            return None

def get_in(test_name):
    return MockUser('tests/' + test_name + '.psepsis.in')

def get_expected(test_name):
    return Expected('tests/' + test_name + '.psepsis.expected')

async def run_test(test_name):
    mock_data = None
    if os.path.exists('tests/' + test_name + '.psepsis.data'):
        print('+++ Using mock data for {}'.format(test_name))
        mock_data = MockDataStore('tests/' + test_name + '.psepsis.data')
    try:
        out = await medik_interact(get_in(test_name).json_list, mock_data)
    except TimeoutError:
        assert False
    assert out == get_expected(test_name).json_list

# +++== Tests =====

@pytest.mark.asyncio
async def test_get_age():
    await run_test('get-age')

@pytest.mark.asyncio
async def test_get_age_weight_hrc():
    await run_test('get-age-weight-hrc')

@pytest.mark.asyncio
async def test_screening_negative():
    await run_test('screening-negative')
