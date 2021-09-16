export const organTabs = [];

export const organDTs = [
  CardiovascularDT,
  HematologicDT,
  HepaticDT,
  NeurologicDT,
  RenalDT,
  RespiratoryDT,
  OthersDT,
];

export const assessments = {
  SIRS: {
    name: "SIRS Score",
    measurements: [
      CardiovascularDT.HR,
      ImmuneDT.WBC,
      CardiovascularDT["BP Sys"],
      CardiovascularDT["BP Dia"],
      CardiovascularDT.Temp,
      CardiovascularDT.CoreTemp,
      RespiratoryDT.RR,
    ],
    value: 0,
  },
  Sepsis: {
    name: "Sepsis Score",
    measurements: [
      CardiovascularDT.HR,
      CardiovascularDT["Pulse Quality"],
      CardiovascularDT["BP Sys"],
      CardiovascularDT["BP Dia"],
      CardiovascularDT["Capillary Refill"],
      CardiovascularDT.Temp,
      CardiovascularDT.CoreTemp,
      Others2DT["Skin Color"],
      Others2DT.Behavior,
    ],
    value: 0,
  },
  "Septic Shock": {
    name: "Septic Shock Score",
    measurements: [
      CardiovascularDT["BP Sys"],
      CardiovascularDT["BP Dia"],
      CardiovascularDT.MAP,
      CardiovascularDT["Capillary Refill"],
      CardiovascularDT.PaCO2,
      CardiovascularDT.pH,
      CardiovascularDT["Base Excess"],
      CardiovascularDT.Lactate,
      CardiovascularDT.Temp,
      CardiovascularDT.CoreTemp,
      CardiovascularDT["Urine Output"],
    ],
    value: 0,
  },
};

export const getVitalsAgeGroup = (ageValue, ageUnit) => {
  let days;
  if (ageUnit === "wo") days = ageValue * 7;
  else if (ageUnit === "mo") days = ageValue * 30;
  else if (ageUnit === "yo") days = ageValue * 365;

  if (days < 28) return 1;
  else if (days < 60) return 2;
  else if (days < 356) return 3;
  else if (days < 365 * 2) return 4;
  else if (days < 365 * 4) return 5;
  else if (days < 365 * 6) return 6;
  else if (days < 365 * 10) return 7;
  else if (days < 365 * 13) return 8;
  else return 9;
};

export const getShockAgeGroup = (ageValue, ageUnit) => {
  let days;
  if (ageUnit === "wo") days = ageValue * 7;
  else if (ageUnit === "mo") days = ageValue * 30;
  else if (ageUnit === "yo") days = ageValue * 365;

  if (days < 28) return 1;
  else if (days < 356) return 2;
  else if (days < 365 * 2) return 3;
  else if (days < 365 * 5) return 4;
  else if (days < 365 * 12) return 5;
  else if (days < 365 * 18) return 6;
  else return 7;
};

export const PatientBasic = {
  Age: { name: "Age", unit: ["wo", "mo", "yo"], type: "number" },
  AgeGroupVitals: {
    name: "AgeGroupVitals",
    unit: "",
    type: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  AgeGroupShock: {
    name: "AgeGroupShock",
    unit: "",
    type: [1, 2, 3, 4, 5, 6, 7],
  },
  Weight: { name: "Weight", unit: "Kg", type: "number" },
  Height: { name: "Height", unit: "m", type: "number" },
  Gender: { name: "Gender", unit: "", type: ["Female", "Male"] },
};

export const CardiovascularDT = {
  name: "Cardiovascular",
  measurements: {
    HR: {
      name: "HR",
      unit: "bpm",
      type: "number",
      getThres: (AgeGroupVitals) => {
        if ([1, 2].includes(AgeGroupVitals)) return { high: 100, low: 205 };
        if (AgeGroupVitals === 3) return { high: 90, low: 190 };
        if (AgeGroupVitals === 4) return { high: 80, low: 190 };
        if (AgeGroupVitals === 5) return { high: 70, low: 140 };
        if (AgeGroupVitals in [6, 7]) return { high: 60, low: 140 };
        if ([8, 9].includes(AgeGroupVitals)) return { high: 60, low: 100 };
        return {
          high: Number.POSITIVE_INFINITY,
          low: Number.NEGATIVE_INFINITY,
        };
      },
    },
    PulseQuality: {
      name: "Pulse Quality",
      unit: "",
      type: ["Bounding", "normal", "Decreasing/Weak"],
    },
    BPSys: {
      name: "BP Sys",
      unit: "mmHg",
      type: "number",
      getThres: (AgeGroupVitals) => {
        if (AgeGroupVitals === 1)
          return { high: Number.POSITIVE_INFINITY, low: 60 };
        if ([2, 3].includes(AgeGroupVitals))
          return { high: Number.POSITIVE_INFINITY, low: 70 };
        if (AgeGroupVitals === 4)
          return { high: Number.POSITIVE_INFINITY, low: 190 };
        if (AgeGroupVitals === 5)
          return { high: Number.POSITIVE_INFINITY, low: 140 };
        if (AgeGroupVitals in [6, 7])
          return { high: Number.POSITIVE_INFINITY, low: 140 };
        if ([8, 9].includes(AgeGroupVitals))
          return { high: Number.POSITIVE_INFINITY, low: 100 };
        return {
          high: Number.POSITIVE_INFINITY,
          low: Number.NEGATIVE_INFINITY,
        };
      },
    },
    BPDia: { name: "BP Dia", unit: "mmHg", type: "number" },
    MAP: { name: "MAP", unit: "mmHg", type: "number" },
    CapillaryRefill: {
      name: "Capillary Refill",
      unit: "sec",
      type: ["Flash", "1", "2", "3", "4", "5", "5+"],
    },
    SpO2: { name: "SpO2", unit: "%", type: "number" },
    PaCO2: { name: "PaCO2", unit: "mmHg", type: "number" },
    pH: { name: "pH", unit: "", type: "number" },
    BaseExcess: { name: "Base Excess", unit: "mEq/L", type: "number" },
    Lactate: { name: "Lactate", unit: "", type: "number" },
    Temp: { name: "Temp", unit: "C", type: "number" },
    CoreTemp: { name: "CoreTemp", unit: "C", type: "number" },
    UrineOutput: { name: "Urine Output", unit: "mL/kg/hr", type: "number" },
  },
};

export const HematologicDT = {
  name: "Hematologic",
  measurements: {
    INR: { name: "INR", unit: "", type: "number" },
    Platelet: { name: "Platelet", unit: "k/mcL", type: "number" },
  },
};

export const HepaticDT = {
  name: "Hepatic",
  measurements: {
    Bilirubin: { name: "Bilirubin", unit: "mg/dL", type: "number" },
    ALT: { name: "ALT", unit: "U/L", type: "number" },
  },
};

export const NeurologicDT = {
  name: "Neurologic",
  measurements: {
    GlasgowComaScore: {
      name: "Glasgow Coma Score",
      unit: "",
      type: "number",
    },
    GlasgowEyeResponse: {
      name: "Glasgow Eye Response",
      unit: "",
      type: [
        "Opens spontaneously",
        "Opens to verbal command, speech or shout (over 2 y/o), Opens to speech (under 2 y/o)",
        "Opens to pain",
        "None",
      ],
    },
    GlasgowVerbalResponse: {
      name: "Glasgow Verbal Response",
      unit: "",
      type: [
        "Oriented and converses (over 2 y/o), Coos or babbles- normal activity (under 2 y/o)",
        "Confused, but able to answer questions (over 2 y/o), Irritable and continually cries (under 2 y/o)",
        "Inappropriate responses, words are discernible (over 2 y/o), Cries to pain (under 2 y/o)",
        "Incomprehensible speech / sounds (over 2 y/o), Moans to pain (under 2 y/o)",
        "None",
      ],
    },
    GlasgowMotorResponse: {
      name: "Glasgow Motor Response",
      unit: "",
      type: [
        "Obeys commands for movement (over 2 y/o), Moves spontaneously or purposefully (under 2 y/o)",
        "Purposeful movement to painful stimulus (over 2 y/o), Withdraws from touch (under 2 y/o)",
        "Withdraws from pain",
        "Abnormal and spastic flexion, decorticate posture (over 2 y/o), Abnormal flexion to pain- decorticate response (under 2 y/o)",
        "Extensor and rigid response, decerebrate posture (over 2 y/o), Extension to pain- decerebrate response (under 2 y/o)",
        "None",
      ],
    },
  },
};

export const RenalDT = {
  name: "Renal",
  measurements: {
    BUN: { name: "BUN", unit: "mg/dl", type: "number" },
    UrineOutput: { name: "Urine Output", unit: "mL/kg/hr", type: "number" },
    Creatinine: { name: "Creat", unit: "mg/dL", type: "number" },
    BaselineCreatinine: {
      name: "Baseline Creat",
      unit: "mg/dL",
      type: "number",
    },
  },
};

export const RespiratoryDT = {
  name: "Respiratory",
  measurements: {
    SpO2: { name: "SpO2", unit: "%", type: "number" },
    PaO2: { name: "PaO2", unit: "mmHg", type: "number" },
    PaCO2: { name: "PaCO2", unit: "mmHg", type: "number" },
    RR: { name: "RR", unit: "", type: "number" },
    FiO2: { name: "FiO2", unit: "", type: "number" },
  },
};

export const OthersDT = {
  name: "Others",
  measurements: {
    Pain: { name: "Pain", unit: "", type: "number" },
    PEW: { name: "PEW Score", unit: "", type: "number" },
  },
};

export const ImmuneDT = {
  name: "Immune",
  measurements: {
    WBC: { name: "WBC", unit: "K/mcL", type: "number" },
  },
};

export const Others2DT = {
  name: "Not listed",
  measurements: {
    SkinColor: {
      name: "Skin Color",
      unit: "sec",
      type: ["Flushed", "Pink", "Pale", "Gray", "Gray and Mottled"],
    },
    Behavior: {
      name: "Behavior",
      unit: "",
      type: [
        "Playing/Appropriate",
        "Sleeping",
        "Irritable",
        "Confused/Reduced Response to Pain",
      ],
    },
  },
};
