export const organDTs = [
  CardiovascularDT,
  HematologicDT,
  HepaticDT,
  NeurologicDT,
  RenalDT,
  RespiratoryDT,
  OthersDT,
];

export const CardiovascularDT = {
  name: "Cardiovascular",
  measurements: {
    HR: { name: "HR", fulltext: "Heart Rate", 
          unit: "bpm", type: "number", 
          minValue="0", maxValue="250", decimal="0",
          getThres: (AgeObject) => {
            const AgeGroupVitals = AgeObject.AgeGroupVitals;
            if (typeof AgeGroupVitals == 'undefined' || AgeGroupVitals == null)
              return {low: 50,  high: 130}; 
            if ([1,2].includes(AgeGroupVitals)) return {low: 100, high: 205};
            if (AgeGroupVitals === 3)           return {low: 90,  high: 190};
            if (AgeGroupVitals === 4)           return {low: 80,  high: 190};
            if (AgeGroupVitals === 5)           return {low: 70,  high: 140};
            if (AgeGroupVitals in [6,7])        return {low: 60,  high: 140};
            if ([8,9].includes(AgeGroupVitals)) return {low: 60,  high: 100};
            return {low: 50,  high: 130}
          }
    },
    PulseQuality: {
      name: "Pulse Quality", fulltext: "Pulse Quality", 
      unit: "", type: "choices",
      options: {"Bounding":0, "Normal":2, "Thready":0}
    },
    BP: { name: "BP", fulltext: "Blood Pressure", type: "group",
          content: {
            BPSys: { name: "BP Sys", fulltext: "Systolic Blood Pressure", 
                     unit: "mmHg", type: "number",
                     minValue="0", maxValue="250", decimal="0",
                     getThres: (AgeObject) => {
                        const AgeGroupVitals = AgeObject.AgeGroupVitals;
                        const AgeInYears = AgeObject.AgeInYears;
                        if (typeof AgeGroupVitals == 'undefined' || AgeGroupVitals == null)
                          return {low: 100,  high: 180};
                        if (AgeGroupVitals === 1)               return {low: 60,  high: 180};
                        if ([2,3].includes(AgeGroupVitals))     return {low: 70,  high: 180};
                        if ([4,5,6,7].includes(AgeGroupVitals)) return {low: 70+AgeInYears*2,  high: 180};
                        if ([8,9].includes(AgeGroupVitals))     return {low: 90,  high: 180};
                        return {low: 100,  high: 180}
                     }
            },
            BPDia: { name: "BP Dia", fulltext: "Diastolic Blood Pressure", 
                     unit: "mmHg", type: "number",
                     minValue="0", maxValue="150", decimal="0",
                     getThres: (AgeObject) => {
                        const AgeGroupVitals = AgeObject.AgeGroupVitals;
                        if (typeof AgeGroupVitals == 'undefined' || AgeGroupVitals == null)
                          return {low: 60,  high: 80};
                        if (AgeGroupVitals === 1)               return {low: 35,  high: 53};
                        if ([2,3].includes(AgeGroupVitals))     return {low: 37,  high: 56};
                        if (AgeGroupVitals === 4)               return {low: 42,  high: 63};
                        if (AgeGroupVitals === 5)               return {low: 57,  high: 76};
                        if ([6,7,8,9].includes(AgeGroupVitals)) return {low: 64,  high: 83};
                        return {low: 60,  high: 80}
                     }
            },
          }
    },
    MAP: { 
      name: "MAP", fulltext: "Mean Arterial Pressure", 
      unit: "mmHg", type: "number",
      minValue="0", maxValue="300", decimal="0",
      getThres: (AgeObject) => {
        const AgeGroupVitals = AgeObject.AgeGroupVitals;
        if (typeof AgeGroupVitals == 'undefined' || AgeGroupVitals == null)
          return {low: 65,  high: 110};
        if (AgeGroupVitals === 1)               return {low: 46,  high: 110};
        if ([2,3].includes(AgeGroupVitals))     return {low: 55,  high: 110};
        if (AgeGroupVitals === 4)               return {low: 60,  high: 110};
        if ([5,6].includes(AgeGroupVitals))     return {low: 65,  high: 110};
        if ([7,8].includes(AgeGroupVitals))     return {low: 64,  high: 110};
        if (AgeGroupVitals === 49)              return {low: 67,  high: 110};
        return {low: 65,  high: 110}
     }
    },
    CapillaryRefill: {
      name: "Capillary Refill", fulltext: "Capillary Refill",
      unit: "sec", type: "choices",
      options: {"Flash" :0, "1":2, "2":2, "3":0, "4":0, "5+":0},
    },
    Lactate: { 
      name: "Lactate", fulltext: "Blood Lactate",
      unit: "mmol/L", type: "number",
      minValue="0", maxValue="100", decimal="1",
      getThres: () => { return {low:4.5, high:19.8} }
    },
    CVP: {
      name: "CVP", fulltext: "Central Venus Pressure",
      unit: "mmHg", type: "number",
      minValue="0", maxValue="30", decimal="0",
      getThres: () => { return {low:8, high:12} }
    },
    ScvO2: {
      name: "ScvO2", fulltext: "Central Venus Oxygen Saturation",
      unit: "%", type: "number",
      minValue="0", maxValue="100", decimal="0",
      getThres: () => { return {low:65, high:100} }
    },
    Hgb: {
      name: "Hgb", fulltext: "Hemoglobin",
      unit: "g/dL", type: "number",
      minValue="0", maxValue="100", decimal="1",
      getThres: () => { return {low:12, high:17} }
    },
    CardioOutput: {
      name: "Cardio Output", fulltext: "Cardio Output",
      unit: "L/min", type: "number",
      minValue="0.0", maxValue="20.0", decimal="1",
      getThres: () => { return {low:4, high:8} }
    },
    PRA: {
      name: "PRA", fulltext: "Panel Reactive Antibodies",
      unit: "%", type: "number",
      minValue="0", maxValue="100", decimal="3",
      getThres: () => { return {low:0, high:100} }
    },
    SkinColor: {
      name: "Skin Color", fulltext: "Skin Color",
      unit: "sec", type:"choices",
      options: {"Flushed":0, "Pink":2, "Pale":0, "Gray":0, "Gray and Mottled":0},
    },
  },
  assessments: {
    CardioSOFA: {
      name: "Cardio SOFA", fulltext: "Cardiovascular SOFA",
      type: "number", minValue="0", maxValue="4", decimal="0",
      getThres: () => { return {low:0, high:2} },
      formula: (data) => {
        if (data.MAP>=70) return 0;
        if (data.MAP<70) return 1;
      }
    }
  }
};

export const RespiratoryDT = {
  name: "Respiratory",
  measurements: {
    RR: { 
      name: "RR", fulltext: "Respiratory Rate", 
      unit: "bpm", type: "number",
      minValue="0", maxValue="100", decimal="0",
      getThres: (AgeObject) => {
        const AgeGroupVitals = AgeObject.AgeGroupVitals;
        if (typeof AgeGroupVitals == 'undefined' || AgeGroupVitals == null)
          return {low: 12,  high: 20};
        if ([1,2].includes(AgeGroupVitals))     return {low: 12,  high: 50};
        if (AgeGroupVitals === 3)               return {low: 12,  high: 45};
        if (AgeGroupVitals === 4)               return {low: 12,  high: 28};
        if (AgeGroupVitals === 5)               return {low: 12,  high: 25};
        else return {low: 12,  high: 20};
     }
    },
    SpO2: { 
      name: "SpO2", fulltext: "Peripheral Capillary Oxygen Saturation", 
      unit: "%", type: "number",
      minValue="0", maxValue="100", decimal="0",
      getThres: () => { return {low:90, high:100} }
    },
    PaO2: { 
      name: "PaO2", fulltext: "Partial Pressure of Oxygen",
      unit: "mmHg", type: "number",
      minValue="0", maxValue="300", decimal="0",
      getThres: () => { return {low:84, high:200} }
    },
    PaCO2: {
      name: "PaCO2", fulltext: "Partial Pressure of Carbon Dioxide",
      unit: "mmHg", type: "number" ,
      minValue="0", maxValue="150", decimal="0",
      getThres: () => { return {low:38, high:42} }
    },
    FiO2: { 
      name: "FiO2", fulltext: "Fraction of Inspired Oxygen",
      unit: "", type: "number",
      minValue="0", maxValue="1", decimal="2"
    },
    etCO2: {
      name: "etCO2", fulltext: "End-Tidal Carbon Dioxide",
      unit: "mmHg", type: "number" ,
      minValue="0", maxValue="300", decimal="0",
      getThres: () => { return {low:25, high:65} }
    }
  },
  assessments: {
    RespSOFA: {
      name: "Resp SOFA", fulltext: "Respiratory SOFA",
      type: "number", minValue="0", maxValue="4", decimal="0",
      getThres: () => { return {low:0, high:2} },
      formula: (data) => {
        let ratio = data.PaO2/data.FiO2;
        if (ratio >= 400) return 0;
        if (300 < ratio <  400) return 1;
        if (200 < ratio <= 300) return 2;
        if (100 < ratio <= 200) return 3;
        if (ratio <= 100) return 4;
      }
    }
  }
}

export const RenalDT = {
  name: "Renal",
  measurements : {
    pH: { 
      name: "pH", fulltext: "Blood pH",
      unit: "", type: "number",
      minValue="0.0", maxValue="14.0", decimal="1",
      getThres: () => { return {low:7.4, high:8.0} }
    },
    BaseExcess: { 
      name: "Base Excess", fulltext: "Base Excess",
      unit: "mEq/L", type: "number",
      minValue="-100", maxValue="100", decimal="1",
      getThres: () => { return {low:-5, high:5} }
    },
    BUN: { 
      name: "BUN", fulltext: "Blood Urea Nitrogen",
      unit: "mg/dl", type: "number",
      minValue="0", maxValue="100", decimal="0",
      getThres: () => { return {low:6, high:24} }
    },
    UrineOutput: { 
      name: "Urine Output", fulltext: "Urine Output",
      unit: "mL/kg/hr", type: "number",
      minValue="0", maxValue="10000", decimal="1",
      getThres: () => { return {low:800, high:2000} }
    },
    Creatinine: { 
      name: "Creatinine", fulltext: "Creatinine",
      unit: "mg/dL", type: "number",
      minValue="0.0", maxValue="20.0", decimal="1",
      getThres: () => { return {low:0.0, high:1.1} }
    },
    BaselineCreatinine: { 
      name: "Baseline Creatinine", fulltext: "Baseline Creatinine",
      unit: "mg/dL", type: "number",
      minValue="0.0", maxValue="20.0", decimal="1",
      getThres: () => { return {low:0.0, high:1.1} }
    },
    Bicabonate: { 
      name: "Bicabonate", fulltext: "Bicabonate",
      unit: "mEq/L", type: "number",
      minValue="0", maxValue="100", decimal="0",
      getThres: () => { return {low:22, high:28} }
    },
    Sodium: { 
      name: "Sodium", fulltext: "Sodium",
      unit: "mEq/L", type: "number",
      minValue="0", maxValue="300", decimal="0",
      getThres: () => { return {low:135, high:145} }
    },
    Chloride: { 
      name: "Chloride", fulltext: "Chloride",
      unit: "mEq/L", type: "number",
      minValue="0", maxValue="300", decimal="0",
      getThres: () => { return {low:95, high:105} }
    },
    Potassium: { 
      name: "Potassium", fulltext: "Potassium",
      unit: "mEq/L", type: "number",
      minValue="0", maxValue="10", decimal="1",
      getThres: () => { return {low:3.7, high:5.2} }
    },
    Magnesium: { 
      name: "Magnesium", fulltext: "Magnesium",
      unit: "mEq/L", type: "number",
      minValue="0", maxValue="14", decimal="1",
      getThres: () => { return {low:7.4, high:8.0} }
    },
  },
  assessments: {
    RenalSOFA: {
      name: "Renal SOFA", fulltext: "Renal SOFA",
      type: "number", minValue="0", maxValue="4", decimal="0",
      getThres: () => { return {low:0, high:2} },
      formula: (data) => {
        if (typeof data.Creatinine == 'undefined' || data.Creatinine == null){
          if (data.Creatinine <= 1.2) return 0;
          if (1.2 <  data.Creatinine < 2.0) return 1;
          if (2.0 <= data.Creatinine < 3.5) return 2;
          if (3.5 <= data.Creatinine < 5) return 3;
          if (data.Creatinine >= 5) return 4;
        }
        if (typeof data.UrineOutput == 'undefined' || data.UrineOutput == null){
          if (200 < data.Creatinine < 500) return 3;
          if (data.Creatinine <= 200) return 4;
        }
      }
    }
  }
}

export const HematologicDT = {
  name: "Hematologic",
  measurements: {
    INR: { 
      name: "INR", fulltext: "International Normalised Ratio for Blood Clotting",
      unit: "", type: "number",
      minValue="0", maxValue="20", decimal="1",
      getThres: () => { return {low:0.5, high:2} }
    },
    Platelet: { 
      name: "Platelet", fulltext: "Platelet",
      unit: "k/mcL", type: "number",
      minValue="0", maxValue="1000", decimal="6",
      getThres: () => { return {low:100, high:450} }
    },
  },
};

export const HepaticDT = {
  name: "Hepatic",
  measurements: {
    Bilirubin: { 
      name: "Bilirubin", fulltext: "Bilirubin",
      unit: "mg/dL", type: "number",
      minValue="0", maxValue="20", decimal="3",
      getThres: () => { return {low:0.1, high:1.99} }
    },
    ALT: { 
      name: "ALT", fulltext: "Alanine Transaminase",
      unit: "U/L", type: "number",
      minValue="0", maxValue="200", decimal="3",
      getThres: () => { return {low:0, high:200} }
    },
  },
};

export const NeurologicDT = {
  name: "Neurologic",
  measurements: {
    GCS: {
      name: "GCS", fulltext: "Glasgow Coma Score",
      unit: "", type: "number",
      minValue="0", maxValue="15", decimal="0"
    },
    GlasgowEyeResponse: {
      name: "Glasgow Eye Response", fulltext: "Glasgow Eye Response",
      unit: "", type: "choices",
      options: {
        "Opens spontaneously": 2, 
        "Opens to verbal command, speech or shout (over 2 y/o), Opens to speech (under 2 y/o)": 1, 
        "Opens to pain": 1,
        "None": 0,
      }
    },
    GlasgowVerbalResponse: {
      name: "Glasgow Verbal Response", fulltext: "Glasgow Verbal Response",
      unit: "", type: "choices",
      options: {
        "Oriented and converses (over 2 y/o), Coos or babbles- normal activity (under 2 y/o)": 2, 
        "Confused, but able to answer questions (over 2 y/o), Irritable and continually cries (under 2 y/o)": 1, 
        "Inappropriate responses, words are discernible (over 2 y/o), Cries to pain (under 2 y/o)": 1,
        "Incomprehensible speech / sounds (over 2 y/o), Moans to pain (under 2 y/o)": 1,
        "None": 0,
      }
    },
    GlasgowMotorResponse: {
      name: "Glasgow Motor Response", fulltext: "Glasgow Motor Response",
      unit: "", type: "choices",
      options: {
        "Obeys commands for movement (over 2 y/o), Moves spontaneously or purposefully (under 2 y/o)":2,
        "Purposeful movement to painful stimulus (over 2 y/o), Withdraws from touch (under 2 y/o)":1,
        "Withdraws from pain":1,
        "Abnormal and spastic flexion, decorticate posture (over 2 y/o), Abnormal flexion to pain- decorticate response (under 2 y/o)":1,
        "Extensor and rigid response, decerebrate posture (over 2 y/o), Extension to pain- decerebrate response (under 2 y/o)":1,
        "None":0,
      },
    },
    Behavior: {
      name: "Behavior", fulltext: "Behavior",
      unit: "", type: "choices",
      options: {
        "Playing/Appropriate":2,
        "Sleeping":2,
        "Irritable":1,
        "Confused/Reduced Response to Pain":0,
      },
    },
  },
};

export const ImmuneDT = {
  name: "Immune",
  measurements: {
    WBC: { name: "WBC", fulltext: "White Blood Cell Count", unit: "K/mcL", type: "number",
           minValue="0", maxValue="50", decimal="2",
           getThres: (AgeObject) => {
            let AgeGroupVitals = AgeObject.AgeGroupVitals;
            if (typeof AgeGroupVitals == 'undefined' || AgeGroupVitals == null)
              return {low: 4,  high: 12};
            if (AgeGroupVitals === 1)           return {low: 5,  high: 34  };
            if (AgeGroupVitals === 2)           return {low: 5,  high: 19.5};
            if (AgeGroupVitals === 3)           return {low: 5,  high: 17.5};
            if (AgeGroupVitals === 4)           return {low: 6,  high: 15.5};
            if (AgeGroupVitals === 5)           return {low: 4.5,high: 13.5};
            if ([6,7,8,9].includes(AgeGroupVitals)) return {low: 4.5,high: 11.5};
            return {low: 4,  high: 12}
           }
    },
    Temp: { 
      name: "Temp", fulltext: "Temperature",
      unit: "°C", type: "number",
      minValue="25", maxValue="45", decimal="0",
      getThres: (AgeObject) => {
        let AgeGroupVitals = AgeObject.AgeGroupVitals;
        if (typeof AgeGroupVitals == 'undefined' || AgeGroupVitals == null)
          return {low: 36,  high: 38};
        if ([1,2].includes(AgeGroupVitals))           return {low: 36, high: 37.9 };
        if ([3,4,5,6,7,8,9].includes(AgeGroupVitals)) return {low: 36,high: 38.4};
        return {low: 36,  high: 38}
       }
    },
    CoreTemp: { 
      name: "CoreTemp", fulltext: "Core Temperature",
      unit: "°C", type: "number",
      minValue="25", maxValue="45", decimal="0",
      getThres: () => { return {low:36, high:38} }
    },
  }
}

export const OthersDT = {
  name: "Others",
  measurements: {
    Pain: { name: "Pain", unit: "", type: "number" },
  },
};