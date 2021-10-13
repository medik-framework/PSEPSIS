from flask import Flask, request, jsonify
import simple_websocket
import subprocess
import os

app = Flask(__name__, static_folder="static")

data_copy = ""
data_copy2 = {"HeartRate": 72, "BPSys": 120}

@app.route("/k_comm", websocket=True)
def k_comm():
    global data_copy
    ws = simple_websocket.Server(request.environ)
    # p = subprocess.Popen(['krun'], stdin=subprocess.PIPE, stdout=subprocess.PIPE)
    try:
        while True:
            data=ws.receive()
            print(data)
            data_copy = data
            # p.stdin.write(data)
            ws.send(data)
    except simple_websocket.ConnectionClosed:
        pass
    return ''
    
def getValues(params):
    result = {}
    error = {}
    if params == []:
        error = { "code" : -32600, "message" : "*" }
    for param in params:
        if param in data_copy2.keys():
            result[param] = data_copy2.get(param)
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

@app.route("/2")
def index2():
    return "testdata"

@app.route("/3")
def index3():
    global data_copy
    return data_copy

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host="0.0.0.0", port=port)
