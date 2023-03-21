import { useSelector, useDispatch } from "react-redux";
import {  Button, Grid, Typography } from "@mui/material";

import MedicationTable, { AntibioticsSetTable } from "./MedicationTable";

import { setMedicationTab } from "./../../redux/reducers/highlight";

import {
  MedicationCategories,
} from "../../resources/MedicationConfig";

const MiddlePanel = () => {
  const selectedCategory = useSelector((state) => state.highlight.selectedMedicationTab);
  const dispatch = useDispatch();

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
                onClick={() => dispatch(setMedicationTab({tab: idx}))}
              >
                {value}
              </Button>
            </Grid>
          );
        })}
      </Grid>
      {selectedCategory !== 3 && <MedicationTable {...{selectedCategory}}/>}
      {selectedCategory === 3 && <AntibioticsSetTable />}
    </div>
  );
};

export default MiddlePanel;
