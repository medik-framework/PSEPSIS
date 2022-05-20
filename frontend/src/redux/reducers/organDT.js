import { OrganDTConfig } from "../../resources/DigitalTwinConfigReorganized";

const initialState = {};
OrganDTConfig.map((organ) => {
    const measurements = organ.measurements;
    initialState[organ.name] = Object.keys(measurements).reduce((prev, key) => {
        prev[measurements[key].name] = NaN;
        return prev;
    }, {});
    return [];
});

const organDTReducer = (state = initialState, action) => {
  if (action.type == "UPDATE_ORGAN_DT") {
    state = action.payload;
  }

  return state;
};

export default organDTReducer;
