
import { useState } from "react";
import { useDispatch, useSelector } from "react-router";

import {
  TextField,
  MenuItem,
  Button,
  Grid,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";

const checkLists = {
  "Culture Checklist": [
    "Urine culture obtained",
    "Blood culture obtained from venipuncture",
    "Blood culture obtained from line",
    "IV catheter culture obtained",
  ],
  "History & General Condition Checklist": [
    "High risk for pulmonary edema?",
    "History of renal insufficiency?",
    "History of immunodeficiency?",
    "Chronic steroid use/adrenal insufficiency?",
    "Unrepaired congenital heart disease?",
    "Indwelling vascular catheter or other invasive devices?",
    "History of pneumonia?",
  ],
  "Fluid Checklist": [
    "Pulmonary Edema",
    "Renal Insufficiency",
    "History of Congenital Heart Disease",
    "None"
  ],
  "Fluid Overload Checklist": [
    "Pulmonary Rales",
    "Hepatomegaly",
    "None"
  ],
  "High Risk Conditions": [

"Congenital Heart Disease",
"Splenectomy/Asplenia",
"Sickle Cell Disease",
"PICC/Central Venous Catheter",
"CSF Shunt",
"Tracheostomy",
"Indwelling Urinary Catheter",
"Cerebral Palsy",
"Developmental Delay/Mental Retardation",
"Cancer",
"Immunosuppression",
"Petechial or Purpuric Rash",
"Large Surgical Incisions/ Serious Injury",
"Obvious Source of Infection",
  ]
};

export default function CheckList() {
  const [checkListName, setCheckListName] = useState(
    Object.keys(checkLists)[0]
  );

  const dispatch = useDispatch();

  const checkedItems = useSelector(state => state.CheckList)

  const checkItem = (label) => {
    dispatch({type: "TOGGLE_CHECKLIST_ITEM", payload: {
        checklist: checkListName,
        item: label
    }})
}

  return (
    <div>
      <TextField
        select
        fullWidth
        value={checkListName}
        sx={{
          marginTop: "10px",
        }}
        onChange={(event) => setCheckListName(event.target.value)}
      >
        {Object.keys(checkLists).map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <FormGroup>
        {checkLists[checkListName].map((value) => {
          return (
            <Grid item xs={12} sx={{ backgroundColor: checkedItems[checkListName]?.contains(label) ? "yellow" : "white" }}>
              <FormControlLabel control={<Checkbox />} label={value} onChange={() => checkItem(label)}/>
            </Grid>
          );
        })}
      </FormGroup>
    </div>
  );
}
