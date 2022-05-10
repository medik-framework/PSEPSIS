import { useInterval } from "react-use";
import { useSelector, useDispatch } from "react-redux";
import { Typography, TextField } from "@mui/material";
import { updateURL } from "../../redux/reducers/misc"

import DigitalTwin from "./DigitalTwin";

const LeftPanel = () => {
  const apiURL = useSelector((state) => state.misc.apiURL);
  const dispatch = useDispatch();
  console.log(apiURL)
  // useInterval(
  //   () =>
  //     fetch(`http://${apiURL}/debug`)
  //       .then((response) => response.json())
  //       .then((json) => {
  //         dispatch({ type: "UPDATE_ORGAN_DT", payload: json })
  //       })
  //       .catch(error => {
  //         console.log('Fetch error:', error)
  //       })
  //   , 1000
  // );

  return (
    <DigitalTwin />
  );
};

export default LeftPanel;
