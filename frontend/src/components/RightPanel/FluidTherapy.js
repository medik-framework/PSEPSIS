import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { TextField, MenuItem, Button, Grid, Checkbox } from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";

import { FLUIDS } from "../../resources/AntibioticsList";
import MedicationCard from "./MedicationCard";

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
    backgroundColor: "gray",
    color: "white",
  },
}));

export default function OneHourBundle() {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div>
      <Grid container>
        {Object.keys(FLUIDS).map((key) => {
          return <MedicationCard FLUIDS={FLUIDS} key={key} key2={key} />;
        })}
      </Grid>
    </div>
  );
}
