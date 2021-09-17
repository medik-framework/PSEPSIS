export const organTabs = [

]

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
    value: 0,
    formula: (data)=>{
      return 0;
    }
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

export const getVitalsAgeGroup = (days) => {
    if (days < 28) return 1;
    else if (days < 60) return 2; 
    else if (days < 356) return 3;
    else if (days < 365*2) return 4;
    else if (days < 365*4) return 5;
    else if (days < 365*6) return 6;
    else if (days < 365*10) return 7;
    else if (days < 365*13) return 8;
    else return 9;
}

export const getShockAgeGroup = (days) => {
    if (days < 28) return 1;
    else if (days < 356) return 2;
    else if (days < 365*2) return 3;
    else if (days < 365*5) return 4;
    else if (days < 365*12) return 5;
    else if (days < 365*18) return 6;
    else return 7;
}

export const convertAge = (value, unit) => {
  let days, years;
  if (unit === "weeks old") {
    days = value*7;
    years = Math.floor(this.days / 365);
  } else if (unit === "months old") {
    days = value*30;
    years = Math.floor(value / 12);
  } else if (unit === "years old") {
    days = value*365;
    years = value;
  }
  return {ageInDays: days, ageInYears: years};
}

export const PatientBasic = {
  Age: { name: "Age", type: "group",
         generateContent: (value, unit)=>{
          const {ageInDays, ageInYears} = convertAge(value, unit);
          return {
            value: value,
            unit:  unit,
            AgeGroupVitals: getVitalsAgeGroup(ageInDays),
            AgeGroupShock:  getShockAgeGroup(ageInDays),
            AgeInYears:     ageInYears,
          };
         }
  },
  Weight: { name: "Weight", unit: "Kg", type: "number" },
  Height: { name: "Height", unit: "m", type: "number" },
  Gender: { name: "Gender", unit: "", type: "choices", options: {"Female":0, "Male":1} },
}

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
    BUN: { name: "BUN", unit: "mg/dl", type: "number" },
    UrineOutput: { name: "Urine Output", unit: "mL/kg/hr", type: "number" },
    Creatinine: { name: "Creat", unit: "mg/dL", type: "number" },
    BaselineCreatinine: { name: "Baseline Creat", unit: "mg/dL", type: "number" },
  }
}

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
  }
}

export const OthersDT = {
  name: "Others",
  measurements: {
    Pain: { name: "Pain", unit: "", type: "number" },
    PEW: { name: "PEW Score", unit: "", type: "number" },
  }
}

export const ImmuneDT = {
  name: "Immune",
  measurements: {
    WBC: { name: "WBC", fulltext: "White Blood Cell Count", unit: "K/mcL", type: "number",
           minValue="0", maxValue="50", decimal="2",
           getThres: (AgeGroupVitals) => {
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
      getThres: (AgeGroupVitals) => {
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
  }
}