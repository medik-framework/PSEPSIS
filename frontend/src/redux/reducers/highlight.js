import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedMedicationTab: 0,
  highlightedMedication: [],
  suggestedDosage: null
}

export const highlightSlice = createSlice({
  name: 'highlight',
  initialState: initialState,
  reducers: {
    setHighlight: (state, action) => {
      console.log(action.payload)
      state.selectedMedicationTab = action.payload.tab;
      state.highlightedMedication.push(action.payload.medication);
      state.suggestedDosage = action.payload.dose;
    },
    unsetHighlight: (state, action) => {
      state.highlightedMedication.pop(action.payload)
      state.suggestedDosage = null;
    },
    setMedicationTab: (state, action) => {
      state.selectedMedicationTab = action.payload.tab;
    }
  }
})

export const { setHighlight, unsetHighlight, setMedicationTab } = highlightSlice.actions

export default highlightSlice.reducer
