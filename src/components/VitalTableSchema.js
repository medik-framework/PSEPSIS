export const sepsisCategories = [
  "Cardiovascular",
  "PEWS",
  "Renal",
  "Respiratory",
  "SIRS",
  "Sepsis",
  "SepticShock",
  "Others",
];

export const sepsisMeasurements = {
  HR: { name: "HR", unit: "bpm", type: "number" },
  Pulse: {
    name: "Pulse",
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
};

export const sepsisTables = {
  Cardiovascular: [
    sepsisMeasurements.HR,
    sepsisMeasurements.Pulse,
    sepsisMeasurements["Capillary Refill"],
    sepsisMeasurements["BP Sys"],
    sepsisMeasurements["BP Dia"],
    sepsisMeasurements.pH,
    sepsisMeasurements.MAP,
    sepsisMeasurements.Lactate,
  ],
  PEWS: [
    sepsisMeasurements.HR,
    sepsisMeasurements["Capillary Refill"],
    sepsisMeasurements.RR,
    sepsisMeasurements["Skin Color"],
    sepsisMeasurements.Behavior,
    sepsisMeasurements["PEW Score"],
  ],
  Renal: [
    { name: "BUN", unit: "mg/dl", type: "number" },
    { name: "Urine Output", unit: "mL/kg/hr", type: "number" },
    { name: "Creat", unit: "mg/dL", type: "number" },
  ],
  Respiratory: [
    { name: "PaO2", unit: "mmHg", type: "number" },
    { name: "FiO2", unit: "", type: "number" },
    { name: "RR", unit: "bpm", type: "number" },
  ],
  SIRS: [
    { name: "HR", unit: "bpm", type: "number" },
    { name: "WBC", unit: "K/mcL", type: "number" },
    { name: "BP Sys", unit: "", type: "number" },
    { name: "BP Dia", unit: "", type: "number" },
    { name: "RR", unit: "bpm", type: "number" },
    { name: "Temp", unit: "C", type: "number" },
    { name: "SIRS Score", unit: "", type: "number" },
  ],
  Sepsis: [
    { name: "HR", unit: "bpm", type: "number" },
    { name: "WBC", unit: "K/mcL", type: "number" },
    { name: "BP Sys", unit: "", type: "number" },
    { name: "BP Dia", unit: "", type: "number" },
    { name: "Lactate", unit: "mmol/L", type: "number" },
    { name: "RR", unit: "bpm", type: "number" },
    { name: "Temp", unit: "C", type: "number" },
    {
      name: "Behavior",
      unit: "",
      type: [
        "Playing/Appropriate",
        "Sleeping",
        "Irritable",
        "Confused/Reduced Response to Pain",
      ],
    },
    { name: "Sepsis Score", unit: "", type: "number" },
  ],
  SepticShock: [
    { name: "HR", unit: "bpm", type: "number" },
    {
      name: "Pulse",
      unit: "",
      type: ["Bounding", "normal", "Decreasing/Weak"],
    },
  ],
  Others: [
    { name: "Pain", unit: "", type: "number" },
    { name: "Height", unit: "m", type: "number" },
    {
      name: "Capillary Refill",
      unit: "sec",
      type: ["Flash", "1", "2", "3", "4", "5", "5+"],
    },
    { name: "BP Sys", unit: "", type: "number" },
    { name: "BP Dia", unit: "", type: "number" },
    { name: "RR", unit: "bpm", type: "number" },
    { name: "Temp", unit: "C", type: "number" },
    {
      name: "Skin Color",
      unit: "sec",
      type: ["Flushed", "Pink", "Pale", "Gray", "Gray and Mottled"],
    },
    {
      name: "Behavior",
      unit: "",
      type: [
        "Playing/Appropriate",
        "Sleeping",
        "Irritable",
        "Confused/Reduced Response to Pain",
      ],
    },
    { name: "Septic Shock Score", unit: "", type: "number" },
    {
      name: "Septic Shock Category",
      unit: "",
      type: [
        "Septic Shock",
        "Cold Shock with Normotension",
        "Cold Shock with Hypotension",
        "Warm Shock",
      ],
    },
  ],
};
