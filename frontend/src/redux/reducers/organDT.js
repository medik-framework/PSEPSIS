import { OrganDTConfig } from "../../resources/DigitalTwinConfigReorganized";
import { createSlice } from '@reduxjs/toolkit'

const initialState = {};
OrganDTConfig.map((organ) => {
    const measurements = organ.measurements;
    initialState[organ.name] = Object.keys(measurements).reduce((prev, key) => {
        prev[measurements[key].name] = {'value':NaN, 'time':NaN};
        return prev;
    }, {});
    return [];
});

export const organDTSlice = createSlice({
  name: 'organDT',
  initialState: {...initialState},
  reducers:{
    update_all: (state, action) => {
      // const data = action.payload;
      // console.log("update organ data")
      // OrganDTConfig.map((organ) => {
      //   state[organ.name] = data[organ.name]
      //   return [];
      // });
      state = action.payload
      return state
    },
  }
});

export const { update_all }  = organDTSlice.actions

export default organDTSlice.reducer
