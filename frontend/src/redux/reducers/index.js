import { combineReducers } from "redux";

import APIURL from "./apiUrl";
import Timer from "./timer";
import MedicationTab from "./medicationTab";
import PatientInfo from "./patientInfo";
import DigitalTwin from "./digitalTwin";

const appReducer = combineReducers({
  APIURL,
  Timer,
  MedicationTab,
  PatientInfo,
  DigitalTwin,
});

export default appReducer;
