import { Grid } from "@mui/material";

import LeftPanel from "./components/LeftPanel/";
import MiddlePanel from "./components/MiddlePanel/";
import PreScreen from "./components/Prescreen";

const PsepsisTablet = () => {
  return (
    <div>
      <Grid container>
        <PreScreen />
        <Grid
          item
          sx={{
            width: "36vw",
            height: "100vh",
          }}
        >
          <LeftPanel />
        </Grid>
        <Grid
          item
          sx={{
            width: "40vw",
            height: "100vh",
          }}
        >
          <MiddlePanel />
        </Grid>
      </Grid>
    </div>
  );
};

export default PsepsisTablet;
