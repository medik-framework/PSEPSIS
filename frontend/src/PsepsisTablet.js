import { Grid } from "@mui/material";

import LeftPanel from "./components/LeftPanel/";
import MiddlePanel from "./components/MiddlePanel/";
import RightPanel from "./components/RightPanel"
import PreScreen from "./components/Prescreen";

const PsepsisTablet = () => {
  return (
    <div>
      <Grid container>
        <PreScreen />
        <Grid
          item
          sx={{
            width: "25vw",
            height: "100vh",
          }}
        >
          <LeftPanel />
        </Grid>
        <Grid
          item
          sx={{
            width: "30vw",
            height: "100vh",
          }}
        >
          <MiddlePanel />
        </Grid>
        <Grid
          item
          sx={{
            width: "30vw",
            height: "100vh",
          }}
        >
          <RightPanel />
        </Grid>
      </Grid>
    </div>
  );
};

export default PsepsisTablet;
