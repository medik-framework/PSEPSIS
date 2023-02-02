import { PatientConfig } from "./PatientConfig"

export const DialogConfig = {
    getAge: {
        title: "Please enter patient age",
        inputConfig:
            {
                label: "Age",
                type: "number",
                unit: ["years", "months", "weeks"],
                storage: "patientBasic/update_age",
                processReturn: PatientConfig.Age.getDays,
            },
    },
    getWeight: {
        title: "Please enter patient weight",
        inputConfig:{
            label: "Weight",
            type: "number",
            unit: "kg",
            storage: "patientBasic/update",
        }
    },
    getHighRiskConditions: {
        title: "Please enter patient high risk conditions",
        inputConfig :
            {
                label: "HighRiskConditions",
                type: "checklist",
                options: Object.keys(PatientConfig.HighRisk.options),
                storage: "patientBasic/update",
            },
    },
    threeBucket: {
        title: "Compute OSF Sepsis Score",
        inputConfig :{
            type: "threebucket"
        }
    },
    showSepsisWarning: {
        title: "Sepsis suspected, please start treatment bundle"
    },
    showSepsisClearance: {
        title: "Sepsis not suspected, please keep monitoring"
    }
}
