import { OrganDTConfig } from "../../resources/DigitalTwinConfigReorganized";
import { createSlice } from '@reduxjs/toolkit'

const initialState = {};
OrganDTConfig.map((organ) => {
    const measurements = organ.measurements;
    initialState[organ.name] = Object.keys(measurements).reduce((prev, key) => {
        prev[measurements[key].name] = {'value':NaN, 'time':NaN, 'isNormal':NaN};
        return prev;
    }, {});
    return [];
});

export const organDTSlice = createSlice({
  name: 'organDT',
  initialState: {...initialState},
  reducers:{
    update_all: (state, action) => {
      state = action.payload
      return state
    },
  }
});

export const { update_all }  = organDTSlice.actions

export default organDTSlice.reducer
