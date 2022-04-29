import { OrganDTConfig } from "./../../resources/DigitalTwinConfigReorganized";

const initialState = {}
OrganDTConfig.map((organ) => {
  const measurements = organ.measurements;
  initialState[organ.name] = Object.keys(measurements).reduce((prev, measurementKey) => {
    if (measurements[measurementKey].type === "group") {
      prev[measurementKey] = {};
      Object.keys(measurements[measurementKey].content).map((GroupMeasurementKey) => prev[measurementKey][GroupMeasurementKey] = null)
    } else {
      prev[measurementKey] = null;
    }
    return prev;
  }, {});
});

const updateReducer = (state = initialState, action) => {
//   if (action.type === "UPDATE_MEASUREMENT") {
//     state[0].HR.value = action.HR;
//   }
  return state;
};

export default updateReducer;
