import logging
import json
from datetime import datetime
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

    def log(self, message:str, endpoint:str):
        self.logger.info(endpoint+": "+json.dumps(message))
        