from typing import List, Dict, Tuple, TypeAlias, Optional
from dataclasses import dataclass, field
import pickle

debug = True

def dbg(msg, *rest):
    if not debug:
        return rest
    print(f"\x1b\x5b31m{msg}\x1b\x5bm", end="")
    for i, a in enumerate(rest[:5]):
        print(f" \x1b\x5b3{i+2}m{a}\x1b\x5bm", end="")
    if rest[5:]:
        print("", rest[5:])
    else:
        print()
    return rest

@dataclass
class DataPoint:
    time: int
    value: float

Series: TypeAlias = List[DataPoint]

@dataclass
class DataSeries:
    data: Series = field(default_factory=list)

    def __init__(self):
        self.data = []

    def update(self, time: int, value: float):
        self.data.append(DataPoint(time, value))
        # self.data.sort(key=lambda p: p[0])

    def get_series(self) -> Series:
        return self.data

    def get_value(self) -> Optional[float]:
        if len(self.data) == 0:
            return None
        return self.data[-1].value

    def get_len(self) -> int:
        return len(self.data)

    def get_data_point(self) -> Optional[float]:
        if len(self.data) == 0:
            return {'value': None, 'time':None}
        return {'value': self.data[-1].value, 'time':self.data[-1].time}


import json
ORGAN_DT_MAP = json.load(open("./config/organdt.json"))
MEAS_MAP = {v: k for k, vs in ORGAN_DT_MAP.items() for v in vs}
MEASES = list(MEAS_MAP.keys())

class OrganDt:
    data: Dict[str, DataSeries]

    def __init__(self):
        self.data = {k: DataSeries() for k in MEASES}

    def get_value(self, meas: str) -> Optional[float]:
        return self.data[meas].get_value()

    def get_data_point(self, meas: str) -> Optional[float]:
        return self.data[meas].get_data_point()

    def get_series(self, meas: str) -> DataSeries:
        return self.data[meas]

    def get_all(self) -> Dict:
        return {oname: {mname: self.get_data_point(mname) for mname in mnames} for oname, mnames in ORGAN_DT_MAP.items()}

    def update(self, meas: str, time: int, val: float):
        self.data[meas].update(time, val)

    def update_system(self, time: int, meases: Dict[str, float]):
        for k, v in meases.items():
            self.update(k, time, v)

    def update_all(self, time: int, all: Dict[str, Dict[str, float]]):
        for sys in all.values():
            self.update_system(time, sys)

    def clear(self):
        self.data = {k: DataSeries() for k in MEASES}

    def save(self, file: str):
        with open(file, "wb") as out:
            pickle.dump(self.data, out)

    def print(self):
        pass

DRUG_INFO = json.load(open("./config/drugs.json"))
DRUG_NAME = {drug["name"] for drug in DRUG_INFO}


class DrugHist:
    data: Dict[str, DataSeries]

    def __init__(self) -> None:
        self.data = {k: DataSeries() for k in DRUG_NAME}

    def get_total_dose(self, drug_name):
        records = self.data[drug_name].get_series()
        total_dose = sum(float(record.value) for record in records)
        return total_dose

    def get_dose_count(self, drug_name):
        return self.data[drug_name].get_len()

    def record_dose(self, drug_name, timestamp, value):
        self.data[drug_name].update(timestamp, value)

    def get_series(self, drug_name):
        return self.data[drug_name]

class Patient:
    def __init__(self) -> None:
        self.data = {}

    def update(self, data):
        new_data = {}
        for k, v in data.items():
            if len(v):
                new_data[k] = v
        self.data = self.data | new_data

    def get_value(self, key):
        if key == 'Age' and self.data.has_key('Age'):
            return self.data['Age']['AgeInDays']
        if key == 'Weight' and self.data.has_key('Weight'):
            return self.data['Weight']['value']
        if key == 'HighRiskConditions' and self.data.has_key('HighRiskConditions'):
            return self.data['HighRiskConditions']['value']
        else:
            return "Data not exist"



def test():
    import random
    def random_time(last: int) -> int:
        return random.randrange(0, 100) + last
    def random_meas_val() -> float:
        return random.random()
    def random_meas(last: int) -> Tuple[str, DataPoint]:
        return random.choice(MEASES), DataPoint(random_time(last), random_meas_val())
    def random_sys_meas() -> Tuple[str, Dict[str, float]]:
        sys = random.choice(list(ORGAN_DT_MAP.keys()))
        sys_meases = ORGAN_DT_MAP[sys]
        return sys, {meas: random_meas_val() for meas in random.sample(sys_meases, k=random.randrange(1, len(sys_meases)))}
    def random_all_meas() -> Dict[str, Dict[str, float]]:
        return {(sys:=random_sys_meas())[0]: sys[1] for _ in range(random.randrange(1, 4))}

    ds = DataSeries()
    time = random.randrange(1, 10)
    for _ in range(random.randrange(3, 5)):
        data = time, random_meas_val()
        dbg("data", data)
        ds.update(*data)
        time = random_time(time)
        dbg("ds step", ds.get_value(), ds.get_series())
    dbg("ds", ds)

    odt = OrganDt()
    dbg("all init", {k: odt.get_value(k) for k in MEASES})
    time = random.randrange(1, 10)
    for _ in range(random.randrange(3, 5)):
        m = random_meas(time)
        dbg("r meas", m)
        odt.update(m[0], m[1].time, m[1].value)
        dbg("all value", {k: odt.get_value(k) for k in MEASES})
        time = m[1].time

    for _ in range(random.randrange(3, 5)):
        m = random_sys_meas()
        dbg("r sys", m)
        odt.update_system(time, m[1])
        dbg("all value", {k: odt.get_value(k) for k in MEASES})
        time = random_time(time)
    odt.clear()

    for _ in range(random.randrange(1, 3)):
        m = random_all_meas()
        dbg("r all", m)
        odt.update_all(time, m)
        dbg("all value", {k: odt.get_value(k) for k in MEASES})
        time = random_time(time)
    odt.save("test.pkl")

    # with open("test.pkl", "rb") as file:
    #     data = pickle.load(file)
    # print(data)

if __name__ == "__main__":
    test()
