export const sepsisCategories = [
  "Cardiovascular",
  "Hematologic",
  "Hepatic",
  "Neurologic",
  "Renal",
  "Respiratory",
  "SIRS",
  "Sepsis",
  "Septic Shock",
  "Others",
];

export const sepsisMeasurements = {
  HR: { name: "HR", unit: "bpm", type: "number" },
  "Pulse Quality": {
    name: "Pulse Quality",
    unit: "",
    type: ["Bounding", "normal", "Decreasing/Weak"],
  },
  "Capillary Refill": {
    name: "Capillary Refill",
    unit: "sec",
    type: ["Flash", "1", "2", "3", "4", "5", "5+"],
  },
  "BP Sys": { name: "BP Sys", unit: "", type: "number" },
  "BP Dia": { name: "BP Dia", unit: "", type: "number" },
  pH: { name: "pH", unit: "", type: "number" },
  MAP: { name: "MAP", unit: "mmHg", type: "number" },
  Lactate: { name: "Lactate", unit: "", type: "number" },
  RR: { name: "RR", unit: "", type: "number" },
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
  "PEW Score": { name: "PEW Score", unit: "", type: "number" },
  BUN: { name: "BUN", unit: "mg/dl", type: "number" },
  "Urine Output": { name: "Urine Output", unit: "mL/kg/hr", type: "number" },
  Creat: { name: "Creat", unit: "mg/dL", type: "number" },
  "Baseline Creat": { name: "Baseline Creat", unit: "mg/dL", type: "number" },
  PaO2: { name: "PaO2", unit: "mmHg", type: "number" },
  FiO2: { name: "FiO2", unit: "", type: "number" },
  SpO2: { name: "SpO2", unit: "%", type: "number" },
  PaCO2: { name: "PaCO2", unit: "mmHg", type: "number" },
  WBC: { name: "WBC", unit: "K/mcL", type: "number" },
  INR: { name: "INR", unit: "", type: "number" },
  Platelet: { name: "Platelet", unit: "k/mcL", type: "number" },
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
  "Base Excess": { name: "Base Excess", unit: "mEq/L", type: "number" },
  Temp: { name: "Temp", unit: "C", type: "number" },
  CoreTemp: { name: "CoreTemp", unit: "C", type: "number" },
  Bilirubin: { name: "Bilirubin", unit: "mg/dL", type: "number" },
  ALT: { name: "ALT", unit: "U/L", type: "number" },
  "SIRS Score": { name: "SIRS Score", unit: "", type: "number" },
  "Pulse Quality": {
    name: "Pulse Quality",
    unit: "",
    type: ["Bounding", "Normal", "Thready"],
  },
  Pain: { name: "Pain", unit: "", type: "number" },
  Height: { name: "Height", unit: "m", type: "number" },
  Gender: { name: "Gender", unit: "", type: ["Female", "Male"] },
  "Sepsis Score": { name: "Sepsis Score", unit: "", type: "number" },
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
};

export const sepsisTables = {
  Top: [
    sepsisMeasurements.Age,
    sepsisMeasurements.Weight,
    sepsisMeasurements["Screening Status"],
  ],
  Cardiovascular: [
    sepsisMeasurements.HR,
    sepsisMeasurements["Pulse Quality"],
    sepsisMeasurements["BP Sys"],
    sepsisMeasurements["BP Dia"],
    sepsisMeasurements.MAP,
    sepsisMeasurements["Capillary Refill"],
    sepsisMeasurements.SpO2,
    sepsisMeasurements.PaCO2,

    sepsisMeasurements.pH,
    sepsisMeasurements["Base Excess"],
    sepsisMeasurements.Lactate,
    sepsisMeasurements.Temp,
    sepsisMeasurements.CoreTemp,
    sepsisMeasurements["Urine Output"],
  ],
  Hematologic: [sepsisMeasurements.INR, sepsisMeasurements.Platelet],
  Hepatic: [sepsisMeasurements.Bilirubin, sepsisMeasurements.ALT],
  Neurologic: [
    sepsisMeasurements["Glasgow Coma Score"],
    sepsisMeasurements["Glasgow Eye Response"],
    sepsisMeasurements["Glasgow Verbal Response"],
    sepsisMeasurements["Glasgow Motor Response"],
  ],
  Renal: [
    sepsisMeasurements.BUN,
    sepsisMeasurements["Urine Output"],
    sepsisMeasurements.Creat,
    sepsisMeasurements["Baseline Creat"],
  ],
  Respiratory: [
    sepsisMeasurements.SpO2,
    sepsisMeasurements.PaO2,
    sepsisMeasurements.PaCO2,
    sepsisMeasurements.RR,
    sepsisMeasurements.FiO2,
  ],
  SIRS: [
    sepsisMeasurements.HR,
    sepsisMeasurements.WBC,
    sepsisMeasurements["BP Sys"],
    sepsisMeasurements["BP Dia"],

    sepsisMeasurements.Temp,
    sepsisMeasurements.CoreTemp,
    sepsisMeasurements.RR,
    sepsisMeasurements["SIRS Score"],
  ],
  Sepsis: [
    sepsisMeasurements.HR,
    sepsisMeasurements["Pulse Quality"],
    sepsisMeasurements["BP Sys"],
    sepsisMeasurements["BP Dia"],
    sepsisMeasurements["Capillary Refill"],
    sepsisMeasurements.Temp,
    sepsisMeasurements.CoreTemp,
    sepsisMeasurements["Skin Color"],
    sepsisMeasurements.Behavior,
    sepsisMeasurements["Sepsis Score"],
  ],
  "Septic Shock": [
    sepsisMeasurements["BP Sys"],
    sepsisMeasurements["BP Dia"],
    sepsisMeasurements.MAP,
    sepsisMeasurements["Capillary Refill"],
    sepsisMeasurements.PaCO2,

    sepsisMeasurements.pH,
    sepsisMeasurements["Base Excess"],
    sepsisMeasurements.Lactate,
    sepsisMeasurements.Temp,
    sepsisMeasurements.CoreTemp,
    sepsisMeasurements["Urine Output"],
  ],
  Others: [
    sepsisMeasurements.Pain,
    sepsisMeasurements["PEW Score"],
    sepsisMeasurements.Height,
    sepsisMeasurements.Gender,
  ],
};
