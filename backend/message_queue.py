from typing import List
from dataclasses import dataclass, field
import json
from message import SenderList

EMPTY_QUEUE = ""

@dataclass
class MessageQueue:
    message_list: List[str]= field(default_factory=list, init=False)
    sent_index: int = field(default=0, init=False)
    
    def next_message_to_gui(self) -> str:
        while self.sent_index < len(self.message_list):
            message_str = self.message_list[self.sent_index]
            message_json = json.loads(message_str)
            self.sent_index += 1
            if message_json["source"] == SenderList.MEDIK.value:
                return message_str
        return EMPTY_QUEUE

    def add_message(self, message):
        self.message_list.append(message)
    
    def get_all_message(self) -> List[str]:
        return self.message_list.copy()

    def get_message_by_index(self, index) -> str:
        return self.message_list[index]
