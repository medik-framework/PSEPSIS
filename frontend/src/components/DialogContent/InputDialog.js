import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";

import NumericInput from "./NumericInput";
import Checklist from "./Checklist";
import PlainDialog from "./PlainDialog";
import LineGraph from "../CollapsiblePanel/LineGraph";
import { DialogConfig } from "../../resources/DialogConfig";

const InputContent = (args) => {
  switch (args.inputConfig.type) {
    case "number":
      return <NumericInput {...args}/>
    case "checklist":
      return <Checklist {...args}/>
    case "plain":
      return <PlainDialog { ...{ text:args.originalArgs.slice(1) }}/>
    case "linegraph":
      return <LineGraph {...{treatmentName:'fluid'}}/>
    default:
      return <></>
  }
}

const ButtonGroup = ({ config, setRetDict }) => {
  const [selected, setSelected] = useState(null);

  return(
    <Box display={"block"} margin={"10px"}>
      <Typography width={"100%"} marginBottom={"10px"}>{config.question}</Typography>
      <Box width={"100%"} display={"flex"} justifyContent={"space-between"}>
        {Object.keys(config.buttons).map((key, idx) =>
          <Button
            key={idx}
            variant={idx === selected ? "contained":"outlined"}
            onClick={() => {
              setRetDict(prev => ({
                ...prev,
                ...config.buttons[key]
              }))
              setSelected(idx)
            }}
          >
            {key}
          </Button>
        )}
      </Box>
    </Box>
  )
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
    let canContinue = true;
    if (config.shouldStore) {
      canContinue = Object.keys(storeDict).length > 0;
      canContinue = Object.keys(storeDict).reduce((prev, i) =>
        prev && !( storeDict[i] === null )
      , canContinue)
    }
    if (config.withArgs) {
      canContinue = canContinue && Object.keys(retDict).length > 0;
      canContinue = Object.keys(retDict).reduce((prev, i) =>
        prev && !( retDict[i] === null )
      , canContinue)
    }
    setShouldContinue(canContinue)
  }, [retDict, storeDict, config])

  const makeKMessage = (inputConfig, retDict) => {
    let data = {
      'id':counter,
      'source': 1,
      "timestamp": Date.now(),
      "eventArgs": []
    }
    if (Object.keys(inputConfig).includes('eventName')){
      data.eventName =  config.inputConfig.eventName
    }
    data = {
      ...data,
      ...retDict
    }
    return data
  }

  const handleContinue = () => {
    const data = makeKMessage(inputConfig, retDict);
    if (config.shouldSend){
      kEndpoint.sendMessage(JSON.stringify(data));
    }
    if(info.id) {
      dispatch({type: "dialogs/setDone", payload: data});
    }
    if(config.shouldStore) {
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
      { Object.keys(inputConfig).includes('actions') && <DialogActions>
        <ButtonGroup {...{
          config: inputConfig.actions,
          setRetDict: setRetDict
        }} />
      </DialogActions>}
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
