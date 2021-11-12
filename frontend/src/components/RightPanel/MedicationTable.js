import { useState } from "react";
import clsx from "clsx";
import { Button, Grid, Typography } from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";

import { medicationCategories, sepsisTables } from "./MedicationTableSchema";

import FluidTherapy from "./FluidTherapy";

const useStyles = makeStyles({
  buttonGroup: {
    marginTop: "5px",
    marginBottom: "5px",
  },
  button: {
    textAlign: "center",
    height: "40px",
    width: "100%",
    margin: "1px",
  },
  buttonSelected: {
    backgroundColor: "#0062cc",
    "&:hover": {
      backgroundColor: "#0062cc",
    },
  },
  tableCell: {
    height: "100px",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "black",
  },
});

export default function CenteredGrid() {
  const classes = useStyles();
  const [selectedCategory, setSelectedCategory] = useState(
    medicationCategories[0]
  );

  return (
    <>
      <Typography variant="h4" gutterBottom component="div">
        Medications
      </Typography>
      <Grid container spacing={0}>
        {medicationCategories.map((value) => {
          return (
            <Grid item xs={6}>
              <Button
                variant="contained"
                className={clsx(classes.button, {
                  [classes.buttonSelected]: selectedCategory === value,
                })}
                onClick={() => setSelectedCategory(value)}
              >
                {value}
              </Button>
            </Grid>
          );
        })}
      </Grid>

      <Grid container spacing={0}>
        <div
          style={{
            display:
              selectedCategory === medicationCategories[2] ? "block" : "none",
          }}
        >
          <FluidTherapy />
        </div>
      </Grid>
    </>
  );
}
