from flask import Flask, request, jsonify
from flask_cors import CORS
import simple_websocket
import json
from logger import Logger
import os
import queue
import time

from data import OrganDt, Patient, DrugHist
from message import SenderList, INVALID_RESPONSE_ID
from waiting_list import WaitingList

organDT = OrganDt()
patient = Patient()
portal_connected = False
app_connected = False

q = queue.Queue()
# q.put({ "type"      : "dialog",
#         "id"        : 1,
#         "args"      : [ "getAge" ]
#       })
# q.put({ "type"      : "dialog",
#         "id"        : 2,
#         "args"      : [ "getWeight" ]
#       })
# q.put({ "type"      : "dialog",
#         "id"        : 3,
#         "args"      : [ "getHighRiskConditions" ],
#       })

dt_updates = queue.Queue()

message_queue = queue.Queue()
waiting_list = WaitingList()
logger = Logger()
drug_hist = DrugHist()
app = Flask(__name__, static_folder="static")
CORS(app)

@app.route("/portal_connect", methods=["POST"])
def portal_connect():
    global portal_connected
    portal_connected = True
    print("Simulation data portal connected")
    return ""

@app.route("/portal_disconnect", methods=["POST"])
def portal_disconnect():
    global portal_connected
    portal_connected = False
    print("Simulation data portal disconnected")
    return ""

@app.route("/app_connect", methods=["POST"])
def app_connect():
    global app_connected
    app_connected = True
    print("Guidance App connected")
    dt_updates.put(json.dumps(organDT.get_all()))
    return ""

@app.route("/app_disconnect", methods=["POST"])
def app_disconnect():
    global app_connected
    app_connected = False
    print("Guidance App disconnected")
    return ""

@app.route("/update_data", methods=["POST"])
def update_data():
    global organDT
    global dt_updates
    json_data = request.json
    print("Recv from sim porgtal: ", json_data)
    organDT.update(json_data['measurement'], json_data['timeStamp'], json_data['value'])
    dt_updates.put(json.dumps(organDT.get_all()))
    logger.log(json.dumps(json_data), "update_data")
    return ""

@app.route("/update_patient", methods=["POST"])
def update_patient():
    global patient
    global logger
    json_data = request.json
    patient.update(json_data)
    logger.log(json.dumps(json_data), "update_patient")
    return ""

@app.route("/add_to_q", methods=["POST"])
def add_to_q():
    global message_queue
    json_data = request.json
    logger.log(json.dumps(json_data), "add_to_q")
    message_queue.put(json_data)
    return ""

@app.route("/get_value", methods=["POST", "GET"])
def get_value():
    global organDT
    requested_param = request.json["args"]["field_name"]
    value = organDT.get_value(requested_param)
    logger.log(json.dumps(request.json), "get_value")
    return jsonify({'status': 'ok' , 'value': value})

@app.route("/get_patient_info", methods=["POST", "GET"])
def get_patient_info():
    global patient
    requested_param = request.args.get("field_name")
    value = patient.get_value(requested_param)
    logger.log(json.dumps(request.json), "get_patient_info")
    return jsonify({'status': 'ok' , 'value': value})

@app.route("/get_all_values", methods=["POST", "GET"])
def get_all_values():
    global organDT
    return jsonify(organDT.get_all())

@app.route("/get_organdt_update", websocket=True)
def get_organdt_update():
    ws = simple_websocket.Server(request.environ)
    global dt_updates
    try:
        while True:
            try:
                to_app = dt_updates.get_nowait()
                ws.send(to_app)
                logger.log(to_app, "get_organdt_update")
            except queue.Empty:
                time.sleep(1)

    except simple_websocket.ConnectionClosed:
        pass
    return ''


@app.route("/app_dialog", websocket=True)
def app_dialog():
    # print("Connected with GUI")
    ws = simple_websocket.Server(request.environ)
    global message_queue
    global waiting_list
    global logger
    try:
        while True:
            from_app = ws.receive(0.1)
            if from_app is not None:
                message = json.loads(from_app)
                logger.log(from_app, "app_dialog_received_message")
                response_id = message["response_to"]
                if response_id != INVALID_RESPONSE_ID:
                    waiting_list.add_response(response_id, str(message))
            try:
                message_to_app = message_queue.get_nowait()
                ws.send(message_to_app)
                logger.log(message_to_app, "app_dialog_send_message")
            except queue.Empty:
                pass
    except simple_websocket.ConnectionClosed:
        pass
    return ''

@app.route("/send_message", methods=["POST"])
def send_message():
    global message_queue
    global logger
    global waiting_list
    message = request.json
    logger.log(json.dumps(message), "send_message")
    if message["source"] == SenderList.MEDIK.value:
        message_queue.put(json.dumps(message))
    message_id = message["id"]
    if message["source"] == SenderList.MEDIK.value and message["need_response"]:
        waiting_list.add_message(message_id)
    return jsonify(organDT.get_all())

@app.route("/get_response")
def get_response():
    global logger
    message = request.json
    message_id = message["id"]
    logger.log(json.dumps(message), "get_response")
    return waiting_list.get_response(message_id)

@app.route("/get_total_dose", methods=["GET"])
def get_total_dose():
    global drug_hist
    drug_name = request.json["name"]
    logger.log(json.dumps(request.json), "get_total_dose")
    return jsonify({'total dose': drug_hist.get_total_dose(drug_name)})

@app.route("/get_dose_count", methods=["GET"])
def get_dose_count():
    global drug_hist
    drug_name = request.json["name"]
    logger.log(json.dumps(request.json), "get_dose_count")
    return jsonify({'count': drug_hist.get_dose_count(drug_name)})

@app.route("/record_dose", methods=["POST"])
def record_dose():
    global drug_hist
    record = request.json
    logger.log(json.dumps(request.json), "record_dose")
    drug_hist.record_dose(record["name"], record["time"], record["value"])
    return jsonify({'status': 'success'})


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host="0.0.0.0", port=port)

# @app.route("/get_values", methods=["POST", "GET"])
# def getValues():
#     global transaction_id
#     global data_copy2
#     requested_param = request.args.get("field_name")
#     print('requested param {}'.format(requested_param))
#     if requested_param == 'age':
#         print('current data copy {}'.format(json.dumps(data_copy2, indent=2)))
#         if str(transaction_id) in data_copy2["userInput"] and "Age" in data_copy2["userInput"][str(transaction_id)]:
#             print('Data copy2 {}'.format(data_copy2["userInput"][str(transaction_id)]["Age"]))
#             return jsonify({'status': 'ok' , requested_param : data_copy2["userInput"][str(transaction_id)]["Age"]})
#         else:
#             return jsonify({'status': 'error' })
#     else:
#         if "Sepsis Score" not in data_copy2["organDT"]:
#             return jsonify({'status': 'error' })
#         mapped_data = flatten_json(data_copy2)
#         #print('requested param {}. Mapped data {}'.format(requested_param, mapped_data[requested_param]))
#         if requested_param in mapped_data.keys() and mapped_data[requested_param] != None:
#             return jsonify({'status': 'ok' , requested_param : mapped_data[requested_param]})
#         else:
#             return jsonify({'status': 'error' })





# data_copy = ""
# data_copy2 = {}
# data_copy2 = {"organDT":{}, "dialogs":{}, "userInput": {}}#1:"getAgeWeight", 2:"getHighRiskConditions"}, "userInput":{}}



# @app.route("/3")
# def index3():
#     global data_copy
#     return data_copy

#     #result = {}
#     #error = {}
#     #if params == []:
#     #    error = { "code" : -32600, "message" : "*" }
#     #for param in params:
#     #    if param in data_copy.keys():
#     #        result[param] = int(data_copy.get(param))
#     #    else:
#     #        error = { "code" : -32001, "message" : "Requested reading absent" }

#     #return result, error


# def flatten_json(in_json):
#     return { "hr"                 : in_json["organDT"]["Sepsis Score"]["HR"]
#            , "sysBP"              : in_json["organDT"]["Sepsis Score"]["BP Sys"]
#            , "pulseQuality"       : in_json["organDT"]["Sepsis Score"]["Pulse Quality"]
#            , "capillaryRefill"    : in_json["organDT"]["Sepsis Score"]["Capillary Refill"]
#            , "temp"               : in_json["organDT"]["Sepsis Score"]["Temp"]
#            , "age"                : 60
#            , "highRiskConditions" : 0
#            , "skinCondition"      : in_json["organDT"]["Sepsis Score"]["Skin Color"]
#            , "mentalStatus"       : in_json["organDT"]["Sepsis Score"]["Behavior"] }

# transaction_id = 0
# @app.route("/get_values", methods=["POST", "GET"])
# def getValues():
#     global transaction_id
#     global data_copy2
#     requested_param = request.args.get("field_name")
#     print('requested param {}'.format(requested_param))
#     if requested_param == 'age':
#         print('current data copy {}'.format(json.dumps(data_copy2, indent=2)))
#         if str(transaction_id) in data_copy2["userInput"] and "Age" in data_copy2["userInput"][str(transaction_id)]:
#             print('Data copy2 {}'.format(data_copy2["userInput"][str(transaction_id)]["Age"]))
#             return jsonify({'status': 'ok' , requested_param : data_copy2["userInput"][str(transaction_id)]["Age"]})
#         else:
#             return jsonify({'status': 'error' })
#     else:
#         if "Sepsis Score" not in data_copy2["organDT"]:
#             return jsonify({'status': 'error' })
#         mapped_data = flatten_json(data_copy2)
#         #print('requested param {}. Mapped data {}'.format(requested_param, mapped_data[requested_param]))
#         if requested_param in mapped_data.keys() and mapped_data[requested_param] != None:
#             return jsonify({'status': 'ok' , requested_param : mapped_data[requested_param]})
#         else:
#             return jsonify({'status': 'error' })

# @app.route("/", methods=["POST"])
# def index():
#     json = request.json
#     response = {}
#     response["id"] = json.get("id", -1)
#     response["jsonrpc"] = json.get("jsonrpc", "2.0")

#     if json.get("method", "") == "getValues":
#         response["result"], response["error"] = getValues(json.get("params", []))

#     return jsonify(response)

# @app.route("/frontend_comm", methods=["POST"])
# def index2():
#     global data_copy2
#     json = request.json

#     data_copy2 = json
#     return ""

# @app.route("/submit", methods=["POST"])
# def submit():
#     global data_copy2
#     json_data = request.json
#     data_copy2 = json_data
#     #print(json.dumps(json_data, indent=4))
#     return ""

# @app.route("/get_stats")
# def get_stats():
#     global data_copy2
#     flattened_json = flatten_json(data_copy2)
#     print(json.dumps(flattened_json, indent=4))
#     return jsonify(data_copy2)
# @app.route("/instruct", methods=["POST"])
# def do_instruct():
#     global data_copy2
#     global transaction_id
#     transaction_id = transaction_id + 1
#     print('Got instruct with message: {}'.format(request.json['message']))
#     if request.json['message'] == 'Obtain patient age':
#         data_copy2['dialogs'] = {transaction_id: 'getAgeWeight'}
#     if request.json['message'] == 'Perform sepsis management':
#         data_copy2['dialogs'] = {transaction_id: 'showSepsisWarning'}
#     if request.json['message'] == 'Continue regular triage':
#         data_copy2['dialogs'] = {transaction_id: 'showSepsisClearance'}
#     return jsonify({"status": "ok"})

# @app.route("/form_submit", methods=["POST"])
# def form_submit():
#     global data_copy2
#     json_data = request.json
#     data_copy2['organDT'] = json_data
#     print(json.dumps(data_copy2, indent=4))
#     return ""

# @app.route("/app_get")
# def app_get():
#     global data_copy2
#     return jsonify(data_copy2)

# @app.route("/app_userinput", methods=["POST"])
# def app_userinput():
#     global data_copy2
#     json_data = request.json
#     data_copy2['userInput'] = {**data_copy2['userInput'], **json_data}
#     print(json.dumps(data_copy2, indent=4))
#     return ""

# @app.route('/')
# def hello():
#     return 'Hello, world'

# if __name__ == "__main__":
#     port = int(os.environ.get('PORT', 5000))
#     app.run(host="0.0.0.0", port=port)
