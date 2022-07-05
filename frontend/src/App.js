import "./App.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import NumericInput from "./components/DialogContent/NumericInput";
import Checklist from "./components/DialogContent/Checklist";

import ThreeBucket from "./components/DialogContent/ThreeBucket";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useInterval } from 'usehooks-ts';


// import { ThemeProvider } from "@mui/material";
// import theme from "./theme";

import PsepsisTablet from "./PsepsisTablet";
import { DialogConfig } from "./resources/DialogConfig"

const InputContent = ({ config, setRetDict }) => {
  switch (config.type) {
    case "number":
      return <NumericInput {...{ config, setRetDict }}/>
    case "checklist":
      return <Checklist {...{ config, setRetDict }}/>
    default:
      return <></>
  }
}

const InputDialog = ({ open, setOpen, id, config }) => {
  const [retDict, setRetDict] = useState({});
  const [shouldContinue, setShouldContinue] = useState(!config.inputConfig);
  const apiURL = "http://127.0.0.1:5000/app_userinput";
  const dispatch = useDispatch();

  useEffect(() => {
    let r = Object.keys(retDict).length > 0;
    if (r) {
      r = Object.keys(retDict).reduce((prev, i) => 
        prev && !( retDict[i] === null )
      , r)
    }
    setShouldContinue(r);
    console.log(retDict)
  }, [retDict])

  const handleContinue = () => {
    let data = {};
    data[id] = retDict;
    console.log(data)
    fetch(apiURL, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    }).then( () => {
      dispatch({type: "dialogs/setDone", payload: {id: id, return: retDict}})
      setOpen(false)
    })
  }

  return (
    <Dialog open={open}>
      <DialogTitle>{config.title}</DialogTitle>
      <DialogContent>
        {config.inputConfig &&
          config.inputConfig.map((config, id)=>(
          <InputContent key={id} {...{ config, setRetDict }}/>
        ))}
      </DialogContent>
      <DialogActions>
        <Button 
          disabled={!shouldContinue}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function App() {
  const apiURL = "127.0.0.1:5000";
  const [open, setOpen] = useState(false);
  const [id, setID] = useState(0);
  const [dialogConfig, setDialogConfig] = useState({});
  const dispatch = useDispatch();
  const dialogs = useSelector((state) => state.dialogs)

  useEffect(() => {
    if (dialogs.todo.length && !open){
      console.log(DialogConfig[dialogs.hist[dialogs.todo[0]].title]);
      setID(dialogs.todo[0]);
      setDialogConfig(DialogConfig[dialogs.hist[dialogs.todo[0]].title]);
      setOpen(true);
    }
  }, [dialogs, open, setDialogConfig, setOpen, setID])

  useInterval(
    () =>
      fetch(`http://${apiURL}/app_get`)
        .catch(error => {
          console.log('Fetch error:', error)
        })
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          dispatch({ type: "organDT/update", payload: json.organDT });
          dispatch({ type: "dialogs/update", payload: json.dialogs})
        })
    , 5000
  );

  return (
    <>
      {open && <InputDialog {...{ open, setOpen, id, config:dialogConfig }}/>}
      <ThreeBucket></ThreeBucket>
    </>
  );
}

export default App;
