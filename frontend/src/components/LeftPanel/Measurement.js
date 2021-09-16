import { useState } from "react";
import clsx from "clsx";
import { Button, Grid } from "@mui/material";

import { sepsisCategories, sepsisTables } from "./VitalTableSchema";

export default function CenteredGrid() {
  const [selectedCategory, setSelectedCategory] = useState(sepsisCategories[0]);

  return (
    <>
      {/* <Grid container spacing={0}>
        {sepsisTables.Top.map((value) => {
          return (
            <Grid item xs={4} className={classes.tableCell}>
              <div>
                {value.name} {value.unit === "" ? null : `(${value.unit})`}
              </div>
              <div>Last updated time:</div>
            </Grid>
          );
        })}
      </Grid> */}

      <Grid
        container
        spacing={0}
        sx={{
          marginTop: "5px",
          marginBottom: "5px",
        }}
      >
        {sepsisCategories.map((value) => {
          return (
            <Grid item xs={3}>
              <Button
                variant="contained"
                sx={{
                  textAlign: "center",
                  height: "40px",
                  width: "100%",
                }}
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
            <Grid
              item
              xs={6}
              sx={{
                height: "100px",
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "black",
              }}
            >
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
