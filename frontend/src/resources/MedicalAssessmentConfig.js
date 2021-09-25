export const assessments = {
    SIRS: {
      name: "SIRS Score",
      measurements: [
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
      value: 0,
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
        CardiovascularDT["Urine Output"],
      ],
      value: 0,
    },
    PEW: { name: "PEW Score", unit: "", type: "number" },
  };