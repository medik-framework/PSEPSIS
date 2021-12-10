import { useState } from "react";

import { TextField, MenuItem, Button, Grid, Checkbox } from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  select: {
    marginTop: "10px",
  },
  button: {
    textAlign: "center",
    height: "30px",
  },
}));

export default function TreatmentLog() {
  const classes = useStyles();

  return (
    <div>
      Treatment and Lab/Vitals Log
      <Grid container spacing={3}>
        <div style={{ margin: 0, padding: 0 }}>
          <table size="sm" style={{ margin: 0, padding: 0 }}>
            <thead style={{ display: "block", width: "100%" }}>
              <tr style={{ display: "flex", width: "100%" }}>
                <th>Time</th>
                <th>Name</th>
                <th>Value</th>
                <th>Reminder</th>
              </tr>
            </thead>
          </table>
        </div>
      </Grid>
    </div>
  );
}
