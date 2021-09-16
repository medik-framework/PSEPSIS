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
    measurements : [
      CardiovascularDT.HR,
      ImmuneDT.WBC,
      CardiovascularDT["BP Sys"],
      CardiovascularDT["BP Dia"],
      CardiovascularDT.Temp,
      CardiovascularDT.CoreTemp,
      RespiratoryDT.RR,
    ],
    value: 0
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
    value: 0
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
      CardiovascularDT["Urine Output"]
    ],
    value: 0
  },
};

export const PatientBasic = {
  Age: { name: "Age", unit: ["wo", "mo", "yo"], type: "number" },
  Weight: { name: "Weight", unit: "Kg", type: "number" },
  "Screening Status": {
    name: "Screening Status",
    unit: "",
    type: [
      "Evaluating for Sepsis",
      "Presume Sepsis",
      "Sepsis + Organ Dysfunction",
      "Septic Shock",
    ],
  },
}

export const CardiovascularDT = {
  name: "Cardiovascular",
  measurements: {
    HR: { name: "HR", unit: "bpm", type: "number" },
    "Pulse Quality": {
      name: "Pulse Quality",
      unit: "",
      type: ["Bounding", "normal", "Decreasing/Weak"],
    },
    "BP Sys": { name: "BP Sys", unit: "", type: "number" },
    "BP Dia": { name: "BP Dia", unit: "", type: "number" },
    MAP: { name: "MAP", unit: "mmHg", type: "number" },
    "Capillary Refill": {
      name: "Capillary Refill",
      unit: "sec",
      type: ["Flash", "1", "2", "3", "4", "5", "5+"],
    },
    SpO2: { name: "SpO2", unit: "%", type: "number" },
    PaCO2: { name: "PaCO2", unit: "mmHg", type: "number" },
    pH: { name: "pH", unit: "", type: "number" },
    "Base Excess": { name: "Base Excess", unit: "mEq/L", type: "number" },
    Lactate: { name: "Lactate", unit: "", type: "number" },
    Temp: { name: "Temp", unit: "C", type: "number" },
    CoreTemp: { name: "CoreTemp", unit: "C", type: "number" },
    "Urine Output": { name: "Urine Output", unit: "mL/kg/hr", type: "number" }
  },
};

export const HematologicDT = {
  name: "Hematologic",
  measurements: {
    INR: { name: "INR", unit: "", type: "number" },
    Platelet: { name: "Platelet", unit: "k/mcL", type: "number" },
  }
}

export const HepaticDT = {
  name: "Hepatic",
  measurements: {
    Bilirubin: { name: "Bilirubin", unit: "mg/dL", type: "number" },
    ALT: { name: "ALT", unit: "U/L", type: "number" },
  }
}

export const NeurologicDT = {
  name: "Neurologic",
  measurements: {
    "Glasgow Coma Score": {
      name: "Glasgow Coma Score",
      unit: "",
      type: "number",
    },
    "Glasgow Eye Response": {
      name: "Glasgow Eye Response",
      unit: "",
      type: [
        "Opens spontaneously",
        "Opens to verbal command, speech or shout (over 2 y/o), Opens to speech (under 2 y/o)",
        "Opens to pain",
        "None",
      ],
    },
    "Glasgow Verbal Response": {
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
    "Glasgow Motor Response": {
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
  }
}

export const RenalDT = {
  name: "Renal",
  measurements : {
    BUN: { name: "BUN", unit: "mg/dl", type: "number" },
    "Urine Output": { name: "Urine Output", unit: "mL/kg/hr", type: "number" },
    Creat: { name: "Creat", unit: "mg/dL", type: "number" },
    "Baseline Creat": { name: "Baseline Creat", unit: "mg/dL", type: "number" },
  }
}

export const RespiratoryDT = {
  name: "Respiratory",
  measurements: {
    SpO2: { name: "SpO2", unit: "%", type: "number" },
    PaO2: { name: "PaO2", unit: "mmHg", type: "number" },
    PaCO2: { name: "PaCO2", unit: "mmHg", type: "number" },
    RR: { name: "RR", unit: "", type: "number" },
    FiO2: { name: "FiO2", unit: "", type: "number" },
  }
}

export const OthersDT = {
  name: "Others",
  measurements: {
    Pain: { name: "Pain", unit: "", type: "number" },
    Height: { name: "Height", unit: "m", type: "number" },
    Gender: { name: "Gender", unit: "", type: ["Female", "Male"] },
    "PEW Score": { name: "PEW Score", unit: "", type: "number" },
  }
}

export const ImmuneDT = {
  name: "Immune",
  measurements: {
    WBC: { name: "WBC", unit: "K/mcL", type: "number" },
  }
}

export const Others2DT = {
  name: "Not listed",
  measurements: {
    "Skin Color": {
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
  }
}