from flask import Flask, request, jsonify
from flask_cors import CORS
import simple_websocket
import json
import os
import queue
import time

from data import OrganDt, Patient

organDT = OrganDt()
patient = Patient()
portal_connected = False
app_connected = False

q = queue.Queue()
q.put({ "type"      : "dialog",
        "id"        : 1,
        "args"      : [ "getAge" ]
      })
q.put({ "type"      : "dialog",
        "id"        : 2,
        "args"      : [ "getWeight" ]
      })
q.put({ "type"      : "dialog",
        "id"        : 3,
        "args"      : [ "getHighRiskConditions" ]
      })

dt_updates = queue.Queue()

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
    return ""

@app.route("/update_patient", methods=["POST"])
def update_patient():
    global patient
    json_data = request.json
    print(json_data)
    patient.update(json_data)
    return ""

@app.route("/add_to_q", methods=["POST"])
def add_to_q():
    global q
    json_data = request.json
    print(json_data)
    q.put(json_data)
    # print("Recv from sim porgtal: ", json_data)
    organDT.update(json_data['measurement'], json_data['timeStamp'], json_data['value'])
    return ""

@app.route("/get_value", methods=["POST", "GET"])
def get_value():
    global organDT
    requested_param = request.args.get("field_name")
    value = organDT.get_value(requested_param)
    return jsonify({'status': 'ok' , 'value': value})

@app.route("/get_all_values", methods=["POST", "GET"])
def get_all_values():
    global organDT
    return jsonify(organDT.get_all())

@app.route("/get_organdt_upadte", websocket=True)
def get_organdt_upadte():
    ws = simple_websocket.Server(request.environ)
    global dt_updates
    try:
        while True:
            try:
                to_app = dt_updates.get_nowait()
                print("Send organdt to app ")
                # print("Send to app ", to_app)
                ws.send(to_app)
            except queue.Empty:
                time.sleep(1)

    except simple_websocket.ConnectionClosed:
        pass
    return ''


@app.route("/app_dialog", websocket=True)
def app_dialog():
    ws = simple_websocket.Server(request.environ)
    global q
    try:
        while True:
            from_app = ws.receive(0.1)
            if from_app is not None:
                print(from_app)
                # forward to MediK
            try:
                to_app = q.get_nowait()
                ws.send(to_app)
            except queue.Empty:
                pass

    except simple_websocket.ConnectionClosed:
        pass
    return ''

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 4000))
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
