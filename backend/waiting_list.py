from dataclasses import dataclass, field
from typing import Dict

RESPONSE_NOT_RECEIVED = "response not received"

@dataclass
class WaitingList:
    waiting_list:Dict[int, str] = field(default_factory=dict)
    
    def add_message(self, message_id: int):
        self.waiting_list[message_id] = RESPONSE_NOT_RECEIVED
    
    def add_response(self, message_id: int, response: str):
        self.waiting_list[message_id] = response
    
    def get_response(self, message_id: int) -> str:
        return self.waiting_list.get(message_id, RESPONSE_NOT_RECEIVED)