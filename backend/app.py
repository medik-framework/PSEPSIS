from flask import Flask, request, jsonify
from flask_cors import CORS
import simple_websocket
import subprocess
import json
import os

app = Flask(__name__, static_folder="static")
CORS(app)

data_copy = ""
data_copy2 = None

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
    
def getValues(params):
    result = {}
    error = {}
    if params == []:
        error = { "code" : -32600, "message" : "*" }
    for param in params:
        if param in data_copy.keys():
            result[param] = int(data_copy.get(param))
        else:
            error = { "code" : -32001, "message" : "Requested reading absent" }
            
    return result, error
        

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

@app.route("/3")
def index3():
    global data_copy
    return data_copy

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host="0.0.0.0", port=port)
