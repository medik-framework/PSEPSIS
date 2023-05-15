import json, re

from fractions import Fraction

rat_re = re.compile(r'\<(-?\d+),(\d+)\>Rat')

def combined_temp_file(tmp_path, filepaths, combined_file_name):
    combined_pgm_path = tmp_path / combined_file_name
    combined_pgm = ''
    for filepath in filepaths:
        with filepath.open() as handler:
            combined_pgm += handler.read()
    combined_pgm_path.write_text(combined_pgm)
    return combined_pgm_path

def json_rat_strs_to_fractions(in_json):
    match in_json:
        case list():
            return list(map(json_rat_strs_to_fractions, in_json))
        case dict():
            return { k: json_rat_strs_to_fractions(v) for k, v in in_json.items() }
        case str():
            if rat_re.match(in_json) != None:
                rat_match = rat_re.match(in_json)
                return Fraction( int(rat_match.group(1)) , int(rat_match.group(2)))
            return in_json
        case _:
            return in_json

class FractionEncoder(json.JSONEncoder):
    def __init__(self, formatter, **kw):
        self.formatter = formatter
        super().__init__(**kw)

    def default(self, obj):
        if isinstance(obj, Fraction):
            return self.formatter.format(obj.numerator, obj.denominator)

        return json.JSONEncoder.default(self, obj)
