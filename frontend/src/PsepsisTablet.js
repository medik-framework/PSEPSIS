import { Grid } from "@mui/material";

import LeftPanel from "./components/LeftPanel/";

const PsepsisTablet = () => {
  return (
    <div>
      <Grid container>
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
