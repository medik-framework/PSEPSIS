const sepsisCategory = [
  "Cardiovascular",
  "PEWS",
  "Renal",
  "Respiratory",
  "SIRS",
  "Sepsis",
  "SepticShork",
  "Others",
];

const sepsisMeasurements = {
  Cardiovascular: [
    { name: "HR", unit: "bpm", type: "number" },
    {
      name: "Pulse",
      unit: "",
      type: ["Bounding", "normal", "Decreasing/Weak"],
    },
    {
      name: "Capillary Refill",
      unit: "sec",
      type: ["Flash", "1", "2", "3", "4", "5", "5+"],
    },
    { name: "BP Sys", unit: "", type: "number" },
    { name: "BP Dia", unit: "", type: "number" },
    { name: "pH", unit: "", type: "number" },
    { name: "MAP", unit: "mmHg", type: "number" },
    { name: "Lactate", unit: "", type: "number" },
  ],
};
