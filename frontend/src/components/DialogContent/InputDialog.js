import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

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
    default:
      return <></>
  }
}

const InputDialog = ({ open, setOpen, info, sendMessage }) => {
  const [retDict, setRetDict] = useState({});
  const [storeDict, setStoreDict] = useState({});
  const config = DialogConfig[info['args'][0]];
  const inputConfig = config.inputConfig;
  const [shouldContinue, setShouldContinue] = useState(!config.inputConfig);
  const dispatch = useDispatch();

  useEffect(() => {
    if(info.id){
      let r = Object.keys(retDict).length > 0;
      if (r) {
        r = Object.keys(retDict).reduce((prev, i) =>
          prev && !( retDict[i] === null )
        , r)
      }
      setShouldContinue(r);
    } else {
      let r = Object.keys(storeDict).length > 0;
      if (r) {
        r = Object.keys(storeDict).reduce((prev, i) =>
          prev && !( storeDict[i] === null )
        , r)
      }
        setShouldContinue(r);
    }
  }, [retDict, storeDict])

  const handleContinue = () => {
    if(info.id){
      const data = {'id':info.id, ...retDict};
      sendMessage(JSON.stringify(data));
      dispatch({type: "dialogs/setDone", payload: data});
    }
    dispatch({
      type: inputConfig.storage,
      payload: storeDict
    });
    setOpen(false);
  }

  return (
    <Dialog open={open}>
      <DialogTitle>{config.title}</DialogTitle>
      <DialogContent>
        <InputContent {...{ inputConfig, setStoreDict, setRetDict }}/>
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
