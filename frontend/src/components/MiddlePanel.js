import { useState } from "react";

import { Grid, FormGroup, FormControlLabel, Checkbox, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const bundleList = [
  "Start continuous cardiorespiratiory monitoring (pulse oximetry, HR, BP)",
  "Respiratory interventions. Administer oxygen to maintain SpO2 of at least 94%",
  "Obtain IV/IO",
  "POCT Lactic Acid / Blood Gas",
  "Complete Blood Count (CBC) WITH Diff",
  "Comprehensive Metablic Panel (CMP)",
  "Culture",
  "Give antibiotics",
  "Consider fluid resuscitation",
  "Infection Source Control. Consider diagnostic imaging based on patient's clinical exam",
  "Consider inotropic support early",
];

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


export default function OneHourBundle() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom component="div">
        OSF PSepsis Bundle
      </Typography>
        <FormGroup>
          {bundleList.map((value) => {
            return (
              <Grid item xs={12}>
                <FormControlLabel control={<Checkbox />} label={value} />
              </Grid>
            );
          })}
          </FormGroup>
    </div>
  );
}
