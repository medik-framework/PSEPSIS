import "./App.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInterval } from 'usehooks-ts';
import useWebSocket, { ReadyState } from "react-use-websocket";

import InputDialog from "./components/DialogContent/InputDialog";

// import { ThemeProvider } from "@mui/material";
// import theme from "./theme";

import PsepsisTablet from "./PsepsisTablet";

function App() {
  const apiURL = "127.0.0.1:4000";
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    `ws://${apiURL}/app_dialog`
  );

  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});
  const dispatch = useDispatch();
  const dialogs = useSelector((state) => state.dialogs.todo)
  const patientBasic = useSelector((state) => state.patientBasic)

  useEffect(() => {
    if (lastMessage !== null) {
      const d = lastMessage.data.replace(/'/g, '"');
      dispatch({ type: "dialogs/update", payload: d});
    }
  }, [lastMessage]);

  useEffect(() => {
    if(dialogs.length != 0 && !open) {
      setInfo(JSON.parse(dialogs[0]));
      setOpen(true);
    }
  }, [dialogs, open, setOpen, setInfo])

  // useEffect(() => {
  //   fetch(`http://${apiURL}/update_patient`, {
  //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
  //     mode: 'cors', // no-cors, *cors, same-origin
  //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //     credentials: 'same-origin', // include, *same-origin, omit
  //     headers: {
  //     'Content-Type': 'application/json'
  //     // 'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     redirect: 'follow', // manual, *follow, error
  //     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  //     body: JSON.stringify(patientBasic) // body data type must match "Content-Type" header
  //   }).catch(error => {
  //     console.log('Post error:', error)
  //   })
  // },[patientBasic])

  // useEffect(() => {
  //   fetch(`http://${apiURL}/get_all_values`)
  //   .catch(error => {
  //     console.log('Fetch error:', error)
  //   })
  //   .then((response) => response.json())
  //   .then((json) => {
  //     dispatch({ type: "organDT/update_all", payload: json });
  //   })
  // },[])

  return (
    <>
      {open && <InputDialog {...{ open, setOpen, info, sendMessage }}/>}
      <PsepsisTablet></PsepsisTablet>
    </>
  );
}

export default App;

