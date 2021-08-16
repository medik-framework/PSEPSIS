import { useState } from "react";
import clsx from "clsx";
import { Button, Grid, makeStyles } from "@material-ui/core";

import { sepsisCategories, sepsisTables } from "./VitalTableSchema";

const useStyles = makeStyles({
  buttonGroup: {
    marginTop: "5px",
    marginBottom: "5px",
  },
  button: {
    textAlign: "center",
    height: "40px",
    width: "8vw",
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
  const [selectedCategory, setSelectedCategory] = useState(sepsisCategories[0]);

  return (
    <>
      <Grid container spacing={0} className={classes.buttonGroup}>
        {sepsisCategories.map((value) => {
          return (
            <Grid item xs={3}>
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
        {sepsisTables[selectedCategory].map((value) => {
          return (
            <Grid item xs={6} className={classes.tableCell}>
              <div>
                {value.name} {value.unit === "" ? null : `(${value.unit})`}
              </div>
              <div>Last updated time:</div>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
