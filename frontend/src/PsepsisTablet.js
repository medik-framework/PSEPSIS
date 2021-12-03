import { Grid } from "@mui/material";

import LeftPanel from "./components/LeftPanel/";
import MiddlePanel from "./components/MiddlePanel";
import RightPanel from "./components/RightPanel";
import PreScreen from "./components/Prescreen";
import CollapsiblePanel from "./components/CollapsiblePanel";

const PsepsisTablet = () => {
  return (
    <div>
      <Grid container>
        <Grid
          item
          sx={{
            width: "30vw",
            height: "100vh",
            paddingRight: "10px",
          }}
        >
          <LeftPanel />
        </Grid>
        <Grid
          item
          sx={{
            width: "25vw",
            height: "100vh",
            paddingRight: "10px",
          }}
        >
          <MiddlePanel />
        </Grid>
        <Grid
          item
          sx={{
            width: "35vw",
            height: "100vh",
          }}
        >
          <RightPanel />
        </Grid>
        <Grid
          item
          sx={{
            width: "8vw",
            height: "100vh",
          }}
        >
          <CollapsiblePanel />
        </Grid>
      </Grid>
    </div>
  );
};

export default PsepsisTablet;
