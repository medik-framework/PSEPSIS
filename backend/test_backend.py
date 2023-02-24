from middleware import MedikProcess

import asyncio, copy, pytest, json

def process_json(out_json, out):
    if 'action' in out_json.keys() and out_json['action'] == 'print':
        print(out_json['action'])
    if 'tid' in out_json.keys():
        out_json.pop('tid')
    out.append(out_json)

async def do_send(medik_process, msg):
    if 'waitFor' in msg.keys():
        msg.pop('waitFor')
    await medik_process.to_k_queue.put(msg)
    await asyncio.sleep(0.1)

def drain_queue(out_queue, out):
    while not out_queue.empty():
        out_json = out_queue.get_nowait()
        process_json(out_json, out)

def create_obtain_response(out_json, data):
    return { 'tid'    : out_json['tid']
           , 'id'     : out_json['id']
           , 'result' : 'obtainResponse'
           , 'args'   : data[out_json['args'][0]] }

async def medik_interact(in_jsons, data=None):
    out = []
    out_queue = asyncio.Queue()
    medik_process = MedikProcess(out_queue)
    medik_task = asyncio.create_task(medik_process.launch())
    # send first message
    await medik_process.to_k_queue.put(in_jsons[0])
    i = 1
    while True:
        out_json = await asyncio.wait_for(out_queue.get(), timeout=5)
        out_json_copy = copy.deep_copy(out_json)
        process_json(out_json, out)
        if out_json.get('action') == 'Obtain':
            if data == None:
                raise RuntimeError('Need datastore to run test')
            await do_send(medik_process, create_obtain_response(out_json_copy, data))
            continue
        in_json = in_jsons[i]
        if 'waitFor' in in_json.keys():
            if in_json['waitFor'].items() <= out_json.items():
                await do_send(medik_process, in_json)
                i += 1
        elif 'action' in in_json.keys() and in_json['action'] == 'exit':
            await do_send(medik_process, in_json)
            drain_queue(out_queue, out)
            await asyncio.gather(medik_task)
            break
        else:
            await do_send(medik_process, in_json, out_json_copy)
            i += 1
    return out

async def medik_interact(input_file_path, data_file_path):
    to_app_queue = asyncio.Queue()
    to_k_queue   = asyncio.Queue()

    data_store = MockDataStore(data_file_path)
    app        = MockUser(input_file_path, to_app_queue)
    
    medik_process = MedikProcess(to_app_queue, data_store)
    medik_task    = asyncio.create_task(medik_process.launch())

    
    

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
            self.data = json.loads(data_file)

    def get_value(self, measurement_name):
        if measurement_name in self.data.keys():
            return self.data[measurment_name]
        else:
            return None

def get_in(test_name):
    return MockUser('tests/' + test_name + '.psepsis.in')

def get_expected(test_name):
    return Expected('tests/' + test_name + '.psepsis.expected')

async def run_test(test_name):
    try:
        out = await medik_interact(get_in(test_name).json_list)
    except TimeoutError:
        assert False
    assert out == get_expected(test_name).json_list

# ===== Tests =====

@pytest.mark.asyncio
async def test_get_age():
    await run_test('get-age')

@pytest.mark.asyncio
async def test_get_age_weight_hrc():
    await run_test('get-age-weight-hrc')

@pytest.mark.asyncio
async def test_screening_negative():
    await run_test('screening-negative')
