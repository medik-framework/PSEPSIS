export const MedicationCategories = [
  "Antibiotics-all",
  "Fluid Therapy",
  "Inotropes",
  "Antibiotics Set"
];

export const MedicationTabMapping = {
  "Antibiotics-all":0,
  "Fluid Therapy":1,
  "Inotropes":2,
  "OSF Antibiotics Set":3
};

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
  "Fluid Therapy": [
    {
      "name": "Lactated Ringer",
      "includeDisplay": true,
      "unit": "mL/kg",
      "dosage": ['20','5','10','15']
    },
    {
      "name": "Normal Saline",
      "includeDisplay": true,
      "unit": "mL/kg",
      "dosage": ['20', '5','10','15']
    }
  ],
}

export const AntibioticsSetConfig = {
  "Children > 28 days who are normal hosts":[
    {
      "title": "Vancomycin + Cefotaxime",
      "drugs": [
        {
          "name": "Vancomycin",
          "dosage": ["15","60"],
          "unit": "mg/kg"
        },
        {
          "name": "Cefotaxime",
          "dosage": ["50","100","150"],
          "unit": "mg/kg"
        }
      ]
    },
    {
      "title": "Vancomycin + Ceftriaxone",
      "drugs": [
        {
          "name": "Vancomycin",
          "dosage": ["15","60"],
          "unit": "mg/kg"
        },
        {
          "name": "Ceftriaxone",
          "dosage": ["75","50"],
          "unit": "mg/kg"
        }
      ]
    }
  ],
  "Children > 28 days who are immunosuppressed or at risk for infection with Pseudomonas species": [
    {
      "title": "Vancomycin + Cefepime",
      "drugs": [
        {
          "name": "Vancomycin",
          "dosage": ["15","60"],
          "unit": "mg/kg"
        },
        {
          "name": "Cefepime",
          "dosage": ["50"],
          "unit": "mg/kg"
        }
      ]
    },
    {
      "title": "Vancomycin + Ceftazidime",
      "drugs": [
        {
          "name": "Vancomycin",
          "dosage": ["15","60"],
          "unit": "mg/kg"
        },
        {
          "name": "Ceftazidime",
          "dosage": ["50"],
          "unit": "mg/kg"
        }
      ]
    },
  ],
  "Children who cannot receive penicillin or who have received broad-specturm antibiotics": [
    {
      "title": "Vancomycin + Meropenem",
      "drugs": [
        {
          "name": "Vancomycin",
          "dosage": ["15","60"],
          "unit": "mg/kg"
        },
        {
          "name": "Meropenem",
          "dosage": ["20"],
          "unit": "mg/kg"
        }
      ]
    }
  ],
  "Patients at increased risk of fungal infection":
  [{
    "title": "Add liposomal Amphotericin B or an echinocandin (eg, caspofungin, micafungin) to the antimicrobial regimen"
  }],
  "Patients with risk factors for rickettsial infection":
  [{
    "title": "Add a tetracycline antibiotic (eg, doxycycline) to the antimicrobial regimen"
  }],
  "Infants 0 to 28 days of age" :
  [
    {
      "title": "Vancomycin + Cefotaxime + Gentamicin",
      "drugs": [
        {
          "name": "Vancomycin",
          "dosage": ["15","60"],
          "unit": "mg/kg"
        },
        {
          "name": "Cefotaxime",
          "dosage": ["50","100","150"],
          "unit": "mg/kg"
        },
        {
          "name": "Gentamicin",
          "dosage": ["2.5","7.5"],
          "unit": "mg/kg"
        }
      ]
    },
    {
      "title": "Ampicillin + Cefotaxime + Gentamicin",
      "drugs": [
        {
          "name": "Ampicillin",
          "dosage": ["50","200"],
          "unit": "mg/kg"
        },
        {
          "name": "Cefotaxime",
          "dosage": ["50","100","150"],
          "unit": "mg/kg"
        },
        {
          "name": "Gentamicin",
          "dosage": ["2.5","7.5"],
          "unit": "mg/kg"
        }
      ]
    }
  ],
}
