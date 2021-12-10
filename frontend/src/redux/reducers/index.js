import { combineReducers } from "redux";

import APIURL from "./apiUrl";
import PatientInfo from "./patientInfo";
import DigitalTwin from "./digitalTwin";

const appReducer = combineReducers({ APIURL, PatientInfo, DigitalTwin });

export default appReducer;
