// export const getVitalsAgeGroup = (days) => {
//   if (days < 28) return 1;
//   else if (days < 60) return 2;
//   else if (days < 356) return 3;
//   else if (days < 365 * 2) return 4;
//   else if (days < 365 * 4) return 5;
//   else if (days < 365 * 6) return 6;
//   else if (days < 365 * 10) return 7;
//   else if (days < 365 * 13) return 8;
//   else return 9;
// };

// export const getShockAgeGroup = (days) => {
//   if (days < 28) return 1;
//   else if (days < 356) return 2;
//   else if (days < 365 * 2) return 3;
//   else if (days < 365 * 5) return 4;
//   else if (days < 365 * 12) return 5;
//   else if (days < 365 * 18) return 6;
//   else return 7;
// };

// export const convertAge = (value, unit) => {
//   let days, years;
//   if (unit === "weeks") {
//     days = value * 7;
//     years = Math.floor(this.days / 365);
//   } else if (unit === "months") {
//     days = value * 30;
//     years = Math.floor(value / 12);
//   } else if (unit === "years") {
//     days = value * 365;
//     years = value;
//   }
//   return { ageInDays: days, ageInYears: years };
// };


export const PatientConfig = {
  Age: {
    name: "Age",
    type: "group",
    getDays: (value, unit) => {
      let days;
        if (unit === "weeks") {
          days = value * 7;
        } else if (unit === "months") {
          days = value * 30;
        } else if (unit === "years") {
          days = value * 365;
        }
        return days;
    },
    generateContent: (value, unit) => {
      const convertAge = (value, unit) => {
        let days, years;
        if (unit === "weeks") {
          days = value * 7;
          years = Math.floor(days / 365);
        } else if (unit === "months") {
          days = value * 30;
          years = Math.floor(value / 12);
        } else if (unit === "years") {
          days = value * 365;
          years = Number(value);
        }
        return { ageInDays: days, ageInYears: years };
      };
      const getShockAgeGroup = (days) => {
        if (days < 28) return 1;
        else if (days < 356) return 2;
        else if (days < 365 * 2) return 3;
        else if (days < 365 * 5) return 4;
        else if (days < 365 * 12) return 5;
        else if (days < 365 * 18) return 6;
        else return 7;
      };
      const getVitalsAgeGroup = (days) => {
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
      const { ageInDays, ageInYears } = convertAge(value, unit);
      return {
        value: value,
        unit: unit,
        AgeGroupVitals: getVitalsAgeGroup(ageInDays),
        AgeGroupShock: getShockAgeGroup(ageInDays),
        AgeInYears: ageInYears,
        AgeInDays: ageInDays,
      };
    },
  },
  Weight: { name: "Weight", unit: "Kg", type: "number" },
  Height: { name: "Height", unit: "m", type: "number" },
  Gender: {
    name: "Gender",
    unit: "",
    type: "choices",
    options: { Female: 0, Male: 1 },
  },
  HighRisk: {
    name: "High Risk Conditions",
    unit: "",
    type: "choices",
    options: {
      "Splenectomy/Asplenia": 1,
      "Sickle Cell Disease": 1,
      "PICC/Central Venous Catheter": 1,
      "CSF Shunt": 1,
      Tracheostomy: 1,
      "Indwelling Urinary Catheter": 1,
      "Cerebral Palsy": 1,
      "Developmental Delay/Mental Retardation": 1,
      Cancer: 1,
      Immunosuppression: 1,
      "Petechial or Purpuric Rash": 1,
      "Obvious Source of Infection": 1,
      "Congenital Heart Disease": 1,
      "Large Surgical Incisions/ Serious Injury": 1,
    },
  },
};
