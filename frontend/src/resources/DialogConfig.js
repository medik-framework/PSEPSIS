import { PatientBasic } from "./PatientConfig"

export const DialogConfig = {
    getAgeWeight: {
        title: "Please enter patient age and weight",
        inputConfig: [
            { 
                label: "Age", 
                type: "number", 
                unit: ["years", "months", "weeks"],
                processStorage: PatientBasic.Age.generateContent,
                storage: "patientBasic/update",
                processReturn: PatientBasic.Age.getDays,
            },
            { 
                label: "Weight", 
                type: "number", 
                unit: "kg",
                storage: "patientBasic/update",
            }
        ],
    },
    getHighRiskConditions: {
        title: "Please enter patient high risk conditions",
        inputConfig :[
            {
                label: "HighRiskConditions",
                type: "checklist",
                options: Object.keys(PatientBasic.HighRisk.options),
                storage: "patientBasic/update",
            }
        ]
    }
}