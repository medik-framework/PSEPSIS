import { MedicationConfig } from "../../resources/MedicationConfig";
import { createSlice } from '@reduxjs/toolkit'

const initialState = {};
Object.keys(MedicationConfig).map((category) => {
    const medList = MedicationConfig[category]
    medList.map((medConfig) => {
      initialState[medConfig.name] = {'lastts': null, 'count': 0, 'total_dosage': 0}
      return null
    })
    return null
  });

export const drugSlice = createSlice({
  name: 'drugs',
  initialState: {...initialState},
  reducers:{
    add: (state, action) => {
      
      const { name, timestamp, dosage } = action.payload;
      const medicationState = state[name];
      console.log('action.payload: ' , action.payload)
      console.log('dosage is ', dosage)
      state[action.payload.name] = {
        'lastts': timestamp,
        'count': state[action.payload.name].count + 1,
        'total_dosage': medicationState.total_dosage + action.payload.total_dosage
      }
      return state
    },
  }
});

export const { add }  = drugSlice.actions

export default drugSlice.reducer
