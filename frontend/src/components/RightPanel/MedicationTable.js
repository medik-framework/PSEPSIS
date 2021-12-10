import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, Typography } from "@mui/material";

import {
  medicationCategories,
  sepsisTables,
} from "../../resources/MedicationTableSchema";

import FluidTherapy from "./FluidTherapy";

export default function CenteredGrid() {
  const dispatch = useDispatch();

  const selectedCategory = useSelector((state) => state.MedicationTab);

  const updateSelectedCategory = (category) => {
    dispatch({
      type: "CHANGE_MEDICATION_TAB",
      payload: category,
    });
  };

  return (
    <>
      <Grid container spacing={0}>
        {medicationCategories.map((value) => {
          return (
            <Grid item xs={6}>
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  backgroundColor:
                    selectedCategory === value ? "#0062cc" : "#1976d2",
                }}
                onClick={() => updateSelectedCategory(value)}
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
              selectedCategory === medicationCategories[1] ? "block" : "none",
          }}
        >
          <FluidTherapy />
        </div>
      </Grid>
    </>
  );
}
