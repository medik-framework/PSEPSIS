import "./App.css";

import { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "./redux/store";

import NumericInput from "./components/DialogContent/NumericInput";
import Checklist from "./components/DialogContent/Checklist";

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

const InputDialog = () => {
  const config = DialogConfig["getHighRiskConditions"];
  const [retDict, setRetDict] = useState({});
  const [shouldContinue, setShouldContinue] = useState(false);
  const apiURL = "http://127.0.0.1:5000/submit";

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
      body: JSON.stringify(retDict) // body data type must match "Content-Type" header
    }).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <Dialog open>
      <DialogTitle>{config.title}</DialogTitle>
      <DialogContent>
        {config.inputConfig.map((config, id)=>(
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
  const apiURL = "http://127.0.0.1:5000/submit";
  // const dispatch = useDispatch();

  // useInterval(
  //   () =>
  //     fetch(`http://${apiURL}/debug`)
  //       .catch(error => {
  //         console.log('Fetch error:', error)
  //       })
  //       .then((response) => response.json())
  //       .then((json) => {
  //         dispatch({ type: "UPDATE_ORGAN_DT", payload: json.organDT });
  //         dispatch({ type: "UPDATE_DIALOGS", payload: json.dialogs})
  //       })
  //   , 1000
  // );

  return (
    <Provider store={store}>
      {/* <ThemeProvider theme={theme}> */}
        {/* <PsepsisTablet /> */}
        <InputDialog />
      {/* </ThemeProvider> */}
    </Provider>
  );
}

export default App;
