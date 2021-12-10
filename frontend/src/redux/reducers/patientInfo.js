const initialState = {
};

const patientBasicReducer = (state = initialState, action) => {
  if (action.type == "UPDATE_PATIENT_INFO") {
    state = action.payload
  }
  
  return state;
};

export default patientBasicReducer;
