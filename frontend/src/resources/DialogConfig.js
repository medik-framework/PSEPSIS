import { PatientConfig } from "./PatientConfig"

export const DialogConfig = {
    "get age": {
        title: "Please enter patient age",
        inputConfig:
            {
                label: "Age",
                type: "number",
                unit: ["years", "months", "weeks"],
                storage: "patientBasic/update_age",
                processReturn: PatientConfig.Age.getDays,
                eventName: "AgeEntered"
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
        title: "OSF 3 Bucket Tree",
        inputConfig:{
            lable:"",
            type: "threebucket",
            unit: "",
            storage: null
        }
    },
    oxygen: {
        title: "Respiratory interventions. Administer oxygen to maintain SpO2 of at least 94%",
        inputConfig: {
            label: "oxygen",
            type: "checklist",
            options: [
                "Oxygen mask",
                "Oxygen nasal cannula",
                "Oxygen high flow cannula"
            ],
            storage: "logs/add"
        }
    },
    antibiotics: {
        title: "Give antibiotics",
        inputConfig: {
            label: "antibiotics",
            type:  "checklist",
            options: [
                "Childre > 28 days normal hosts",
                "Children > 28 days immunosuppressed or at risk for infection with Pseudomonas sepcies",
                "Cannot receive pancillin or have recently received broad-spectrum antibiotics",
                "At risk of fungal infection",
                "Risk factors for rickettsial infection",
                "Infants 0 to 28 days"
            ],
            storage: "logs/add"
        }
    },
    culture: {
        title: "Culture",
        inputConfig: {
            label: "culture",
            type:  "checklist",
            options: [
                "Urine culture obtained",
                "Blood culture obtained from venipuncture",
                "Blood culture obtained from line",
                "IV catheter culture obtained"
            ],
            storage: "logs/add"
        }
    },
    fluid: {
        title: "Fluid",
        inputConfig: {
            label: "fluid",
            type:  "checklist",
            options: [
                "Pulmonary Edema",
                "Renal Insufficiency",
                "History of Congenital Heart Disease",
                "None"
            ],
            storage: "logs/add"
        }
    },
    history_and_general: {
        title: "History & General Condition",
        inputConfig: {
            label: "history&general",
            type:  "checklist",
            options: [
                "History of immunodeficiency?",
                "Chronic steroid use/adrenal insufficiency?",
                "Indwelling vascular catheter or other invasive?",
                "Pre-existing lung disease?"
            ],
            storage: "logs/add"
        }
    },
    fluid_overload: {
        title: "Fluid Overload",
        inputConfig: {
            label: "fluid_overload",
            type:  "checklist",
            options: [
                "Pulmonary Rales",
                "Hepatomegaly",
                "None"
            ]
        }
    },
    showSepsisWarning: {
        title: "Sepsis suspected, please start treatment bundle"
    },
    showSepsisClearance: {
        title: "Sepsis not suspected, please keep monitoring"
    }
}
