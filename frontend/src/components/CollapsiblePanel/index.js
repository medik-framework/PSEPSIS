import { useState, useRef } from "react";
import { Button, Grid, Popover } from "@mui/material";

// import TreatmentLog from "./TreatmentLog";
import WorkflowTab from "./WorkflowTab";
import Checklist from "./Checklist";
import Reference from "./References";
import LineGraph from "./LineGraph";

const CollapsiblePanel = () => {
  const [selectedButton, setSelectedButton] = useState();
  const [open, setOpen] = useState(false);
  const anchorEl = useRef(null);

  //const buttons = ["history", "flowchart", "checklists", "references"];
  const buttons = ["references", "fluid response"];

  return (
    <div style={{ height: "100vh" }} ref={anchorEl}>
      <Grid container sx={{ marginTop: "10px" }}>
        {buttons.map((value) => (
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
        ))}
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
          {/* {selectedButton === "history" && <TreatmentLog />} */}
          {/*{selectedButton === "flowchart" && <WorkflowTab />}
          {selectedButton === "checklists" && <Checklist />} */}
          {selectedButton === "references" && <Reference />}
          {selectedButton === "fluid response" && <LineGraph {...{treatmentName:'fluid'}}/>}
        </div>
      </Popover>
    </div>
  );
};

export default CollapsiblePanel;
