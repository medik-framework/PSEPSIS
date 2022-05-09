import { Grid } from "@mui/material";

import LeftPanel from "./components/LeftPanel/";
import MiddlePanel from "./components/MiddlePanel";
import RightPanel from "./components/RightPanel";
import CollapsiblePanel from "./components/CollapsiblePanel";

const PsepsisTablet = () => {
  return (
    <div>
      <Grid container>
        <Grid
          item
          sx={{
            width: "50%",
            height: "100vh",
            paddingRight: "10px",
          }}
        >
          <LeftPanel />
        </Grid>
        {/* <Grid
          item
          sx={{
            width: "25%",
            height: "100vh",
            paddingRight: "10px",
          }}
        >
          <MiddlePanel />
        </Grid>
        <Grid
          item
          sx={{
            width: "35%",
            height: "100vh",
          }}
        >
          <RightPanel />
        </Grid>
        <Grid
          item
          sx={{
            width: "10%",
            height: "100vh",
          }}
        >
          <CollapsiblePanel />
        </Grid> */}
      </Grid>
    </div>
  );
};

export default PsepsisTablet;
