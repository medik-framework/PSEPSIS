import { createSlice } from '@reduxjs/toolkit'

export const treatmentResponseSlice = createSlice({
  name: 'treatmentResponse',
  initialState: {
    fluid: {
      'BP Sys': {'data': []},
      'BP Dia': {'data': []},
      'HR': {'data': []},
      'Urine Output': {'data': []},
      'RR': {'data': []},
      'SpO2': {'data': []},
      'Normal Saline': {'data': []},
      'Lactated Ringer': {'data': []},
      "Epinephrine": {'data': []},
      "Norepinephrine": {'data': []},
      "Dopamine": {'data': []},
      "Dobutamine": {'data': []},
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
