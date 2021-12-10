import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid } from "@mui/material";

import { PatientBasic } from "../resources/PatientConfig";

export default function FormDialog() {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>Prescreen patient conditions</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter patient basic information
          </DialogContentText>
          <Grid container>
            {Object.keys(PatientBasic)
              .slice(0, 4)
              .map((key) => {
                return (
                  <Grid
                    item
                    xs={6}
                    sx={{
                      height: "100px",
                      boxShadow:
                        "2px 0 0 0 #888, 0 2px 0 0 #888, 2px 2px 0 0 #888,2px 0 0 0 #888 inset, 0 2px 0 0 #888 inset",
                    }}
                  >
                    <div>{PatientBasic[key].name}</div>
                  </Grid>
                );
              })}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
