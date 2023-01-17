from typing import List, Tuple, Dict, TypeAlias

Series: TypeAlias = List[Tuple[int, float]]

class DataSeries:
    data: Series

    def __init__(self):
        self.data = []

    def update(self, time: int, value: float):
        self.data.append((time, value))
        # self.data.sort(key=lambda p: p[0])

    def get_series(self) -> Series:
        return self.data

    def get_value(self) -> float:
        return self.data[-1][1]

import json
ORGAN_DT_MAP = json.load(open("organdt.json"))
MEAS_MAP = {v: k for k, vs in ORGAN_DT_MAP for v in vs}
MEASES = list(MEAS_MAP.keys())

class OrganDt:
    data: Dict[str, DataSeries]

    def __init__(self):
        self.data = {k: DataSeries() for k in MEASES}

    def get_value(self, meas: str) -> float:
        return self.data[meas].get_value()

    def update(self, meas: str, val: float):
        self.data[meas].update(val)

    def update_system(self, meases: Dict[str, float]):
        for k, v in meases:
            self.update(k, v)

    def update_all(self, all: Dict[str, Dict[str, float]]):
        for sys in all.values():
            self.update_system(self)

    def clear(self):
        self.data.clear()

    def save(self, file: str):
        with open(file, "w") as out:
            json.dump(self.data, out)

