import {useState} from "react"
import { Button, Grid, Typography } from "@mui/material";
import WorkflowTab from "./WorkflowTab"
import CheckList from "./CheckList"

const CollapsiblePanel = () => {
  const [selectedButton, setSelectedButton] = useState()

  const buttons = ["history", "flowchart", "checklists", "references"];
  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <Grid container sx={{ marginTop: "10px" }}>
        {buttons.map((value) => {
          return (
            <Grid item xs={12} key={value}>
              <Button
                sx={{
                  height: "50px",
                  width: "100%",
                }}
                onClick={() => setSelectedButton(value)}
              >
                {value}
              </Button>
            </Grid>
          );
        })}
      </Grid>
      {(selectedButton == "flowchart") && <WorkflowTab />}
      {(selectedButton == "checklists") && <CheckList />}
    </div>
  );
};

export default CollapsiblePanel;
