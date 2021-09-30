import { organsDT } from "../../resources/DigitalTwinConfigReorganized";

const initialState = organsDT.map((DT) => {
   const measurements = DT.measurements
   return Object.keys(measurements).reduce((prev, key) => {
    if (measurements[key].type === "number") {
      prev[key] = {value: NaN, history: []}
    }
    return prev
   }, {})

})

console.log(initialState)

const patientBasicReducer = (state = initialState, action) => {
  return state;
};

export default patientBasicReducer;
