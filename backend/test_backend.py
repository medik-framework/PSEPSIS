from wrapper import MedikWrapper
from backend_env import kompiled_dir, psepsis_pgm, set_env

import asyncio, copy, pytest, json, logging, sys, os
import functools

ignored_names = ['StartGUI']

def process_json(out_json, out):
    if 'action' in out_json.keys():
        match out_json['action']:
            case 'print':
                print(*out_json['args'], end='')
            case 'sleep':
                pass
        return
    event_name = out_json.get('name')
    if event_name in ignored_names:
        return
    if 'tid' in out_json.keys():
        out_json.pop('tid')
    out.append(out_json)

async def do_send(to_k_queue, data, msg):
    if 'waitFor' in msg.keys():
        msg.pop('waitFor')
    if 'updateData' in msg.keys():
        data.set_value(msg['updateData']['name'], msg['updateData']['args'])
        msg.pop('updateData')

    await to_k_queue.put([msg])

def drain_queue(from_k_queue, out):
    while not from_k_queue.empty():
        out_json = from_k_queue.get_nowait()
        if out_json != 'exit':
            process_json(out_json, out)

def create_obtain_response(out_json, data):
    return  { 'tid'    : out_json['tid']
            , 'id'     : out_json['id']
            , 'result' : 'obtainResponse'
            , 'args'   : data.get_value(out_json['args'][0]) }

async def do_exit(medik_process, medik_task, out, data, exit_msg):
    await do_send(medik_process.to_k_queue, data, exit_msg)
    await asyncio.gather(medik_task)
    drain_queue(medik_process.from_k_queue, out)

async def medik_interact(in_jsons, data=None):
    set_env()
    out = []


    from_k_queue = asyncio.Queue()
    to_k_queue = asyncio.Queue()
    medik_process = MedikWrapper(to_k_queue, from_k_queue, kompiled_dir, psepsis_pgm)
    medik_task = asyncio.create_task(medik_process.launch())
    exit_with_msg = functools.partial(do_exit, medik_process, medik_task, out, data)
    send_msg = functools.partial(do_send, to_k_queue, data)
    exit_flag = False
    i = 0
    while not medik_task.done():
        out_json = await asyncio.wait_for(from_k_queue.get(), timeout=15)
        if out_json == 'exit':
            break
        out_json_copy = copy.deepcopy(out_json)
        process_json(out_json, out)
        if out_json.get('name') == 'Obtain':
            if data == None:
                raise RuntimeError('Need datastore to run test')
            await send_msg(create_obtain_response(out_json_copy, data))
            continue
        if out_json.get('action') == 'sleep':
            await send_msg({'action':'sleepResponse', 'tid':out_json['tid']})
            continue

        in_json = in_jsons[i]
        if 'action' in in_json.keys() and in_json['action'] == 'exit':
            exit_flag = True

        if 'waitFor' in in_json.keys():
            logging.info('Waiting to send {}'.format(json.dumps(in_json)))
            if in_json['waitFor'].items() <= out_json.items():
                if exit_flag:
                    await exit_with_msg(in_json)
                    break
                else:
                    await send_msg(in_json)
                i += 1
            continue

        # Exit without wait-for
        if exit_flag:
            await exit_with_msg(in_json)
            break

        await send_msg(in_json)
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

    def set_value(self, measurement_name, measurement_val):
        self.data[measurement_name] = measurement_val

def get_in(test_name):
    return MockUser('tests/' + test_name + '.psepsis.in')

def get_expected(test_name):
    return Expected('tests/' + test_name + '.psepsis.expected')

async def run_test(test_name):
    mock_data = None
    if os.path.exists('tests/' + test_name + '.psepsis.data'):
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

@pytest.mark.asyncio
async def test_screening_negative_none():
    await run_test('screening-negative-none')

@pytest.mark.asyncio
async def test_screening_negative_all_none():
    await run_test('screening-negative-all-none')

@pytest.mark.asyncio
async def test_screening_positive_1():
    await run_test('screening-positive-1')

@pytest.mark.asyncio
async def test_screening_positive_2():
    await run_test('screening-positive-2')

@pytest.mark.asyncio
async def test_fluid_therapy_no_risk_overdose_responsiveness():
    await run_test('fluid-therapy-no-risk-overdose-responsiveness')
