export const MedicationCategories = [
  "Antibiotics-all",
  "Fluid therapy",
  "Inotropes",
  "OSF Antibiotics Set",
];

export const MedicationConfig = {
  "Antibiotics-all": [
    {
      "name": "Ceftriaxone",
      "includeDisplay": true,
      "unit": "mg/kg",
      "dosage": ['75', '50']
    },
    {
      "name": "Ceftazidime",
      "includeDisplay": true,
      "unit": "mg/kg",
      "dosage": ['50']
    },
    {
      "name": "Doxycyline",
      "includeDisplay": true,
      "unit": "mg",
      "dosage": ['100']
    },
    {
      "name": "Azithromycin",
      "includeDisplay": true,
      "unit": "mg/kg",
      "dosage": ['10']
    },
    {
      "name": "Ciprofloxacin",
      "includeDisplay": true,
      "unit": "mg",
      "dosage": ['400']
    },
    {
      "name": "Vancomycin",
      "includeDisplay": true,
      "unit": "mg/kg",
      "dosage": ['15', '60']
    },
    {
      "name": "Cefotaxime",
      "includeDisplay": true,
      "unit": "mg/kg",
      "dosage": ['50', '100', '150']
    },
    {
      "name": "Levofloxacin",
      "includeDisplay": true,
      "unit": "mg/kg",
      "dosage": ['10']
    },
    {
      "name": "Cefepime",
      "includeDisplay": true,
      "unit": "mg/kg",
      "dosage": ['50']
    },
    {
      "name": "Metronidazole",
      "includeDisplay": true,
      "unit": "mg/kg",
      "dosage": ['7.5']
    },
    {
      "name": "Gentamicin",
      "includeDisplay": true,
      "unit": "mg/kg",
      "dosage": ['2.5', '7.5']
    },
    {
      "name": "Aztreonam",
      "includeDisplay": true,
      "unit": "mg/kg",
      "dosage": ['30']
    },
    {
      "name": "Ciprofloxacin",
      "includeDisplay": true,
      "unit": "mg/kg",
      "dosage": ['10', '20']
    },
    {
      "name": "Ampicillin",
      "includeDisplay": true,
      "unit": "mg/kg",
      "dosage": ['50', '200']
    },
    {
      "name": "Meropenem",
      "includeDisplay": true,
      "unit": "mg/kg",
      "dosage": ['20']
    },
    {
      "name": "Clindamycin",
      "includeDisplay": true,
      "unit": "mg/kg",
      "dosage": ['8', '12', '25']
    },
    {
      "name": "Tetracycline",
      "includeDisplay": true,
      "unit": "mg/kg",
      "dosage": ['50']
    },
    {
      "name": "Piperacillin",
      "includeDisplay": true,
      "unit": "mg/kg",
      "dosage": ['80', '100']
    }
  ],
  "Inotropes": [
    {
      "name": "Epinephrine",
      "includeDisplay": true,
      "unit": "mcg/kg/min IV",
      "dosage": ['0.1', '0.2', '0.5', '1']
    },
    {
      "name": "Norepinephrine",
      "includeDisplay": true,
      "unit": "mcg/min",
      "dosage": ['0.1', '0.2', '0.5', '2']
    },
    {
      "name": "Dopamine",
      "includeDisplay": true,
      "unit": "mcg/kg/min IV",
      "dosage": ['2', '5', '10', '15', '20']
    },
    {
      "name": "Dobutamine",
      "includeDisplay": true,
      "unit": "mcg/kg/min IV",
      "dosage": ['2', '5', '10', '15', '20']
    }
  ],
  "Fluid therapy": [
    {
      "name": "Lactated Ringer",
      "includeDisplay": true,
      "unit": "mL/kg",
      "dosage": ['20']
    },
    {
      "name": "Normal Saline",
      "includeDisplay": true,
      "unit": "mL/kg",
      "dosage": ['20']
    }
  ],
  "OSF Antibiotics Set": {
      "Children > 28 days normal host":{

      },
      "Children > 28 days immunosuppressed/at resk for infection Pseudomonas species":{

      },
      "Children > 28 cannot recieve penicillin or have recently received braod-spectrum antibiotics":{

      },
      "Patinet at increased risk of fungal infection":{

      },
      "Patients with risk for rickettsial infection":{

      },
      "infants 0-28 days":{

      },
    }
}
