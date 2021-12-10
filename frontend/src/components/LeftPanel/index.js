import { useInterval } from "react-use";
import { useSelector, useDispatch } from "react-redux"
import { Typography } from "@mui/material";

import DigitalTwin from "./DigitalTwin";

const LeftPanel = () => {
  const apiUrl = useSelector(state => state.APIURL);
  const dispatch = useDispatch();
  useInterval(() => fetch(`https://${apiUrl}/debug`).then((response) =>
  response.json()
).then((json) => dispatch({type : "UPDATE_PATIENT_INFO", payload: json})), 1000);

  return (
    <>
      <Typography variant="h4" gutterBottom component="div">
        Patient Digital Twin
      </Typography>
      <DigitalTwin />
    </>
  );
};

export default LeftPanel;
