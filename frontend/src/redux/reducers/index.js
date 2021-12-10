import { combineReducers } from "redux";

import APIURL from "./apiUrl";
import PatientInfo from "./patientInfo";
import DigitalTwin from "./digitalTwin";
import MedicationTab from "./medicationTab";

const appReducer = combineReducers({
  APIURL,
  PatientInfo,
  DigitalTwin,
  MedicationTab,
});

export default appReducer;
