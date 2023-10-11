import { useState, useRef } from "react";
import { Button, Grid, Popover } from "@mui/material";

import Reference from "./References";
import LineGraph from "./LineGraph";
import Checklist from "./Checklist";

const CollapsiblePanel = () => {
  const [selectedButton, setSelectedButton] = useState();
  const [open, setOpen] = useState(false);
  const anchorEl = useRef(null);

  const buttons = ["references", "Hemodynamics line graph", "Infection sources"];

  return (
    <div style={{ height: "100vh" }} ref={anchorEl}>
      <Grid container sx={{ marginTop: "10px" }}>
        {buttons.map((value) => (
          <Grid item xs={12} key={value}>
            <Button
              sx={{
                height: "50px",
                width: "100%",
                padding: "5px"
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
          {selectedButton === "references" && <Reference />}
          {selectedButton === "Hemodynamics line graph" && <LineGraph {...{treatmentName:'fluid'}}/>}
          {selectedButton === "Infection sources" && <Checklist {...{checklistName:'Antibiotics Secondary Conditions'}}/>}
        </div>
      </Popover>
    </div>
  );
};

export default CollapsiblePanel;
