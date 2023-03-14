import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedMedicationTab: 0,
  highlightedMedication: [],
  suggestedDosage: []
}

export const highlightSlice = createSlice({
  name: 'highlight',
  initialState: initialState,
  reducers: {
    setHighlight: (state, action) => {
      state.selectedMedicationTab = action.payload.tab;
      state.highlightedMedication.push(action.payload.medication);
      state.suggestedDosage.push(action.payload.dose);
    },
    unsetHighlight: (state, action) => {
      const idx = state.highlightedMedication.indexOf(action.payload);
      state.highlightedMedication.splice(idx,1);
      state.suggestedDosage.splice(idx,1);
    },
    setMedicationTab: (state, action) => {
      state.selectedMedicationTab = action.payload.tab;
    }
  }
})

export const { setHighlight, unsetHighlight, setMedicationTab } = highlightSlice.actions

export default highlightSlice.reducer
