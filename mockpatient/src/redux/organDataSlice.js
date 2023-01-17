import { createSlice } from '@reduxjs/toolkit'
import { OrganDTConfig } from "../resources/DigitalTwinConfigReorganized";

const initialState = {}
OrganDTConfig.map((organ) => {
    const measurements = organ.measurements;
    initialState[organ.name] = Object.keys(measurements).reduce((prev, key) => {
        prev[measurements[key].name] = null;
        return prev;
    }, {});
    return [];
});

export const organDataSlice = createSlice({
  name: 'organDT',
  initialState: { ...initialState },
  reducers: {
    update: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state[action.payload.organName][action.payload.measurementName] = action.payload.value
    },
    increment: (state, action) => {
      state[action.payload.organName][action.payload.measurementName] += action.payload.value
    },
    reset: (state, action) => {
      console.log("reset");
      state = initialState;
    }
  },
})

// Action creators are generated for each case reducer function
export const { update, increment, reset } = organDataSlice.actions

export default organDataSlice.reducer