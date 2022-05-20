from flask import Flask, request, jsonify
from flask_cors import CORS
import simple_websocket
import json
import os

app = Flask(__name__, static_folder="static")
CORS(app)

data_copy = ""
data_copy2 = {}
data_copy2 = {"organDT":{}, "dialogs":{}, "userInput": {}}#1:"getAgeWeight", 2:"getHighRiskConditions"}, "userInput":{}}

@app.route("/k_comm", websocket=True)
def k_comm():
    global data_copy, data_copy2
    ws = simple_websocket.Server(request.environ)
    # p = subprocess.Popen(['krun'], stdin=subprocess.PIPE, stdout=subprocess.PIPE)
    try:
        while True:
            data=ws.receive(0.1)
            if data is not None:
                data_copy = json.loads(data)

                # p.stdin.write(data)
                # ws.send(data)
            if data_copy2 is not None:
                ws.send(data_copy2)
                data_copy2 = None
    except simple_websocket.ConnectionClosed:
        pass
    return ''

@app.route("/3")
def index3():
    global data_copy
    return data_copy


    return {}
    #result = {}
    #error = {}
    #if params == []:
    #    error = { "code" : -32600, "message" : "*" }
    #for param in params:
    #    if param in data_copy.keys():
    #        result[param] = int(data_copy.get(param))
    #    else:
    #        error = { "code" : -32001, "message" : "Requested reading absent" }

    #return result, error


def flatten_json(in_json):
    return { "hr"                 : in_json["organDT"]["Sepsis Score"]["HR"]
           , "sysBP"              : in_json["organDT"]["Sepsis Score"]["BP Sys"]
           , "pulseQuality"       : in_json["organDT"]["Sepsis Score"]["Pulse Quality"]
           , "capillaryRefill"    : in_json["organDT"]["Sepsis Score"]["Capillary Refill"]
           , "temp"               : in_json["organDT"]["Sepsis Score"]["Temp"]
           , "age"                : 60
           , "highRiskConditions" : 0
           , "skinCondition"      : in_json["organDT"]["Sepsis Score"]["Skin Color"]
           , "mentalStatus"       : in_json["organDT"]["Sepsis Score"]["Behavior"] }

transaction_id = 0
@app.route("/get_values", methods=["POST", "GET"])
def getValues():
    global transaction_id
    global data_copy2
    requested_param = request.args.get("field_name")
    print('requested param {}'.format(requested_param))
    if requested_param == 'age':
        print('current data copy {}'.format(json.dumps(data_copy2, indent=2)))
        if str(transaction_id) in data_copy2["userInput"] and "Age" in data_copy2["userInput"][str(transaction_id)]:
            print('Data copy2 {}'.format(data_copy2["userInput"][str(transaction_id)]["Age"]))
            return jsonify({'status': 'ok' , requested_param : data_copy2["userInput"][str(transaction_id)]["Age"]})
        else:
            return jsonify({'status': 'error' })
    else:
        if "Sepsis Score" not in data_copy2["organDT"]:
            return jsonify({'status': 'error' })
        mapped_data = flatten_json(data_copy2)
        #print('requested param {}. Mapped data {}'.format(requested_param, mapped_data[requested_param]))
        if requested_param in mapped_data.keys() and mapped_data[requested_param] != None:
            return jsonify({'status': 'ok' , requested_param : mapped_data[requested_param]})
        else:
            return jsonify({'status': 'error' })

@app.route("/", methods=["POST"])
def index():
    json = request.json
    response = {}
    response["id"] = json.get("id", -1)
    response["jsonrpc"] = json.get("jsonrpc", "2.0")

    if json.get("method", "") == "getValues":
        response["result"], response["error"] = getValues(json.get("params", []))

    return jsonify(response)

@app.route("/frontend_comm", methods=["POST"])
def index2():
    global data_copy2
    json = request.json

    data_copy2 = json
    return ""

@app.route("/submit", methods=["POST"])
def submit():
    global data_copy2
    json_data = request.json
    data_copy2 = json_data
    #print(json.dumps(json_data, indent=4))
    return ""

@app.route("/debug")
def debug_json():
    global data_copy2
    flattened_json = flatten_json(data_copy2)
    print(json.dumps(flattened_json, indent=4))
    return jsonify(data_copy2)
@app.route("/instruct", methods=["POST"])
def do_instruct():
    global data_copy2
    global transaction_id
    transaction_id = transaction_id + 1
    print('Got instruct with message: {}'.format(request.json['message']))
    if request.json['message'] == 'Obtain patient age':
        data_copy2['dialogs'] = {transaction_id: 'getAgeWeight'}
    if request.json['message'] == 'Perform sepsis management':
        data_copy2['dialogs'] = {transaction_id: 'showSepsisWarning'}
    if request.json['message'] == 'Continue regular triage':
        data_copy2['dialogs'] = {transaction_id: 'showSepsisClearance'}
    return jsonify({"status": "ok"})

@app.route("/form_submit", methods=["POST"])
def form_submit():
    global data_copy2
    json_data = request.json
    data_copy2['organDT'] = json_data
    print(json.dumps(data_copy2, indent=4))
    return ""

@app.route("/app_get")
def app_get():
    global data_copy2
    return jsonify(data_copy2)

@app.route("/app_userinput", methods=["POST"])
def app_userinput():
    global data_copy2
    json_data = request.json
    data_copy2['userInput'] = {**data_copy2['userInput'], **json_data}
    print(json.dumps(data_copy2, indent=4))
    return ""

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host="0.0.0.0", port=port)
