import { useState } from "react";
import { useDispatch } from "react-redux";
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
  const [checkedIdx, setCheckedIdx] = useState(0);
  const [ventilationChecked, setVentilationChecked] = useState(false);

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
                control={<Checkbox />}
                label={value}
                onChange={() => {
                  setCheckedIdx(checkedIdx ^ (1 << idx));
                  dispatch({ type: "START_TIMER" });
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
          control={<Checkbox />}
          label={"Mechanical Ventilation"}
          onChange={() => {
            setVentilationChecked(!ventilationChecked);
            dispatch({ type: "START_TIMER" });
          }}
        />
      </Grid>
    </>
  );
};

export default BundleForm;
