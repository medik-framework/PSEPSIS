from datetime import datetime
from enum import Enum
INVALID_RESPONSE_ID = -1

class SenderList(Enum):
    MEDIK = 0
    GUI = 1

class Message:
    id: int
    source: int
    content: str
    response_to: int
    need_response: bool
    timestamp: datetime

    def __init__(self, id_: int, source_: int, content_: str, 
                response_to_: int = INVALID_RESPONSE_ID, need_response_: bool = False):
        self.id = id_
        self.source = source_
        self.content = content_
        self.response_to = response_to_
        self.need_response = need_response_
        self.timestamp = datetime.timestamp(datetime.now())
        
    def to_json(self):
        return {
            "id": self.id,
            "source": self.source,
            "content": self.content,
            "response_to": self.response_to,
            "need_response": self.need_response,
            "timestamp": self.timestamp
        }