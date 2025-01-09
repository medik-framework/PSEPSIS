import { createSlice } from '@reduxjs/toolkit'

const diagnosisSlice = createSlice({
  name: 'diagnosis',
  initialState: {
    'sepsis': null,
    'septicShock': null,
    'inotropeSuggested': false
  },
  reducers: {
    updateDiagnosis: (state, action) => {
      state[action.payload.name] = action.payload.value
    }
  }
})

export const { updateDiagnosis } = diagnosisSlice.actions
export default diagnosisSlice.reducer
