import "./App.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import InputDialog from "./components/DialogContent/InputDialog";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useInterval } from 'usehooks-ts';

import useWebSocket, { ReadyState } from "react-use-websocket";

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
  const [dialogConfig, setDialogConfig] = useState({});
  const dispatch = useDispatch();
  const dialogs = useSelector((state) => state.dialogs.todo)

  useEffect(() => {
    if (lastMessage !== null) {
      const d = lastMessage.data.replace(/'/g, '"');
      dispatch({ type: "dialogs/update", payload: d});
    }
  }, [lastMessage]);

  useEffect(() => {
    if(dialogs.length != 0) {
      setInfo(JSON.parse(dialogs[0]));
      setOpen(true);
    }
    // if(dialogs.some(e => e == true)) {
    //   console.log('Exists');
    // } else {
    //   console.log('Not exist')
    // }
    // if (dialogs.todo.length && !open){
    //   console.log(DialogConfig[dialogs.hist[dialogs.todo[0]].title]);
    //   setID(dialogs.todo[0]);
    //   setDialogConfig(DialogConfig[dialogs.hist[dialogs.todo[0]].title]);
    //   setOpen(true);
    // }
  }, [dialogs, open, setDialogConfig, setOpen, setInfo])

  useInterval(
    () =>
      fetch(`http://${apiURL}/get_all_values`)
        .catch(error => {
          console.log('Fetch error:', error)
        })
        .then((response) => response.json())
        .then((json) => {
          dispatch({ type: "organDT/update", payload: json });
        })
    , 5000
  );

  return (
    <>
      {open && <InputDialog {...{ open, setOpen, info, sendMessage }}/>}
      <PsepsisTablet></PsepsisTablet>
    </>
  );
}

export default App;

