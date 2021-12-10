import { useState, useRef } from "react";
import { Button, Grid, Typography, Popover } from "@mui/material";
import TreatmentLog from "./TreatmentLog";
import WorkflowTab from "./WorkflowTab";
import CheckList from "./CheckList";

const CollapsiblePanel = () => {
  const [selectedButton, setSelectedButton] = useState();
  const [open, setOpen] = useState(false);

  const anchorEl = useRef(null);

  const buttons = ["history", "flowchart", "checklists", "references"];
  return (
    <div style={{ height: "100vh", overflow: "hidden" }} ref={anchorEl}>
      <Grid container sx={{ marginTop: "10px" }}>
        {buttons.map((value) => {
          return (
            <Grid item xs={12} key={value}>
              <Button
                sx={{
                  height: "50px",
                  width: "100%",
                }}
                onClick={() => {
                  setSelectedButton(value);
                  setOpen(true);
                }}
              >
                {value}
              </Button>
            </Grid>
          );
        })}
      </Grid>
      <Popover
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={anchorEl.current}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div style={{ width: "33vw", height: "100vh" }}>
          {selectedButton == "history" && <TreatmentLog />}
          {selectedButton == "flowchart" && <WorkflowTab />}
          {selectedButton == "checklists" && <CheckList />}
        </div>
      </Popover>
    </div>
  );
};

export default CollapsiblePanel;
