import { makeStyles } from "@material-ui/core";

import Header from "./components/Header";
import LeftPanel from "./components/LeftPanel";
import MiddlePanel from "./components/MiddlePanel";
import RightPanel from "./components/RightPanel";

const useStyles = makeStyles({
  content: {
    display: "flex",
  },
  leftPanel: {
    width: "30vw",
  },
  middlePanel: {
    width: "50vw",
  },
});

const PsepsisTablet = () => {
  const classes = useStyles();

  return (
    <div>
      <Header />
      <div className={classes.content}>
        <div className={classes.leftPanel}>
          <LeftPanel />
        </div>
        <div className={classes.middlePanel}>
          <MiddlePanel />
        </div>
        <div className={classes.middlePanel}>
          <RightPanel />
        </div>
      </div>
    </div>
  );
};

export default PsepsisTablet;
