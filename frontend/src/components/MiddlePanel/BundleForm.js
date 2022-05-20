
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FormGroup,
  Grid,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";

const bundleList = [
  "Start continuous cardiorespiratiory monitoring (pulse oximetry, HR, BP)",
  "Respiratory interventions. Administer oxygen to maintain SpO2 of at least 94%",
  "Obtain IV/IO",
  "POCT Lactic Acid / Blood Gas",
  "Complete Blood Count (CBC) WITH Diff",
  "Comprehensive Metablic Panel (CMP)",
  "Culture",
  "Give antibiotics",
  "Consider fluid resuscitation",
  "Infection Source Control. Consider diagnostic imaging based on patient's clinical exam",
  "Consider inotropic support early",
];

const BundleForm = () => {
  const dispatch = useDispatch();

  const started = useSelector((state) => state.Timer.started);
  const checkedIdx = useSelector((state) => state.SepsisBundleForm.checkedIdx);
  const ventilationChecked = useSelector((state) => state.SepsisBundleForm.ventilationChecked);

  const updateCheckedIdx = (newCheckedIdx) => {
    dispatch({ type: "UPDATE_SEPSIS_FORM", payload: {checkedIdx: newCheckedIdx} })
  }

  const updateCheckedVentilation = (ventilation) => {
    dispatch({ type: "UPDATE_SEPSIS_FORM", payload: {ventilationChecked: ventilation} })
  }

  const startTimerIfNotStarted = () => {
    if (!started) {
    dispatch({ type: "START_TIMER" })
    }
  }

  return (
    <>
      <FormGroup>
        {bundleList.map((value, idx) => {
          return (
            <Grid
              item
              xs={12}
              sx={{
                backgroundColor: (checkedIdx >> idx) & 1 ? "yellow" : "white",
              }}
            >
              <FormControlLabel
                control={<Checkbox checked={(checkedIdx >> idx) & 1} />}
                label={value}
                onChange={() => {
                  updateCheckedIdx(checkedIdx ^ (1 << idx));
                  startTimerIfNotStarted();
                }}
              />
            </Grid>
          );
        })}
      </FormGroup>
      <Typography sx={{ color: "gray" }}>Additional Inteventions</Typography>
      <Grid
        item
        xs={12}
        sx={{ backgroundColor: ventilationChecked ? "yellow" : "white" }}
      >
        <FormControlLabel
          control={<Checkbox checked={ventilationChecked} />}
          label={"Mechanical Ventilation"}
          onChange={() => {
            updateCheckedVentilation(!ventilationChecked);
            startTimerIfNotStarted();
          }}
        />
      </Grid>
    </>
  );
};

export default BundleForm;
