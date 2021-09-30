import { combineReducers } from "redux";

import PatientInfo from "./patientInfo";
import DigitalTwin from "./digitalTwin";

const appReducer = combineReducers({ PatientInfo, DigitalTwin });

export default appReducer;
