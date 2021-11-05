import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid } from "@mui/material";

import { PatientBasic } from "../../resources/PatientConfig";

import useWebSocket, { ReadyState } from 'react-use-websocket';

export default function FormDialog({
  open,
  setDialogOpen,
  selectedMeasurement,
}) {

  const {
    sendMessage,
    lastMessage,
    readyState,
  } = useWebSocket("ws://psepsis.herokuapp.com/k_comm");

  let formContent = null;

  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    setDialogOpen(false);
    sendMessage({
      type: "UPDATE_MEASUREMENT",
      [selectedMeasurement.name]: value,
    });
  };

  if (selectedMeasurement.type === "number") {
    formContent = <TextField onChange={handleChange} />;
  }

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>Please enter measurement</DialogTitle>
        <DialogContent>
          <DialogContentText>{selectedMeasurement.name}</DialogContentText>
          <Grid container>{formContent}</Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
