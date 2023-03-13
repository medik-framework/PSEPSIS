import { createSlice } from '@reduxjs/toolkit'

export const treatmentResponseSlice = createSlice({
  name: 'treatmentResponse',
  initialState: {
    fluidResponse: null,
    inotropeResponse: null
  },
  reducers: {
    updateTreatmentResponse: (state, action) => {
      state[action.payload.name] = action.payload.data
    }
  }
});

export const { updateTreatmentResponse } = treatmentResponseSlice.actions;
export default treatmentResponseSlice.reducer;
