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

const bundleList = [
  "Continuous cardiorespiratiory monitoring (pulse oximetry, HR, BP)",
  "Respiratory: Administer high-flow oxygen to maintain SpO2 >= 94%",
  "Obtain IV/IO access",
  "Fluid resuscitation",
  "Lactic Acid / Blood Gas",
  "Complete Blood Count (CBC) WITH Diff",
  "Comprehensive Metablic Panel (CMP)",
  "Culture (blood, urine, +/-, respiratory, +/-CSF",
  "Give antibiotics",
  "Infection Source Control. Consider diagnostic imaging",
  "Consider inotropic support early",
];

const BundleForm = () => {
  const dispatch = useDispatch();

  const isChecked = (checkedIndices, idx) => Boolean((checkedIndices >> idx) & 1)

  const started = useSelector((state) => state.treatment.started);
  const checkedIdx = useSelector((state) => state.SepsisBundleForm.checkedIdx);
  const ventilationChecked = useSelector((state) => state.SepsisBundleForm.ventilationChecked);
  const septicShock = useSelector((state) => state.diagnosis.septicShock);
  const kEndpoint = useSelector((state) => state.endpoints.kEndpoint)
  const [fluidTherapyStarted, setFluidTherapyStarted] = useState(false);
  const [antibioticTherapyStarted, setAntibioticsTherapyStarted] = useState(false);
  const [inotropicTherapyStarted, setInotropicTherapyStarted] = useState(false);

  const updateCheckedIdx = (newCheckedIdx) => {
    dispatch({ type: "UPDATE_SEPSIS_FORM", payload: {checkedIdx: newCheckedIdx} })
    if (isChecked(newCheckedIdx, 3) && (!fluidTherapyStarted)){
      console.log('Send StartFluidTherapy');
      kEndpoint.sendMessage(JSON.stringify({
        eventName: 'StartFluidTherapy'
      }));
      setFluidTherapyStarted(true);
    }
    if (isChecked(newCheckedIdx, 8) && (!antibioticTherapyStarted)){
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
              sx={{backgroundColor: septicShock && [3,8].includes(idx) ? 'yellow' : 'white'}}
            >
              <FormControlLabel
                control={<Checkbox checked={ Boolean((checkedIdx >> idx) & 1) } />}
                label={value}
                onChange={() => {
                  updateCheckedIdx(checkedIdx | (1 << idx));
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
