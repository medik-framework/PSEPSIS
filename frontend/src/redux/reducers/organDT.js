import { OrganDTConfig } from "../../resources/DigitalTwinConfigReorganized";
import { createAction, createReducer } from '@reduxjs/toolkit'
import { ConnectedTvOutlined } from "@mui/icons-material";
import { act } from "react-dom/test-utils";

const update = createAction("organDT/update");

const initialState = {};
OrganDTConfig.map((organ) => {
    const measurements = organ.measurements;
    initialState[organ.name] = Object.keys(measurements).reduce((prev, key) => {
        prev[measurements[key].name] = {'value':NaN, 'time':NaN};
        return prev;
    }, {});
    return [];
});

const organDTReducer = createReducer(initialState, (builder) => {
  builder
      .addCase(update, (state, action) => {
        console.log(action.payload)
        OrganDTConfig.map((organ) => {
          state[organ.name] = action.payload[organ.name]
          return [];
        });
      })
});

export default organDTReducer;
