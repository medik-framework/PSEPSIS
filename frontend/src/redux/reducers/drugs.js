import { MedicationConfig } from "../../resources/MedicationConfig";
import { createSlice } from '@reduxjs/toolkit'

const initialState = {};
Object.keys(MedicationConfig).map((category) => {
    const medList = MedicationConfig[category]
    medList.map((medConfig) => {
      initialState[medConfig.name] = {'lastts': null, 'count': 0}
      return null
    })
    return null
  });

export const drugSlice = createSlice({
  name: 'drugs',
  initialState: {...initialState},
  reducers:{
    add: (state, action) => {
      console.log(action.payload)
      state[action.payload.name] = {
        'lastts': action.payload.timestamp,
        'count': state[action.payload.name].count + 1
      }
      return state
    },
  }
});

export const { add }  = drugSlice.actions

export default drugSlice.reducer
