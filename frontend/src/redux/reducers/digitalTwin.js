const initialState = {
  Age: {},
  Weight: NaN,
  Height: Nan,
  Gender: -1,
  HighRisk: 0,
  Comorbidity: 0,
  Chronic: 0,
  Medication: 0,
};

const patientBasicReducer = (state = initialState, action) => {
  return state;
};

export default patientBasicReducer;
