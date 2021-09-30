from flask import Flask, request
import simple_websocket
import subprocess
import os

app = Flask(__name__, static_folder="static")

data_copy = ""

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

@app.route("/")
def index():
    return data_copy

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
