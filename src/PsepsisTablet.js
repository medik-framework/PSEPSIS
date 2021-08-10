import { makeStyles } from "@material-ui/core";

import Header from "./components/Header";
import VitalTable from "./components/VitalTable";

const useStyles = makeStyles({
  content: {
    display: "flex",
  },
  leftPanel: {
    width: "30vw",
  },
});

const PsepsisTablet = () => {
  const classes = useStyles();

  return (
    <div>
      <Header />
      <div className={classes.content}>
        <div className={classes.leftPanel}>
          <VitalTable className={classes.leftPanel} />
        </div>
      </div>
    </div>
  );
};

export default PsepsisTablet;
