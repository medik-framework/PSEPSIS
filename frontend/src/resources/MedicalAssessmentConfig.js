import {
  Cardiovascular as CardiovascularDT,
  Immune as ImmuneDT,
  Neurologic as NeurologicDT,
  Respiratory as RespiratoryDT,
} from "./DigitalTwinConfigReorganized";

export const MedicalAssessment = {
  SIRS: {
    name: "SIRS Score",
    measurements: [
      CardiovascularDT.measurements.HR,
      ImmuneDT.measurements.WBC,
      CardiovascularDT.measurements["BP Sys"],
      CardiovascularDT.measurements["BP Dia"],
      CardiovascularDT.measurements.Temp,
      CardiovascularDT.measurements.CoreTemp,
      RespiratoryDT.measurements.RR,
    ],
    value: 0,
    formula: (data) => {
      return 0;
    },
  },
  Sepsis: {
    name: "Sepsis Score",
    measurements: [
      CardiovascularDT.measurements.HR,
      CardiovascularDT.measurements["Pulse Quality"],
      CardiovascularDT.measurements["BP Sys"],
      CardiovascularDT.measurements["BP Dia"],
      CardiovascularDT.measurements["Capillary Refill"],
      CardiovascularDT.measurements.Temp,
      CardiovascularDT.measurements.CoreTemp,
      NeurologicDT.measurements["Skin Color"],
      NeurologicDT.measurements.Behavior,
    ],
    value: 0,
  },
  "Septic Shock": {
    name: "Septic Shock Score",
    measurements: [
      CardiovascularDT.measurements["BP Sys"],
      CardiovascularDT.measurements["BP Dia"],
      CardiovascularDT.measurements.MAP,
      CardiovascularDT.measurements["Capillary Refill"],
      CardiovascularDT.measurements.PaCO2,
      CardiovascularDT.measurements.pH,
      CardiovascularDT.measurements["Base Excess"],
      CardiovascularDT.measurements.Lactate,
      CardiovascularDT.measurements.Temp,
      CardiovascularDT.measurements.CoreTemp,
      CardiovascularDT.measurements["Urine Output"],
    ],
    value: 0,
  },
  PEW: { 
    name: "PEW Score", 
    value: 0,
  },
};
