import { Grid } from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";

import {
  MedicationCategories,
  MedicationConfig
} from "../../resources/MedicationConfig";
import MedicationCard from "./MedicationCard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    borderLeft: "solid 1px",
    borderTop: "solid 1px",
    borderRadius: "2px",
    height: "85vh",
    overflowY: "scroll"
  }
}));

export default function MedicationTable({selectedCategory}) {
  const classes = useStyles();
  const medList = MedicationConfig[MedicationCategories[[selectedCategory]]];

  return (
    <Grid container className={classes.root}>
      {medList.map((med, idx) => {
        return <MedicationCard key={idx} {...med} />;
      })}
    </Grid>
  );
}
