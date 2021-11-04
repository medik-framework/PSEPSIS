import { organsDT } from "../../resources/DigitalTwinConfigReorganized";

const initialState = organsDT.map((DT) => {
  const measurements = DT.measurements;
  return Object.keys(measurements).reduce((prev, key) => {
    if (measurements[key].type === "number") {
      prev[key] = { value: NaN, history: [] };
    }
    return prev;
  }, {});
});

const patientBasicReducer = (state = initialState, action) => {
  if (action.type === "UPDATE_MEASUREMENT") {
    state[0].HR.value = action.HR;
  }

  return state;
};

export default patientBasicReducer;
