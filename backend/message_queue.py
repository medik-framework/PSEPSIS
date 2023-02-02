from typing import List
from dataclasses import dataclass, field
import json
from message import SenderList

EMPTY_QUEUE = ""

@dataclass
class MessageQueue:
    message_list: List[str]= field(default_factory=list, init=False)
    sent_index: int = field(default=0, init=False)
    
    def next_message_to_gui(self):
        while self.sent_index < len(self.message_list):
            curr_message = json.loads(self.message_list[self.sent_index])
            print("curr_message: ", curr_message)
            self.sent_index += 1
            if curr_message["source"] == SenderList.MEDIK.value:
                return str(curr_message)
        return EMPTY_QUEUE

    def add_message(self, message):
        self.message_list.append(message)
    
    def get_all_message(self):
        return self.message_list.copy()

    def get_message_by_index(self, index):
        return self.message_list[index]