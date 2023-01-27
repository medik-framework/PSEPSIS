import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid } from "@mui/material";

import useWebSocket, { ReadyState } from "react-use-websocket";

import { PatientConfig } from "../../resources/PatientConfig";

import NumericInput from "./NumericInput";
import Checklist from "./Checklist";
import { DialogConfig } from "../../resources/DialogConfig";

const InputContent = ({ inputConfig, setRetDict }) => {
  switch (inputConfig.type) {
    case "number":
      return <NumericInput {...{ inputConfig, setRetDict }}/>
    case "checklist":
      return <Checklist {...{ inputConfig, setRetDict }}/>
    default:
      return <></>
  }
}

const InputDialog = ({ open, setOpen, info, sendMessage }) => {
  const [retDict, setRetDict] = useState({});
  const config = DialogConfig[info['args'][0]];
  const [shouldContinue, setShouldContinue] = useState(!config.inputConfig);
  const apiURL = "http://127.0.0.1:5000/app_userinput";
  const dispatch = useDispatch();

  const inputConfig = config.inputConfig;

  useEffect(() => {
    let r = Object.keys(retDict).length > 0;
    if (r) {
      r = Object.keys(retDict).reduce((prev, i) =>
        prev && !( retDict[i] === null )
      , r)
    }
    setShouldContinue(r);
  }, [retDict])

  const handleContinue = () => {
    const data = {'id':info.id, ...retDict};
    sendMessage(JSON.stringify(data))
    dispatch({type: "dialogs/setDone", payload: data})
    setOpen(false)
  }

  return (
    <Dialog open={open}>
      <DialogTitle>{config.title}</DialogTitle>
      <DialogContent>
          <InputContent {...{ inputConfig, setRetDict }}/>
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

// export default function FormDialog({
//   open,
//   setDialogOpen,
//   selectedMeasurement,
// }) {
//   const apiUrl = useSelector((state) => state.APIURL);
//   const { sendMessage, lastMessage, readyState } = useWebSocket(
//     `ws://${apiUrl}/k_comm`
//   );

//   React.useEffect(() => {
//     if (lastMessage !== null) {
//       alert("heartrate too high");
//     }
//   }, [lastMessage]);

//   let formContent = null;

//   const [value, setValue] = React.useState("");

//   const handleChange = (event) => {
//     setValue(event.target.value);
//   };

//   const handleSubmit = () => {
//     setDialogOpen(false);
//     sendMessage(
//       JSON.stringify({
//         type: "UPDATE_MEASUREMENT",
//         [selectedMeasurement.name]: value,
//       })
//     );
//   };

//   if (selectedMeasurement.type === "number") {
//     formContent = <TextField onChange={handleChange} />;
//   }

//   return (
//     <div>
//       <Dialog open={open}>
//         <DialogTitle>Please enter measurement</DialogTitle>
//         <DialogContent>
//           <DialogContentText>{selectedMeasurement.name}</DialogContentText>
//           <Grid container>{formContent}</Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleSubmit}>Submit</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }
