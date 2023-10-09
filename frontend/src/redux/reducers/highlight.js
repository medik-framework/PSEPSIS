import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedMedicationTab: 0,
  highlightedMedication: [],
  suggestedDosage: [],
  highlightedMedicationPairs: {},
  suggestedDosagePairs: {}
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
    setHighlights: (state, action) => {
      const { tab, medication, dose } = action.payload;
      if (!state.highlightedMedicationPairs[tab]) {
        state.highlightedMedicationPairs[tab] = [];
      }
      if (!state.suggestedDosagePairs[tab]) {
        state.suggestedDosagePairs[tab] = [];
      }
      state.selectedMedicationTab = action.payload.tab;
      state.highlightedMedicationPairs[tab].push(medication);
      state.suggestedDosagePairs[tab].push(dose);
    },
    unsetHighlight: (state, action) => {
      const idx = state.highlightedMedication.indexOf(action.payload);
      if(idx !== -1){
      state.highlightedMedication.splice(idx,1);
      state.suggestedDosage.splice(idx,1);
      }

      const targetValue = action.payload;
      for (const key in state.highlightedMedicationPairs) {
        if (state.highlightedMedicationPairs[key].includes(targetValue)) {
          delete state.highlightedMedicationPairs[key];
          delete state.suggestedDosagePairs[key];
          break;
        }
      }
    },
    setMedicationTab: (state, action) => {
      state.selectedMedicationTab = action.payload.tab;
    }
  }
})

export const { setHighlight, setHighlights, unsetHighlight, setMedicationTab } = highlightSlice.actions

export default highlightSlice.reducer
