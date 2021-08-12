import { useSelector, useDispatch } from "react-redux";

import { AppBar, Toolbar, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  blinkBg: {
    animation: "$blinkingBackground 2s infinite",
  },
  "@keyframes blinkingBackground": {
    "0%": { backgroundColor: "#10c018" },
    "25%": { backgroundColor: "#1056c0" },
    "50%": { backgroundColor: "#ef0a1a" },
    "75%": { backgroundColor: "#254878" },
    "100%": { backgroundColor: "#04a1d5" },
  },
});

const Header = (props) => {
  const startTime = useSelector((state) => state?.Timer?.startTimeString);
  const duration = useSelector((state) => state?.Timer?.sessionDuration);
  const weight = useSelector((state) => state?.PatientInfo?.weight);
  const dispatch = useDispatch();

  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <div style={{ width: "30vw" }}>
          <label
            className={weight === 0 ? classes.blinkBg : ""}
            style={{ ...styles.headerLabel, ...styles.headerWeight }}
          >
            Age (mo):&nbsp;
            <input
              type="number"
              name="age"
              style={{ textAlign: "center", width: "45%", height: "50%" }}
            />
          </label>
          <label
            className={weight === 0 ? classes.blinkBg : ""}
            style={{ ...styles.headerLabel, ...styles.headerWeight }}
          >
            Weight (kg):&nbsp;
            <input
              type="number"
              name="weight"
              style={{ textAlign: "center", width: "45%", height: "50%" }}
            />
          </label>
        </div>
        <label style={{ ...styles.headerLabel, backgroundColor: "#B7F1A5" }}>
          Start time:
          <br />
          {startTime}
        </label>
        <label style={{ ...styles.headerLabel, backgroundColor: "#8ED5EC" }}>
          Duration:
          <br />
          {duration}
        </label>
        <label style={{ ...styles.headerLabel, backgroundColor: "#FFF0B5" }}>
          Current time:
          <br />
          {new Date().toTimeString().slice(0, 8)}
        </label>
        <Button
          variant="light"
          onClick={props.toggleStart}
          style={{ marginRight: "10px", backgroundColor: "gray" }}
        >
          End Session
        </Button>
      </Toolbar>
    </AppBar>
  );
};

const styles = {
  header: {
    backgroundColor: "#242526",
    height: "10vh",
    width: "100%",
    display: "inline-flex",
    fontSize: "20px",
    textAlign: "center",
    fontFamily: "Monaco",
  },
  headerLabel: {
    display: "flex",
    margin: "auto",
    height: "90%",
    width: "10vw",
    alignItems: "center",
    lineHeight: "120%",
    borderRadius: "2px",
  },
  headerWeight: {
    width: "15vw",
    display: "inline-flex",
    paddingLeft: "10px",
    marginLeft: "10px",
  },
};

export default Header;
