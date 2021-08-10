import { useSelector, useDispatch } from "react-redux";

import { AppBar, Toolbar, Button } from "@material-ui/core";

const Header = (props) => {
  const startTime = useSelector((state) => state?.Timer?.startTimeString);
  const duration = useSelector((state) => state?.Timer?.sessionDuration);
  const weight = useSelector((state) => state?.PatientInfo?.weight);
  const dispatch = useDispatch();
  return (
    <AppBar position="static">
      <Toolbar>
        <label
          className={weight === 0 ? "blink" : ""}
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
          className={weight === 0 ? "blink" : ""}
          style={{ ...styles.headerLabel, ...styles.headerWeight }}
        >
          Weight (kg):&nbsp;
          <input
            type="number"
            name="weight"
            style={{ textAlign: "center", width: "45%", height: "50%" }}
          />
        </label>

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
    backgroundColor: "#FFCD04",
    width: "15vw",
    display: "inline-flex",
    paddingLeft: "10px",
    marginLeft: "10px",
  },
};

export default Header;
