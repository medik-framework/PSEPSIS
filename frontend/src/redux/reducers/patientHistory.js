const initialState = [];

const patientBasicReducer = (state = initialState, action) => {
  if (action.type == "LOG_TREATMENT_ACTION") {
    state = [...state, action.payload.treatment];
  }

  return state;
};

export default patientBasicReducer;
