import { useState } from "react";

import { TextField, MenuItem, Button, Grid, Checkbox } from "@mui/material";

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
};

export default function CheckList() {
  const [checkListName, setCheckListName] = useState(
    Object.keys(checkLists)[0]
  );

  return (
    <div sx={{
    flexGrow: 1,
    width: "100%",
  }}>
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
      <Grid container spacing={3}>
        {checkLists[checkListName].map((value) => {
          return (
            <Grid item xs={12}>
              <Checkbox />
              <Button sx={{
    padding:2,
    textAlign: "center",
    color: "white",
    height: "30px",
  }}>{value}</Button>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
