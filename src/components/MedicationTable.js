import { useState } from "react";
import clsx from "clsx";
import { Button, Grid, makeStyles } from "@material-ui/core";

import { medicationCategories, sepsisTables } from "./MedicationTableSchema";

import OneHourBundle from "./OneHourBundle";

const useStyles = makeStyles({
  buttonGroup: {
    marginTop: "5px",
    marginBottom: "5px",
  },
  button: {
    textAlign: "center",
    height: "40px",
    width: "16vw",
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
      <Grid container spacing={0} className={classes.buttonGroup}>
        {medicationCategories.map((value) => {
          return (
            <Grid item xs={4} border={1}>
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
        <OneHourBundle />
      </Grid>
    </>
  );
}
