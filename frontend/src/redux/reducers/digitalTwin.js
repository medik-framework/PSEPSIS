import { OrganDTConfig } from "../../resources/DigitalTwinConfigReorganized";
import { MedicalAssessment } from "../../resources/MedicalAssessmentConfig";
import { PatientBasic } from "../../resources/PatientConfig";

const initialState = {'organDT': {}, 'medicalAssessment': {}, 'patientBasic': {}};
initialState.OrganDTConfig = OrganDTConfig.map((organ) => {
  const measurements = organ.measurements;
  return Object.keys(measurements).reduce((prev, measurementKey) => {
    if (measurements[measurementKey].type === "group") {
      prev[measurementKey] = {};
      Object.keys(measurements[measurementKey].content).map((GroupMeasurementKey) => prev[measurementKey][GroupMeasurementKey] = { value: null, history: []})
    } else {
      prev[measurementKey] = { value: null, history: []};
    }
    return prev;
  }, {});
});
Object.keys(MedicalAssessment).map((medicalScore) => {
  initialState.medicalAssessment[medicalScore] = { value: null, history: []};
});
Object.keys(PatientBasic).map((patientInfoItem) => {
  initialState.patientBasic[patientInfoItem] = { value: null };
});

const patientBasicReducer = (state = initialState, action) => {
  if (action.type === "UPDATE_MEASUREMENT") {
    state[0].HR.value = action.HR;
  }

  return state;
};

export default patientBasicReducer;
