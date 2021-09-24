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
  Chronic: {},
  Medication: {}
}