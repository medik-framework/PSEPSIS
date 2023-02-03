from datetime import datetime
from enum import Enum
INVALID_RESPONSE_ID = -1
from flask import jsonify

class SenderList(Enum):
    MEDIK = 0
    GUI = 1

class Message:
    id: int
    source: int
    args: str
    response_to: int
    need_response: bool
    timestamp: datetime

    def __init__(self, id_: int, source_: int, args_: str, 
                response_to_: int = INVALID_RESPONSE_ID, need_response_: bool = False):
        self.id = id_
        self.source = source_
        self.args = args_
        self.response_to = response_to_
        self.need_response = need_response_
        self.timestamp = datetime.timestamp(datetime.now())

    def __init__(self, json_obj):
        self.id = json_obj["id"]
        self.source = json_obj["source"]
        self.args = json_obj["args"]
        self.response_to = json_obj["response_to"]
        self.need_response = json_obj["need_response"]
        self.timestamp = json_obj["timestamp"]
        
    def to_json(self):
        return jsonify(
            id= self.id,
            source=self.source,
            args=self.args,
            response_to=self.response_to,
            need_response=self.need_response,
            timestamp=self.timestamp
        )