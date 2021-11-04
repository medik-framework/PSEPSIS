import { useState } from "react";

import { TextField, MenuItem, Button, Grid, Checkbox } from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";

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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  select: {
    marginTop: "10px",
  },
  button: {
    textAlign: "center",
    height: "30px",
  },
}));

export default function CheckList() {
  const classes = useStyles();
  const [checkListName, setCheckListName] = useState(
    Object.keys(checkLists)[0]
  );

  return (
    <div className={classes.root}>
      Pending Orders
      <Grid container spacing={3}>
        <div style={{ margin: 0, padding: 0 }}>
          <table size="sm" style={{ margin: 0, padding: 0 }}>
            <thead style={{ display: "block", width: "100%" }}>
              <tr
                style={{ display: "flex", width: "100%", overflow: "ellipsis" }}
              >
                <th style={{ overflow: "ellipsis" }}>Given Time</th>
                <th>Order</th>
                <th>Amount</th>
                <th>Action</th>
                <th>Cancel</th>
                <th>Reminder</th>
              </tr>
            </thead>
          </table>
        </div>
      </Grid>
    </div>
  );
}
