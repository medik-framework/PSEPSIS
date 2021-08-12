export const FLUIDS = {
  "Lactated Ringer": {
    value: [20],
    unit: "mL/kg",
  },
  "Normal Saline": {
    value: [20],
    unit: "mL/kg",
  },
};

export const ANTIBIOTICS = {
  Azithromycin: {
    value: [10],
    unit: "mg/kg",
  },
  Azithromycin: {
    value: [30],
    unit: "mg/kg",
  },
  Cefepime: {
    value: [50],
    unit: "mg/kg",
  },
  Dopamine: {
    range: "2-20",
    unit: "mcg/kg/min",
    step: 1,
    precision: 1,
    default: 2,
  },
  Dobutamine: {
    range: "2-20",
    unit: "mcg/kg/min",
    step: 1,
    precision: 1,
    default: 2,
  },
  Vasopressin: {
    range: "0.2-10",
    unit: "mUnits/kg/min",
    step: 0.1,
    precision: 1,
    default: 0.2,
  },
  PGE: {
    range: "0.01-0.2",
    unit: "mcg/kg/min",
    step: 0.01,
    precision: 2,
    default: 0.01,
  },
  Amiodarone: {
    range: "3.5-15",
    unit: "mcg/kg/min",
    step: 0.5,
    precision: 1,
    default: 3.5,
  },
  Lidocaine: {
    range: "20-50",
    unit: "mcg/kg/min",
    step: 5,
    precision: 1,
    default: 20,
  },
  Phenylephrine: {
    range: "0.1-5",
    unit: "mcg/kg/min",
    step: 0.1,
    precision: 1,
    default: 0.1,
  },
  Milrinone: {
    range: "0.25-1",
    unit: "mcg/kg/min",
    step: 0.05,
    precision: 2,
    default: 0.25,
  },
};
