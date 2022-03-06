export const PatientInfo = {
  name: "Patient Info",
  measurements: {
    Age: {
      name: "Age",
      fulltext: "Age",
      unit: "months",
      type: "number"
    },
    MedicalDevice: {
      name: "Indwelling device",
      fulltext: "Indwelling device",
      unit: "Yes/No",
      type: "choices",
      options: { No: 0, Yes: 1}
    },
    Ethnicity: {
      name: "Ethnicity",
      fulltext: "Patient Ethnicity",
      unit: "White/Maori",
      type: "choices",
      options: { White: 0, Maori: 1 }
    }
  }
};

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
    PulseQuality: {
      name: "Pulse Quality",
      fulltext: "Pulse Quality",
      unit: "bounding/normal/thready",
      type: "choices",
      options: { Bounding: 0, Normal: 2, Thready: 0 },
    }
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
    RespirationQuality: {
      name: "Respiration",
      fulltext: "Respiration",
      unit: "normal/tachypnopea/increased WOB/weak Cry",
      options: { Normal: 0, tachypnopea:1, increasedWOB: 2, WeakCry: 3}
    }
  },
};

export const Immune = {
  name: "Immune",
  measurements: {
    Temp: {
      name: "Temp",
      fulltext: "Temperature",
      unit: "°C",
      type: "number",
      minValue: 25,
      maxValue: 45,
      decimal: 0,
    },
  }
};

export const Neurological = {
  name: "Mental State",
  measurements: {
    MentalState: {
      name: "MentalState",
      fulltext: "Mental State",
      unit: "Normal/Irritable/Drowsy ",
      type: "choices",
      options: {Normal:0, Irritable:1, Drowsy:2}
    },
    Seizures: {
      name: "Seizures",
      fulltext: "Seizures",
      unit: "Yes/No",
      options: {No:0, Yes:1}
    }
  }
};

export const Renal = {
  name: "Renal",
  measurements: {
    Dehydration: {
      name: "Dehydration",
      fulltext: "Dehydration",
      unit: "Yes/No",
      type: "choices",
      options: {No: 0, Yes: 1}
    }
  }
};



export const organsDT = [
  PatientInfo,
  Cardiovascular,
  Respiratory,
  Immune,
  Neurological,
  Renal
];
