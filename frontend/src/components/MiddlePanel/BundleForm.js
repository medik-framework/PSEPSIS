import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  FormGroup,
  Grid,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";

import { start } from "../../redux/reducers/treatment"

// const bundleList = [
//   "Start continuous cardiorespiratiory monitoring (pulse oximetry, HR, BP)",
//   "Respiratory interventions. Administer oxygen to maintain SpO2 of at least 94%",
//   "Obtain IV/IO",
//   "POCT Lactic Acid / Blood Gas",
//   "Complete Blood Count (CBC) WITH Diff",
//   "Comprehensive Metablic Panel (CMP)",
//   "Culture",
//   "Give antibiotics",
//   "Consider fluid resuscitation",
//   "Infection Source Control. Consider diagnostic imaging based on patient's clinical exam",
//   "Consider inotropic support early",
// ];

const bundleList = [
  "Cardiorespiratiory monitoring (pulse oximetry, HR, BP)",
  "Respiratory: Administer oxygen to maintain SpO2 >= 94%",
  "Obtain IV/IO",
  "POCT Lactic Acid / Blood Gas",
  "Complete Blood Count (CBC) WITH Diff",
  "Comprehensive Metablic Panel (CMP)",
  "Culture",
  "Give antibiotics",
  "Consider fluid resuscitation",
  "Infection Source Control. Consider diagnostic imaging",
  "Consider inotropic support early",
];

const BundleForm = () => {
  const dispatch = useDispatch();

  const isChecked = (checkedIndices, idx) => Boolean((checkedIndices >> idx) & 1)

  const started = useSelector((state) => state.treatment.started);
  const checkedIdx = useSelector((state) => state.SepsisBundleForm.checkedIdx);
  const ventilationChecked = useSelector((state) => state.SepsisBundleForm.ventilationChecked);
  const kEndpoint = useSelector((state) => state.endpoints.kEndpoint)
  const [fluidTherapyStarted, setFluidTherapyStarted] = useState(false);
  const [antibioticTherapyStarted, setAntibioticsTherapyStarted] = useState(false);
  const [inotropicTherapyStarted, setInotropicTherapyStarted] = useState(false);

  const updateCheckedIdx = (newCheckedIdx) => {
    dispatch({ type: "UPDATE_SEPSIS_FORM", payload: {checkedIdx: newCheckedIdx} })
    if (isChecked(newCheckedIdx, 8) && (!fluidTherapyStarted)){
      console.log('Send StartFluidTherapy');
      kEndpoint.sendMessage(JSON.stringify({
        eventName: 'StartFluidTherapy'
      }));
      setFluidTherapyStarted(true);
    }
    if (isChecked(newCheckedIdx, 7) && (!antibioticTherapyStarted)){
      console.log('Send StartAntibioticTherapy');
      kEndpoint.sendMessage(JSON.stringify({
        eventName: 'StartAntibioticTherapy'
      }));
      setAntibioticsTherapyStarted(true);
    }
    if (isChecked(newCheckedIdx, 10) && (!inotropicTherapyStarted)){
      console.log('Send StartInotrpicTherapy');
      kEndpoint.sendMessage(JSON.stringify({
        eventName: 'StartInotropicTherapy'
      }));
      setInotropicTherapyStarted(true);
    }
  }

  const updateCheckedVentilation = (ventilation) => {
    dispatch({ type: "UPDATE_SEPSIS_FORM", payload: {ventilationChecked: ventilation} })
  }

  const startTimerIfNotStarted = () => {
    if (!started) dispatch(start())
  }

  return (
    <>
      <FormGroup>
        {bundleList.map((value, idx) => {
          return (
            <Grid
              item
              key={idx}
              xs={12}
              sx={{
                backgroundColor: (checkedIdx >> idx) & 1 ? "yellow" : "white",
              }}
            >
              <FormControlLabel
                control={<Checkbox checked={ Boolean((checkedIdx >> idx) & 1) } />}
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
