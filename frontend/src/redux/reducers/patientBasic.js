import { createAction, createReducer } from '@reduxjs/toolkit'
import { PatientConfig } from "../../resources/PatientConfig";
import { checklists } from "../../resources/ChecklistConfig";

const update_age = createAction("patientBasic/update_age")
const update_hrc = createAction("patientBasic/update_hrc")
const update = createAction("patientBasic/update")
const initialState = { 'Age':''
                     , 'Weight':''
                     , 'HighRiskConditions': checklists['High Risk Conditions'].reduce((p, v) => ({ ...p, [v]: false}), {})};

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
    .addCase(update_hrc, (state, action) => {
      state['HighRiskConditions'] = action.payload.value;
    })
})


export default patientBasicReducer;
