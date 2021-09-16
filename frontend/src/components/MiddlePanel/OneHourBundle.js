import { useState } from "react";

import { TextField, MenuItem, Button, Grid, Checkbox } from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";

const bundleList = [
  "Respiratory interventions. Administer oxygen to maintain SpO2 of at least 94%",
  "Obtain IV/IO",
  "Take blood tests",
  "POCT Lactic Acid, WHole bld",
  "Complete Blood Count (CBC) WITH Diff",
  "Comprehensive Metablic Panel (CMP)",
  "Culture",
  "Give antibiotics",
  "Consider fluid resuscitation",
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
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "30px",
  },
}));

export default function OneHourBundle() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {bundleList.map((value) => {
          return (
            <Grid item xs={12}>
              <Checkbox />
              <Button className={classes.button}>{value}</Button>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
