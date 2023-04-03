from pathlib import Path
from fractions import Fraction
from data import OrganDt, Patient, DrugHist
from dataclasses import asdict
from backend_env import kompiled_exec_dir, psepsis_pgm, set_env
from wrapper import ExecutionWrapper

import os
import websockets

import argparse, asyncio, concurrent, functools, json, logging, os, sys, threading, time

#==== Common Helpers =====

def _broadcast(interface_id, event_name, event_args=[]):
        return [{ 'id'        : interface_id
                , 'action'    : 'broadcast'
                , 'eventName' : event_name
                , 'eventArgs' : event_args }]

def _obtain_response(tid, interface_id, args):
        return  [{ 'tid'       : tid
                 , 'id'        : interface_id
                 , 'result'    : 'obtainResponse'
                 , 'args'      : args }]

def _sleep_response(tid):
    return [{ 'action' : 'sleepResponse'
            , 'tid'    : tid }]

def _exit():
    return [{'action': 'exit'}]


class StubProcess:
    async def launch(self):
        tasks = []
        try:
            with open(self.stub_file_path, 'r') as stub_file:
                self.commands = json.loads(stub_file.read())

            tasks += [asyncio.create_task(self.feed_commands(), name='stub-feed-commands')]
            tasks += [asyncio.create_task(self.read_commands(), name='stub-read-commands')]

            await asyncio.gather(*tasks)

        except asyncio.CancelledError as e:
            for task in tasks:
                if not task.cancelled():
                    task.cancel()



    async def feed_commands(self):
        for command in self.commands:
            if command.get('name') != 'Instruct':
                continue
            await self.feed_event.wait()
            await self.to_app_queue.put(command)
            self.feed_event.clear()

    async def read_commands(self):
        while True:
            to_k = await self.to_k_queue.get()
            if to_k[0].get('action') == 'exit':
                break
            self.feed_event.set()

    def __init__(self, stub_file_path, to_k_queue, to_app_queue):
        set_env()
        self.to_k_queue = to_k_queue
        self.to_app_queue = to_app_queue
        self.stub_file_path = stub_file_path
        self.feed_event = asyncio.Event()
        self.feed_event.clear()


class MedikHandler(ExecutionWrapper):

    async def _sleep(self, duration, tid):
        await asyncio.sleep(duration)
        await self.to_k_queue.put(_sleep_response(tid))

    async def handle_from_k(self):
        while not self.wrapper_task.done():
            from_k_json = await self.from_k_queue.get()
            if from_k_json == 'exit' or from_k_json == None:
                break
            if 'action' in from_k_json.keys():
                match from_k_json['action']:
                    case 'print':
                        print(*from_k_json['args'], end='', flush=True)
                    case 'sleep':
                        asyncio.create_task(self._sleep( from_k_json['duration']
                                                       , from_k_json['tid']))

            if 'name' in from_k_json.keys():
                match from_k_json['name']:
                    case 'Obtain':
                        await self.to_k_queue.put(_obtain_response( from_k_json['tid']
                                                                  , 'Datastore'
                                                                  , self.datastore.get_value(from_k_json['args'][0])))
                    case _:
                        await self.to_app_queue.put(from_k_json)

    async def launch(self):
        self.wrapper_task = asyncio.create_task(super().launch())
        from_k_task = asyncio.create_task(self.handle_from_k())

        await asyncio.gather(self.wrapper_task, from_k_task)

    def __init__(self, to_k_queue, from_k_queue, to_app_queue, kompiled_exec_dir, psepsis_pgm, datastore):
        super().__init__(to_k_queue, from_k_queue, kompiled_exec_dir, psepsis_pgm)
        self.to_app_queue = to_app_queue
        self.datastore = datastore


class AppProcess:

    def __init__(self, ws_port, to_k_queue, to_app_queue, datastore):
        self.ws_port = ws_port
        self.to_k_queue = to_k_queue
        self.interface_id = 'tabletApp'
        self.to_app_queue = to_app_queue
        self.datastore = datastore

    async def to_app_handler(self, websocket):
        try:
            while True:
                to_app = await self.to_app_queue.get()
                await websocket.send(json.dumps(to_app))
        except websockets.exceptions.ConnectionClosedError:
            await self.to_k_queue.put(_exit())
            print('Websocket connection from app closed')


    async def from_app_handler(self, websocket):
        try:
            async for message in websocket:
                message_json = json.loads(message)
                match message_json.get('destination'):
                    case 'datastore':
                        ds_fun = getattr(self.datastore, message_json['eventName'])
                        data = ds_fun(*message_json['eventArgs'])
                        if data:
                            data['name'] = message_json['eventName']+'_result'
                            await self.to_app_queue.put(data)
                    case _ :
                        await self.to_k_queue.put(_broadcast( self.interface_id
                                                            , message_json['eventName']
                                                            , message_json.get('eventArgs'
                                                                               , [])))

        except websockets.exceptions.ConnectionClosedError:
            await self.to_k_queue.put(_exit())

    async def setup_connections(self, websocket):
        to_app_task = asyncio.create_task(self.to_app_handler(websocket), name='to_app_task')
        from_app_task = asyncio.create_task(self.from_app_handler(websocket), name='from_app_handler')
        done, pending = await asyncio.wait(
                            [to_app_task, from_app_task],
                            return_when=asyncio.FIRST_COMPLETED,
                        )
        await self.to_k_queue.put(_exit())
        for task in pending:
            task.cancel()


    async def start(self):
        async with websockets.serve(self.setup_connections, '0.0.0.0', self.ws_port):
            await asyncio.Future()



class DataPortalProcess:

    def __init__(self, ws_port, to_k_queue, to_app_queue, datastore):
        self.ws_port = ws_port
        self.to_k_queue = to_k_queue
        self.to_app_queue = to_app_queue
        self.organ_dt = datastore.organ_dt

    async def from_portal_handler(self, websocket):
        async for message in websocket:
            message_json = json.loads(message)
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

class Datastore:

    def __init__(self):
        self.organ_dt = OrganDt()
        self.drug_hist = DrugHist()
        self.measurements = self.organ_dt.data.keys()
        self.drugs = self.drug_hist.data.keys()

    def get_value(self, value_name):
        if not ((value_name in self.measurements)
                or (value_name in self.drugs)):
            raise KeyError(value_name)

        if value_name in self.measurements:
            return self.organ_dt.get_value(value_name)

        return self.drug_hist.get_total_dose(value_name)

    def record_dose(self, drug_name, timestamp, dose):
        return self.drug_hist.record_dose(drug_name, timestamp, dose)

    def get_fluid_response(self):
        measurements = ['BP Sys', 'BP Dia', 'HR', 'Urine Output']
        data = {key:asdict(self.organ_dt.get_series(key)) for key in measurements}
        drugs = ['Normal Saline', 'Lactated Ringer']
        data.update({key:asdict(self.drug_hist.get_series(key)) for key in drugs})
        return data


async def main(app_process, k_process, portal_process):

    app_task = asyncio.create_task(app_process.start(), name='app-task')
    medik_task = asyncio.create_task(k_process.launch(), name='medik-task')
    portal_task = asyncio.create_task(portal_process.start(), name='portal-task')
    done, pending = await asyncio.wait([app_task, medik_task, portal_task]
                                      , return_when=asyncio.FIRST_COMPLETED)
    for task in pending:
        task.cancel()

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
    datastore = Datastore()

    if args.stub:
        k_process = StubProcess(args.stub, to_k_queue, to_app_queue)
    else:
        set_env()
        k_process = MedikHandler( to_k_queue
                                , from_k_queue
                                , to_app_queue
                                , kompiled_exec_dir
                                , psepsis_pgm
                                , datastore )
    app_process = AppProcess(args.user_port, to_k_queue, to_app_queue, datastore)
    portal_process = DataPortalProcess(args.data_port, to_k_queue, to_app_queue, datastore)
    asyncio.run(main(app_process, k_process, portal_process))
    print('Exited middleware')
