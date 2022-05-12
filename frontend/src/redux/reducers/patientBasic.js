import { createAction, createReducer } from '@reduxjs/toolkit'

const update = createAction("patientBasic/update")
const initialState = {};

const patientBasicReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(update, (state, action) => {
      state[action.payload.label] = action.payload.value;
    })
})


export default patientBasicReducer;