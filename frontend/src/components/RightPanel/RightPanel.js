import { useState } from "react";
import {  Button, Grid, Typography } from "@mui/material";

import MedicationTable from "./MedicationTable";

import {
  MedicationCategories,
} from "../../resources/MedicationConfig";

const MiddlePanel = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    <div>
      <Typography variant="h4" gutterBottom component="div">
        Medications
      </Typography>
      <Grid container spacing={0}>
        {MedicationCategories.map((value, idx) => {
          return (
            <Grid item xs={6} key={idx}>
              <Button
                variant="contained"
                value={idx}
                sx={{
                  width: "100%",
                  backgroundColor:
                    selectedCategory === idx ? "#191970" : "#1E90FF",
                }}
                onClick={() => setSelectedCategory(idx)}
              >
                {value}
              </Button>
            </Grid>
          );
        })}
      </Grid>
      <MedicationTable {...{selectedCategory}} />
    </div>
  );
};

export default MiddlePanel;
