import { Grid } from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";

import {
  MedicationCategories,
  MedicationConfig
} from "../../resources/MedicationConfig";
import MedicationCard from "./MedicationCard";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    borderLeft: "solid 1px",
    borderTop: "solid 1px",
    borderRadius: "2px",
    height: "85vh",
    overflowY: "scroll",
    overflowX: "hidden",
  }
}));

export default function MedicationTable({selectedCategory}) {
  const classes = useStyles();
  const medList = MedicationConfig[MedicationCategories[[selectedCategory]]];

  return (
    <Grid container
      direction={"row"}
      alignContent={"flex-start"}
      className={classes.root}
      key={selectedCategory}
    >
      {medList.map((med, idx) => {
        return <MedicationCard key={idx} {...med} />;
      })}
    </Grid>
  );
}
