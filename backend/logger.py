import logging
import json
from datetime import datetime
senders_id = {
    0: "MEDIK",
    1: "GUI"
}
class Logger:
    def get_curr_time(self):
        now = datetime.now()
        return now.strftime("%y%m%d_%H%M")
        
    def __init__(self):
        curr_time = self.get_curr_time()
        logging.basicConfig(filename="message_log/"+curr_time+".log",
                            format='%(asctime)s %(message)s',
                            filemode='w')
        self.logger = logging.getLogger()
        self.logger.setLevel(logging.INFO)

    def log(self, message:dict):
        message_copy = message.copy()
        message_copy["source"] = senders_id[message_copy["source"]]
        self.logger.info(json.dumps(message_copy))
        