import { Grid } from "@mui/material";

import LeftPanel from "./components/LeftPanel/";
import PreScreen from "./components/Prescreen"

const PsepsisTablet = () => {
  return (
    <div>
      <Grid container>
        {/*<PreScreen />*/}
        <Grid
          item
          sx={{
            width: "36vw",
            height: "100vh",
          }}
        >
          <LeftPanel />
        </Grid>
      </Grid>
    </div>
  );
};

export default PsepsisTablet;
