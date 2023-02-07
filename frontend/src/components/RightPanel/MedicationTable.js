import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { TextField, MenuItem, Button, Grid, Checkbox } from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";

import { FLUIDS } from "../../resources/AntibioticsList";
import {
  MedicationCategories,
  MedicationConfig
} from "../../resources/MedicationTableSchema";
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

export default function MedicationTable({selectedCategory}) {
  const medList = MedicationConfig[MedicationCategories[[selectedCategory]]];

  return (
    <Grid container>
      {medList.map((med, idx) => {
        return <MedicationCard key={idx} {...med} />;
      })}
    </Grid>
  );
}
