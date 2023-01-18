export const Cardiovascular = {
  name: "Cardiovascular",
  abbv: "Cardiov.",
  measurements: {
    HR: {
      name: "HR",
      fulltext: "Heart Rate",
      unit: "bpm",
      type: "number",
      minValue: 0,
      maxValue: 250,
      decimal: 0,
      getThres: (AgeObject) => {
        const AgeGroupVitals = AgeObject.AgeGroupVitals;
        if (typeof AgeGroupVitals == "undefined" || AgeGroupVitals == null)
          return { low: 50, high: 130 };
        if ([1, 2].includes(AgeGroupVitals)) return { low: 100, high: 205 };
        if (AgeGroupVitals === 3) return { low: 90, high: 190 };
        if (AgeGroupVitals === 4) return { low: 80, high: 190 };
        if (AgeGroupVitals === 5) return { low: 70, high: 140 };
        if (AgeGroupVitals in [6, 7]) return { low: 60, high: 140 };
        if ([8, 9].includes(AgeGroupVitals)) return { low: 60, high: 100 };
        return { low: 50, high: 130 };
      },
    },
    PulseQuality: {
      name: "Pulse Quality",
      fulltext: "Pulse Quality",
      unit: "",
      type: "choices",
      options: { Bounding: 0, Normal: 2, Thready: 0 },
    },
    BPSys: {
      name: "BP Sys",
      fulltext: "Systolic Blood Pressure",
      unit: "mmHg",
      type: "number",
      minValue: 0,
      maxValue: 250,
      decimal: 0,
      getThres: (AgeObject) => {
        const AgeGroupVitals = AgeObject.AgeGroupVitals;
        const AgeInYears = AgeObject.AgeInYears;
        if (typeof AgeGroupVitals == "undefined" || AgeGroupVitals == null)
          return { low: 100, high: 180 };
        if (AgeGroupVitals === 1) return { low: 60, high: 180 };
        if ([2, 3].includes(AgeGroupVitals)) return { low: 70, high: 180 };
        if ([4, 5, 6, 7].includes(AgeGroupVitals))
          return { low: 70 + AgeInYears * 2, high: 180 };
        if ([8, 9].includes(AgeGroupVitals)) return { low: 90, high: 180 };
        return { low: 100, high: 180 };
      },
    },
    BPDia: {
      name: "BP Dia",
      fulltext: "Diastolic Blood Pressure",
      unit: "mmHg",
      type: "number",
      minValue: 0,
      maxValue: 150,
      decimal: 0,
      getThres: (AgeObject) => {
        const AgeGroupVitals = AgeObject.AgeGroupVitals;
        if (typeof AgeGroupVitals == "undefined" || AgeGroupVitals == null)
          return { low: 60, high: 80 };
        if (AgeGroupVitals === 1) return { low: 35, high: 53 };
        if ([2, 3].includes(AgeGroupVitals)) return { low: 37, high: 56 };
        if (AgeGroupVitals === 4) return { low: 42, high: 63 };
        if (AgeGroupVitals === 5) return { low: 57, high: 76 };
        if ([6, 7, 8, 9].includes(AgeGroupVitals))
          return { low: 64, high: 83 };
        return { low: 60, high: 80 };
      },
    },
    MAP: {
      name: "MAP",
      fulltext: "Mean Arterial Pressure",
      unit: "mmHg",
      type: "number",
      minValue: 0,
      maxValue: 300,
      decimal: 0,
      getThres: (AgeObject) => {
        const AgeGroupVitals = AgeObject.AgeGroupVitals;
        if (typeof AgeGroupVitals == "undefined" || AgeGroupVitals == null)
          return { low: 65, high: 110 };
        if (AgeGroupVitals === 1) return { low: 46, high: 110 };
        if ([2, 3].includes(AgeGroupVitals)) return { low: 55, high: 110 };
        if (AgeGroupVitals === 4) return { low: 60, high: 110 };
        if ([5, 6].includes(AgeGroupVitals)) return { low: 65, high: 110 };
        if ([7, 8].includes(AgeGroupVitals)) return { low: 64, high: 110 };
        if (AgeGroupVitals === 49) return { low: 67, high: 110 };
        return { low: 65, high: 110 };
      },
      formula: (Cardiovascular) => (Cardiovascular.BPSys + 2 * Cardiovascular.BPDia) / 3,
    },
    CapillaryRefill: {
      name: "Capillary Refill",
      fulltext: "Capillary Refill",
      unit: "sec",
      type: "choices",
      options: { Flash: 0, 1: 2, 2: 2, 3: 0, 4: 0, "5+": 0 },
    },
    Lactate: {
      name: "Lactate",
      fulltext: "Blood Lactate",
      unit: "mmol/L",
      type: "number",
      minValue: 0,
      maxValue: 100,
      decimal: 1,
      getThres: () => {
        return { low: 4.5, high: 19.8 };
      },
    },
    CVP: {
      name: "CVP",
      fulltext: "Central Venus Pressure",
      unit: "mmHg",
      type: "number",
      minValue: 0,
      maxValue: 30,
      decimal: 0,
      getThres: () => {
        return { low: 8, high: 12 };
      },
    },
    ScvO2: {
      name: "ScvO2",
      fulltext: "Central Venus Oxygen Saturation",
      unit: "%",
      type: "number",
      minValue: 0,
      maxValue: 100,
      decimal: 0,
      getThres: () => {
        return { low: 65, high: 100 };
      },
    },
    Hgb: {
      name: "Hgb",
      fulltext: "Hemoglobin",
      unit: "g/dL",
      type: "number",
      minValue: 0,
      maxValue: 100,
      decimal: 1,
      getThres: () => {
        return { low: 12, high: 17 };
      },
    },
    CardioOutput: {
      name: "Cardio Output",
      fulltext: "Cardio Output",
      unit: "L/min",
      type: "number",
      minValue: 0.0,
      maxValue: 20,
      decimal: 1,
      getThres: () => {
        return { low: 4, high: 8 };
      },
    },
    PRA: {
      name: "PRA",
      fulltext: "Panel Reactive Antibodies",
      unit: "%",
      type: "number",
      minValue: 0,
      maxValue: 100,
      decimal: 3,
      getThres: () => {
        return { low: 0, high: 100 };
      },
    },
    SkinColor: {
      name: "Skin Color",
      fulltext: "Skin Color",
      unit: "sec",
      type: "choices",
      options: { Flushed: 0, Pink: 2, Pale: 0, Gray: 0, "Gray and Mottled": 0 },
    },
  },
  assessments: {
    Hypotensive: {
      name: "Hypotensive",
      fulltext: "Hypotensive",
      type: "boolean",
      formula: (patient, organs, _) => {
        const AgeGroupVitals = patient.Age.AgeGroupVitals;
        const AgeInYears = patient.Age.AgeInYears;
        const BPSys = organs.Cardiovascular.measurements.BP.BPSys.value;
        if (AgeGroupVitals === 1 && BPSys < 60) return true;
        if ([2, 3].includes(AgeGroupVitals) && BPSys < 70) return true;
        if (
          [4, 5, 6, 7].includes(AgeGroupVitals) &&
          BPSys < 70 + AgeInYears * 2
        )
          return true;
        if ([8, 9].includes(AgeGroupVitals) && BPSys < 90) return true;
        return false;
      },
    },
    CardioSOFA: {
      name: "Cardio SOFA",
      fulltext: "Cardiovascular SOFA",
      type: "number",
      minValue: 0,
      maxValue: 4,
      decimal: 0,
      getThres: () => {
        return { low: 0, high: 2 };
      },
      formula: (_, organs, treatments) => {
        if (isNaN(organs.Cardiovascular.measurements.BP.MAP.value)) return 0;
        if (organs.Cardiovascular.measurements.BP.MAP.value >= 70) return 0;
        else {
          if (treatments.Drug.Dopamine.totalDosage === 0) return 1;
          if (treatments.Drug.Dopamine.totalDosage < 5) return 2;
          if (treatments.Drug.Dopamine.totalDosage < 15) return 3;
          if (treatments.Drug.Dopamine.totalDosage >= 15) return 4;
        }
      },
    },
    CardioDysfunction: {
      name: "Cardio Dysfunction Score",
      fulltext: "Cardiovascular Dysfunction Score",
      type: "number",
      minValue: 0,
      maxValue: 1,
      decimal: 0,
      formula: (patient, organs, treatments) => {
        let mapScore,
          perfusionScore,
          vasoScore = 0;
        let uoScore,
          lactateScore,
          capScore,
          metabolicAcidosisScore,
          tempGradientScore = 0;
        const AgeGroupShock = patient.Age.AgeGroupShock;
        const MAPHighMap = { 1: 46, 2: 55, 3: 60, 4: 62, 5: 65, 6: 67, 7: 70 };
        const MAPThres = MAPHighMap[AgeGroupShock];
        if (organs.Cardiovascular.measurements.BP.MAP.value < MAPThres)
          mapScore = 1;
        if (organs.Renal.measurements.UrineOutput.value < 0.5) uoScore = 1;
        if (organs.Cardiovascular.measurements.Lactate.value >= 5)
          lactateScore = 1;
        if (organs.Cardiovascular.measurements.CapillaryRefill.value === 5)
          capScore = 1;
        if (organs.Renal.measurements.baseExcess.value < -5)
          metabolicAcidosisScore = 1;
        if (
          Math.abs(
            organs.Immune.measurements.CoreTemp.value -
              organs.Immune.measurements.Temp.value
          ) > 3
        )
          tempGradientScore = 1;
        if (
          capScore +
            lactateScore +
            uoScore +
            metabolicAcidosisScore +
            tempGradientScore >=
          2
        )
          perfusionScore = 1;
        if (
          treatments.Drug.Norepinephrine.totalDosage > 0 ||
          treatments.Drug.Epinephrine.totalDosage > 0 ||
          treatments.Drug.Dopamine.totalDosage > 5
        )
          vasoScore = 1;
        return mapScore + perfusionScore + vasoScore;
      },
    },
  },
};

export const Respiratory = {
  name: "Respiratory",
  abbv: "Resp.",
  measurements: {
    RR: {
      name: "RR",
      fulltext: "Respiratory Rate",
      unit: "bpm",
      type: "number",
      minValue: 0,
      maxValue: 100,
      decimal: 0,
      getThres: (AgeObject) => {
        const AgeGroupVitals = AgeObject.AgeGroupVitals;
        if (typeof AgeGroupVitals == "undefined" || AgeGroupVitals == null)
          return { low: 12, high: 20 };
        if ([1, 2].includes(AgeGroupVitals)) return { low: 12, high: 50 };
        if (AgeGroupVitals === 3) return { low: 12, high: 45 };
        if (AgeGroupVitals === 4) return { low: 12, high: 28 };
        if (AgeGroupVitals === 5) return { low: 12, high: 25 };
        else return { low: 12, high: 20 };
      },
    },
    SpO2: {
      name: "SpO2",
      fulltext: "Peripheral Capillary Oxygen Saturation",
      unit: "%",
      type: "number",
      minValue: 0,
      maxValue: 100,
      decimal: 0,
      getThres: () => {
        return { low: 90, high: 100 };
      },
    },
    PaO2: {
      name: "PaO2",
      fulltext: "Partial Pressure of Oxygen",
      unit: "mmHg",
      type: "number",
      minValue: 0,
      maxValue: 300,
      decimal: 0,
      getThres: () => {
        return { low: 84, high: 200 };
      },
    },
    PaCO2: {
      name: "PaCO2",
      fulltext: "Partial Pressure of Carbon Dioxide",
      unit: "mmHg",
      type: "number",
      minValue: 0,
      maxValue: 150,
      decimal: 0,
      getThres: () => {
        return { low: 38, high: 42 };
      },
    },
    FiO2: {
      name: "FiO2",
      fulltext: "Fraction of Inspired Oxygen",
      unit: "",
      type: "number",
      minValue: 0,
      maxValue: 1,
      decimal: 2,
    },
    etCO2: {
      name: "etCO2",
      fulltext: "End-Tidal Carbon Dioxide",
      unit: "mmHg",
      type: "number",
      minValue: 0,
      maxValue: 300,
      decimal: 0,
      getThres: () => {
        return { low: 25, high: 65 };
      },
    },
  },
  assessments: {
    RespSOFA: {
      name: "Resp SOFA",
      fulltext: "Respiratory SOFA",
      type: "number",
      minValue: 0,
      maxValue: 4,
      decimal: 0,
      getThres: () => {
        return { low: 0, high: 2 };
      },
      formula: (_, organs, _2) => {
        let ratio =
          organs.Respiratory.measurements.PaO2.value /
          organs.Respiratory.measurements.FiO2.value;
        if (ratio >= 400) return 0;
        if (300 < ratio && ratio < 400) return 1;
        if (200 < ratio && ratio <= 300) return 2;
        if (100 < ratio && ratio <= 200) return 3;
        if (ratio <= 100) return 4;
        return 0;
      },
    },
    RespDysfunction: {
      name: "Respiratory Dysfunction Score",
      fulltext: "Respiratory Dysfunction Score",
      type: "number",
      minValue: 0,
      maxValue: 1,
      decimal: 0,
      formula: (patient, organs, treatments) => {
        if (organs.Respiratory.measurements.PaCO2.value > 65) return 1;
        if (organs.Respiratory.measurements.FiO2.value > 0.5) return 1;
        if (treatments.Operation.MechanicalVentilation.On) return 1;
        let FPRatio =
          organs.Respiratory.measurements.PaO2.value /
          organs.Respiratory.measurements.FiO2.value;
        let SFRatio =
          organs.Respiratory.measurements.SpO2.value /
          organs.Respiratory.measurements.FiO2.value;
        if (!treatments.Operation.RespiratorySupport.On) {
          if (
            (FPRatio < 300 &&
              !patient.Comorbidity.includes("LungDisease") &&
              !patient.Comorbidity.includes("CongenitalHeartDisease")) ||
            (organs.Respiratory.measurements.SpO2.value <= 97 && SFRatio < 264)
          )
            return 1;
        } else {
          if (
            (FPRatio < 200 &&
              !patient.Comorbidity.includes("LungDisease") &&
              !patient.Comorbidity.includes("CongenitalHeartDisease")) ||
            (organs.Respiratory.measurements.SpO2.value <= 97 && SFRatio < 220)
          )
            return 1;
        }
        return 0;
      },
    },
  },
};

export const Renal = {
  name: "Renal",
  abbv: "Renal",
  measurements: {
    pH: {
      name: "pH",
      fulltext: "Blood pH",
      unit: "",
      type: "number",
      minValue: 0.0,
      maxValue: 14,
      decimal: 1,
      getThres: () => {
        return { low: 7.4, high: 8.0 };
      },
    },
    BaseExcess: {
      name: "Base Excess",
      fulltext: "Base Excess",
      unit: "mEq/L",
      type: "number",
      minValue: -100,
      maxValue: 100,
      decimal: 1,
      getThres: () => {
        return { low: -5, high: 5 };
      },
    },
    BUN: {
      name: "BUN",
      fulltext: "Blood Urea Nitrogen",
      unit: "mg/dl",
      type: "number",
      minValue: 0,
      maxValue: 100,
      decimal: 0,
      getThres: () => {
        return { low: 6, high: 24 };
      },
    },
    UrineOutput: {
      name: "Urine Output",
      fulltext: "Urine Output",
      unit: "mL/kg/hr",
      type: "number",
      minValue: 0,
      maxValue: 10000,
      decimal: 1,
      getThres: (AgeObject) => {
        const AgeGroupShock = AgeObject.AgeGroupShock;
        if (typeof AgeGroupShock == "undefined" || AgeGroupShock == null)
          return { low: 1, high: 10 };
        if ([1, 2].includes(AgeGroupShock)) return { low: 2.0, high: 10 };
        if ([3, 4].includes(AgeGroupShock)) return { low: 1.5, high: 10 };
        if ([5, 6, 7].includes(AgeGroupShock)) return { low: 1.0, high: 10 };
        else return { low: 1, high: 10 };
      },
    },
    Creatinine: {
      name: "Creatinine",
      fulltext: "Creatinine",
      unit: "mg/dL",
      type: "number",
      minValue: 0.0,
      maxValue: 20,
      decimal: 1,
      getThres: () => {
        return { low: 0.0, high: 1.1 };
      },
    },
    BaselineCreatinine: {
      name: "Baseline Creatinine",
      fulltext: "Baseline Creatinine",
      unit: "mg/dL",
      type: "number",
      minValue: 0.0,
      maxValue: 20,
      decimal: 1,
      getThres: () => {
        return { low: 0.0, high: 1.1 };
      },
    },
    Bicabonate: {
      name: "Bicabonate",
      fulltext: "Bicabonate",
      unit: "mEq/L",
      type: "number",
      minValue: 0,
      maxValue: 100,
      decimal: 0,
      getThres: () => {
        return { low: 22, high: 28 };
      },
    },
    Sodium: {
      name: "Sodium",
      fulltext: "Sodium",
      unit: "mEq/L",
      type: "number",
      minValue: 0,
      maxValue: 300,
      decimal: 0,
      getThres: () => {
        return { low: 135, high: 145 };
      },
    },
    Chloride: {
      name: "Chloride",
      fulltext: "Chloride",
      unit: "mEq/L",
      type: "number",
      minValue: 0,
      maxValue: 300,
      decimal: 0,
      getThres: () => {
        return { low: 95, high: 105 };
      },
    },
    Potassium: {
      name: "Potassium",
      fulltext: "Potassium",
      unit: "mEq/L",
      type: "number",
      minValue: 0,
      maxValue: 10,
      decimal: 1,
      getThres: () => {
        return { low: 3.7, high: 5.2 };
      },
    },
    Magnesium: {
      name: "Magnesium",
      fulltext: "Magnesium",
      unit: "mEq/L",
      type: "number",
      minValue: 0,
      maxValue: 14,
      decimal: 1,
      getThres: () => {
        return { low: 7.4, high: 8.0 };
      },
    },
  },
  assessments: {
    RenalSOFA: {
      name: "Renal SOFA",
      fulltext: "Renal SOFA",
      type: "number",
      minValue: 0,
      maxValue: 4,
      decimal: 0,
      getThres: () => {
        return { low: 0, high: 2 };
      },
      formula: (_, organs, _2) => {
        const valueCreatinine = organs.Renal.measurements.Creatinine.value;
        const valueUrineOutput = organs.Renal.measurements.UrineOutput.value;
        if (valueCreatinine <= 1.2) return 0;
        if (1.2 < valueCreatinine && valueCreatinine < 2.0) return 1;
        if (2.0 <= valueCreatinine && valueCreatinine < 3.5) return 2;
        if (3.5 <= valueCreatinine && valueCreatinine < 5) return 3;
        if (valueCreatinine >= 5) return 4;
        if (200 < valueUrineOutput && valueUrineOutput < 500) return 3;
        if (valueUrineOutput <= 200) return 4;
        return 0;
      },
    },
    RenalDysfunction: {
      name: "Renal Dysfunction Score",
      fulltext: "Renal Dysfunction Score",
      type: "number",
      minValue: 0,
      maxValue: 2,
      decimal: 0,
      formula: (patient, organs, _) => {
        let creatinineScore,
          baselineCreatinineScore = 0;
        const AgeGroupShock = patient.Age.AgeGroupShock;
        const CreatinineHighMap = {
          1: 0.8,
          2: 0.3,
          3: 0.4,
          4: 0.6,
          5: 0.7,
          6: 1.0,
          7: 1.2,
        };
        const CreatinineThres = CreatinineHighMap[AgeGroupShock];
        if (organs.Renal.measurements.Creatinine.value >= CreatinineThres)
          creatinineScore = 1;
        if (
          organs.Renal.measurements.Creatinine.value >=
          2 * organs.Renal.measurements.BaselineCreatinine.value
        )
          baselineCreatinineScore = 1;
        return creatinineScore + baselineCreatinineScore;
      },
    },
  },
};

export const Hematologic = {
  name: "Hematologic",
  abbv: "Hematol",
  measurements: {
    INR: {
      name: "INR",
      fulltext: "International Normalised Ratio for Blood Clotting",
      unit: "",
      type: "number",
      minValue: 0,
      maxValue: 20,
      decimal: 1,
      getThres: () => {
        return { low: 0.5, high: 2 };
      },
    },
    Platelet: {
      name: "Platelet",
      fulltext: "Platelet",
      unit: "k/mcL",
      type: "number",
      minValue: 0,
      maxValue: 1000,
      decimal: 6,
      getThres: () => {
        return { low: 100, high: 450 };
      },
    },
  },
  assessments: {
    HematologicDysfunction: {
      name: "Hematologic Dysfunction Score",
      fulltext: "Hematologic Dysfunction Score",
      type: "number",
      minValue: 0,
      maxValue: 1,
      decimal: 0,
      formula: (_, organs, _2) => {
        const plateletValue = organs.Hematologic.Platelet.value;
        if (plateletValue < 100) return 1;
        const plateletHistHigh = Math.max(
          ...Object.values(organs.Hematologic.Platelet.history)
        );
        if (plateletHistHigh - plateletValue >= 0.5 * plateletHistHigh)
          return 1;
        if (organs.Hematologic.INR.value > 2) return 1;
        return 0;
      },
    },
  },
};

export const Hepatic = {
  name: "Hepatic",
  abbv: "Hepatic",
  measurements: {
    Bilirubin: {
      name: "Bilirubin",
      fulltext: "Bilirubin",
      unit: "mg/dL",
      type: "number",
      minValue: 0,
      maxValue: 20,
      decimal: 3,
      getThres: () => {
        return { low: 0.1, high: 1.99 };
      },
    },
    ALT: {
      name: "ALT",
      fulltext: "Alanine Transaminase",
      unit: "U/L",
      type: "number",
      minValue: 0,
      maxValue: 200,
      decimal: 3,
      getThres: () => {
        return { low: 0, high: 200 };
      },
    },
  },
  assessments: {
    HepaticDysfunction: {
      name: "Hepatic Dysfunction Score",
      fulltext: "Hepatic Dysfunction Score",
      type: "number",
      minValue: 0,
      maxValue: 1,
      decimal: 0,
      formula: (patient, organs, _) => {
        const newBorn = patient.Age.AgeInDays <= 28;
        let ALTHighThres;
        if (newBorn) ALTHighThres = 25;
        else if (patient.Age.AgeInYears <= 1)
          ALTHighThres = patient.Gender ? 35 : 30;
        else if (patient.Age.AgeInYears <= 3) ALTHighThres = 30;
        else if (patient.Age.AgeInYears <= 6)
          ALTHighThres = patient.Gender ? 20 : 25;
        else if (patient.Age.AgeInYears <= 9) ALTHighThres = 25;
        else if (patient.Age.AgeInYears <= 18)
          ALTHighThres = patient.Gender ? 30 : 20;
        const score =
          (organs.Hepatic.Bilirubin.value >= 2 && !newBorn) ||
          organs.Hepatic.ALT.value >= 2 * ALTHighThres
            ? 1
            : 0;
        return score;
      },
    },
  },
};

export const Neurologic = {
  name: "Neurologic",
  abbv: "Neurol.",
  measurements: {
    GCS: {
      name: "GCS",
      fulltext: "Glasgow Coma Score",
      unit: "",
      type: "number",
      minValue: 0,
      maxValue: 15,
      decimal: 0,
      formula: (organs) => {
        return (
          organs.Neurologic.measurements.GlasgowEyeResponse.value +
          organs.Neurologic.measurements.GlasgowVerbalResponse.value +
          organs.Neurologic.measurements.GlasgowMotorResponse
        );
      },
    },
    GlasgowEyeResponse: {
      name: "Glasgow Eye Response",
      fulltext: "Glasgow Eye Response",
      unit: "",
      type: "choices",
      options: {
        "Opens spontaneously": 2,
        "Opens to verbal command, speech or shout (over 2 y/o), Opens to speech (under 2 y/o)": 1,
        "Opens to pain": 1,
        None: 0,
      },
    },
    GlasgowVerbalResponse: {
      name: "Glasgow Verbal Response",
      fulltext: "Glasgow Verbal Response",
      unit: "",
      type: "choices",
      options: {
        "Oriented and converses (over 2 y/o), Coos or babbles- normal activity (under 2 y/o)": 2,
        "Confused, but able to answer questions (over 2 y/o), Irritable and continually cries (under 2 y/o)": 1,
        "Inappropriate responses, words are discernible (over 2 y/o), Cries to pain (under 2 y/o)": 1,
        "Incomprehensible speech / sounds (over 2 y/o), Moans to pain (under 2 y/o)": 1,
        None: 0,
      },
    },
    GlasgowMotorResponse: {
      name: "Glasgow Motor Response",
      fulltext: "Glasgow Motor Response",
      unit: "",
      type: "choices",
      options: {
        "Obeys commands for movement (over 2 y/o), Moves spontaneously or purposefully (under 2 y/o)": 2,
        "Purposeful movement to painful stimulus (over 2 y/o), Withdraws from touch (under 2 y/o)": 1,
        "Withdraws from pain": 1,
        "Abnormal and spastic flexion, decorticate posture (over 2 y/o), Abnormal flexion to pain- decorticate response (under 2 y/o)": 1,
        "Extensor and rigid response, decerebrate posture (over 2 y/o), Extension to pain- decerebrate response (under 2 y/o)": 1,
        None: 0,
      },
    },
    Behavior: {
      name: "Behavior",
      fulltext: "Behavior",
      unit: "",
      type: "choices",
      options: {
        "Playing/Appropriate": 2,
        Sleeping: 2,
        Irritable: 1,
        "Confused/Reduced Response to Pain": 0,
      },
    },
    Pain: { name: "Pain", unit: "", type: "number" },
  },
};

export const Immune = {
  name: "Immune",
  abbv: "Immune",
  measurements: {
    WBC: {
      name: "WBC",
      fulltext: "White Blood Cell Count",
      unit: "K/mcL",
      type: "number",
      minValue: 0,
      maxValue: 50,
      decimal: 2,
      getThres: (AgeObject) => {
        let AgeGroupVitals = AgeObject.AgeGroupVitals;
        if (typeof AgeGroupVitals == "undefined" || AgeGroupVitals == null)
          return { low: 4, high: 12 };
        if (AgeGroupVitals === 1) return { low: 5, high: 34 };
        if (AgeGroupVitals === 2) return { low: 5, high: 19.5 };
        if (AgeGroupVitals === 3) return { low: 5, high: 17.5 };
        if (AgeGroupVitals === 4) return { low: 6, high: 15.5 };
        if (AgeGroupVitals === 5) return { low: 4.5, high: 13.5 };
        if ([6, 7, 8, 9].includes(AgeGroupVitals))
          return { low: 4.5, high: 11.5 };
        return { low: 4, high: 12 };
      },
    },
    Temp: {
      name: "Temp",
      fulltext: "Temperature",
      unit: "°C",
      type: "number",
      minValue: 25,
      maxValue: 45,
      decimal: 0,
      getThres: (AgeObject) => {
        let AgeGroupVitals = AgeObject.AgeGroupVitals;
        if (typeof AgeGroupVitals == "undefined" || AgeGroupVitals == null)
          return { low: 36, high: 38 };
        if ([1, 2].includes(AgeGroupVitals)) return { low: 36, high: 37.9 };
        if ([3, 4, 5, 6, 7, 8, 9].includes(AgeGroupVitals))
          return { low: 36, high: 38.4 };
        return { low: 36, high: 38 };
      },
    },
    CoreTemp: {
      name: "CoreTemp",
      fulltext: "Core Temperature",
      unit: "°C",
      type: "number",
      minValue: 25,
      maxValue: 45,
      decimal: 0,
      getThres: () => {
        return { low: 36, high: 38 };
      },
    },
  },
};

export const OrganDTConfig = [
  Cardiovascular,
  Respiratory,
  Immune,
  Renal,
  Hematologic,
  Hepatic,
  Neurologic,
];
