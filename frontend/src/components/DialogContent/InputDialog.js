import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import NumericInput from "./NumericInput";
import Checklist from "./Checklist";
import { DialogConfig } from "../../resources/DialogConfig";

const InputContent = (args) => {
  switch (args.inputConfig.type) {
    case "number":
      return <NumericInput {...args}/>
    case "checklist":
      return <Checklist {...args}/>
    case "plain":
      return <>{args.originalArgs[1]}</>
    default:
      return <></>
  }
}

const InputDialog = ({ open, setOpen, info }) => {
  const [retDict, setRetDict] = useState({});
  const [storeDict, setStoreDict] = useState({});
  const counter = useSelector((state) => state.dialogs.counter);
  const kEndpoint = useSelector((state) => state.endpoints.kEndpoint)
  const config = DialogConfig[info['args'][0]];
  const inputConfig = config.inputConfig;
  const [shouldContinue, setShouldContinue] = useState(!config.inputConfig);
  const dispatch = useDispatch();

  useEffect(() => {
    let r = Object.keys(retDict).length > 0;
    if (r) {
      r = Object.keys(retDict).reduce((prev, i) =>
        prev && !( retDict[i] === null )
      , r)
      setShouldContinue(r);
    } else {
      setShouldContinue(true);
    }
  }, [retDict, storeDict, info])

  const makeKMessage = (inputConfig, retDict) => {
    let data = {
      'id':counter,
      'source': 1,
      "timestamp": Date.now(),
      "eventArgs": Object.values(retDict),
    }
    if (Object.keys(inputConfig).includes('eventName')){
      data.eventName =  config.inputConfig.eventName
    }
    return data
  }

  const handleContinue = () => {
    const data = makeKMessage(inputConfig, retDict);
    if (Object.keys(inputConfig).includes('eventName')){
      kEndpoint.sendMessage(JSON.stringify(data));
    }
    if(info.id) {
      dispatch({type: "dialogs/setDone", payload: data});
    }
    if(inputConfig.storage) {
      dispatch({
        type: inputConfig.storage,
        payload: storeDict
      });
    }
    setOpen(false);
  }

  return (
    <Dialog open={open}>
      <DialogTitle>{config.title}</DialogTitle>
      <DialogContent>
        <InputContent {...{
          inputConfig:  inputConfig,
          setStoreDict: setStoreDict,
          setRetDict:   setRetDict,
          originalArgs: info.args
        }}/>
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

export default InputDialog;
export { InputContent };
