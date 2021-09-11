import { Grid, makeStyles } from "@material-ui/core";

import Header from "./components/Header";
import LeftPanel from "./components/LeftPanel/";
import MiddlePanel from "./components/MiddlePanel/";
import RightPanel from "./components/RightPanel";

const useStyles = makeStyles({
  leftPanel: {
    width: "36vw",
    height: "100vh"
  },
  middlePanel: {
    width: "50vw",
  },
});

const PsepsisTablet = () => {
  const classes = useStyles();

  return (
    <div>
      {/* <Header /> */}
      <Grid container>
        <Grid item className={classes.leftPanel}>
          <LeftPanel />
        </Grid>
        <div className={classes.middlePanel} style={{display: 'none'}}>
          <MiddlePanel />
        </div>
        <div className={classes.middlePanel} style={{display: 'none'}}>
          <RightPanel />
        </div>
      </Grid>
    </div>
  );
};

export default PsepsisTablet;
