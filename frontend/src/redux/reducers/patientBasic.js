import { Label } from '@mui/icons-material';
import { createAction, createReducer } from '@reduxjs/toolkit'
import { PatientConfig } from "../../resources/PatientConfig";

const update_age = createAction("patientBasic/update_age")
const update = createAction("patientBasic/update")
const initialState = {"age": null, "weight": null};

const patientBasicReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(update_age, (state, action) => {
      state["age"] = PatientConfig.Age.generateContent(...action.payload);
    })
    .addCase(update, (state, action) => {
      const label = action.payload.label;
      const value = action.payload.value;
      state[label] = value;
    })
})


export default patientBasicReducer;
