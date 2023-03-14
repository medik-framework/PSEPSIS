import { createSlice } from '@reduxjs/toolkit'

export const treatmentResponseSlice = createSlice({
  name: 'treatmentResponse',
  initialState: {
    fluid: {
      'BP Sys': {'data': []},
      'BP Dia': {'data': []},
      'HR': {'data': []},
      'Urine Output': {'data': []},
      'Normal Saline': {'data': []},
      'Lactated Ringer': {'data': []}
    },
    inotrope: null
  },
  reducers: {
    updateTreatmentResponse: (state, action) => {
      state[action.payload.name] = action.payload.data
    }
  }
});

export const { updateTreatmentResponse } = treatmentResponseSlice.actions;
export default treatmentResponseSlice.reducer;
