export const Cardiovascular = {
  name: "Cardiovascular",
  measurements: {
    HR: {
      name: "HR",
      fulltext: "Heart Rate",
      unit: "bpm",
      type: "number",
      minValue: 0,
      maxValue: 250,
      decimal: 0,
      },
    },
    PulseQuality: {
      name: "Pulse Quality",
      fulltext: "Pulse Quality",
      unit: "",
      type: "choices",
      options: { Bounding: 0, Normal: 2, Thready: 0 },
    }
};

export const Respiratory = {
  name: "Respiratory",
  measurements: {
    RR: {
      name: "RR",
      fulltext: "Respiratory Rate",
      unit: "bpm",
      type: "number",
      minValue: 0,
      maxValue: 100,
      decimal: 0,
      },
    }
};


export const organsDT = [
  Cardiovascular,
  Respiratory,
];
