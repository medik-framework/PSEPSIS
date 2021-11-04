import { useState } from "react";

import { TextField, MenuItem, Button, Grid, Checkbox } from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";

import { FLUIDS } from "./AntibioticsList";

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
      <Grid container spacing={3}>
        {Object.keys(FLUIDS).map((key) => {
          return (
            <Grid item xs={6}>
              {key}
              {FLUIDS[key].value} {FLUIDS[key].unit}
              <Button className={classes.button}>Order Reminder</Button>
              Count
              <br />
              Last time
              <br />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
