import { createAction, createReducer } from '@reduxjs/toolkit'
import { PatientConfig } from "../../resources/PatientConfig";

const update_age = createAction("patientBasic/update_age")
const update = createAction("patientBasic/update")
const initialState = {'Age':'', 'Weight':''};

const patientBasicReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(update_age, (state, action) => {
      const label = action.payload.label;
      const value = action.payload.value
      const unit = action.payload.unit
      state[label] = PatientConfig.Age.generateContent(value, unit);
    })
    .addCase(update, (state, action) => {
      const label = action.payload.label;
      const value = action.payload.value;
      const unit = action.payload.unit;
      state[label] = {'value':value, 'unit':unit};
    })
})


export default patientBasicReducer;
