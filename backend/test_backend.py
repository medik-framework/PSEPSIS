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

async def do_send(to_k_queue, msg):
    if 'waitFor' in msg.keys():
        msg.pop('waitFor')
    await to_k_queue.put([msg])

def drain_queue(from_k_queue, out):
    while not from_k_queue.empty():
        out_json = from_k_queue.get_nowait()
        process_json(out_json, out)

def create_obtain_response(out_json, data):
    return  { 'tid'    : out_json['tid']
            , 'id'     : out_json['id']
            , 'result' : 'obtainResponse'
            , 'args'   : data.get_value(out_json['args'][0]) }

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
    exit_with_msg = functools.partial(do_exit, medik_process, medik_task, out)
    exit_flag = False
    i = 0
    while not medik_task.done():
        out_json = await asyncio.wait_for(from_k_queue.get(), timeout=15)
        out_json_copy = copy.deepcopy(out_json)
        process_json(out_json, out)
        if out_json.get('name') == 'Obtain':
            if data == None:
                raise RuntimeError('Need datastore to run test')
            await do_send(to_k_queue, create_obtain_response(out_json_copy, data))
            continue
        in_json = in_jsons[i]
        if 'action' in in_json.keys() and in_json['action'] == 'exit':
            exit_flag = True

        if 'waitFor' in in_json.keys():
            if in_json['waitFor'].items() <= out_json.items():
                if exit_flag:
                    await exit_with_msg(in_json)
                    break
                else:
                    await do_send(to_k_queue, in_json)
                i += 1
            continue

        # Exit without wait-for
        if exit_flag:
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

# ==== Tests =====

@pytest.mark.asyncio
async def test_get_age():
    await run_test('get-age')

@pytest.mark.asyncio
async def test_get_age_weight_hrc():
    await run_test('get-age-weight-hrc')

@pytest.mark.asyncio
async def test_screening_negative():
    await run_test('screening-negative')
