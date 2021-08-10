const initialState = {
  mrn: "N/A",
  birthday: "0000-00-00",
  gender: "female",
  weight: 0,
  bloodPressure: 0,
  heartRate: 0,
  respiratoryRate: 0,
  sao: 0,
  bloodph: 0,
  pao: 0,
  paco2: 0,
};

const patientInfoReducer = (state = initialState, action) => {
  return state;
};

export default patientInfoReducer;
