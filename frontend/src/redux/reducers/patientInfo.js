const initialState = {
  Age: {},
  Weight: NaN,
  Height: NaN,
  Gender: NaN,
  HighRisk: 0,
  Comorbidity: 0,
  Chronic: 0,
  Medication: 0,
};

const patientBasicReducer = (state = initialState, action) => {
  return state;
};

export default patientBasicReducer;
