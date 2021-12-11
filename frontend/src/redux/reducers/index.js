import { combineReducers } from "redux";

import APIURL from "./apiUrl";
import Timer from "./timer";
import MedicationTab from "./medicationTab";
import CheckList from "./checklist";
import PatientInfo from "./patientInfo";
import DigitalTwin from "./digitalTwin";

const appReducer = combineReducers({
  APIURL,
  Timer,
  MedicationTab,
  CheckList,
  PatientInfo,
  DigitalTwin,
});

export default appReducer;
