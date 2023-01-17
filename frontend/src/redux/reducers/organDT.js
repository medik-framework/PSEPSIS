import { OrganDTConfig } from "../../resources/DigitalTwinConfigReorganized";
import { createAction, createReducer } from '@reduxjs/toolkit'

const update = createAction("organDT/update");

const initialState = {};
OrganDTConfig.map((organ) => {
    const measurements = organ.measurements;
    initialState[organ.name] = Object.keys(measurements).reduce((prev, key) => {
        prev[measurements[key].name] = NaN;
        return prev;
    }, {});
    return [];
});

const organDTReducer = createReducer(initialState, (builder) => {
  builder
      .addCase(update, (state, action) => {
        state = action.payload;
      })
});

export default organDTReducer;
