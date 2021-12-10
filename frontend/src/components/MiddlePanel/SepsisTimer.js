import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { keyframes } from "@emotion/react";
import { useInterval } from "react-use";
import { Grid, Typography, Button } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 50,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

function LinearProgressWithLabel(props) {
  const label = props.label;
  return (
    <>
      <BorderLinearProgress variant="determinate" {...props} />
      <Typography
        variant="body2"
        color="black"
        sx={{
          position: "relative",
          top: "-35px",
          left: "45%",
          fontWeight: "bold",
        }}
      >
        {label}
      </Typography>
    </>
  );
}

const wave = keyframes`
0% { color: orange; }
50% { color: black; }
100% { color: orange; }
`;

const zeroPad = (num, places) => String(num).padStart(places, "0");

const SepsisTimeline = () => {
  const dispatch = useDispatch();
  const started = useSelector((state) => state.Timer);
  const [startTime, setStartTime] = useState(new Date());
  const [timeDiff, setTimeDiff] = useState("00:00:00");
  const [timePercent, setTimePercent] = useState(0);

  useEffect(() => {
    if (started) {
      setStartTime(new Date());
    }
  }, [started]);

  useInterval(
    () => {
      let diff = new Date() - startTime; // this is a time in milliseconds
      let diff_as_date = new Date(diff);
      setTimeDiff(
        `${zeroPad(Math.round(diff / (1000 * 60 * 60)), 2)}:${zeroPad(
          diff_as_date.getMinutes(),
          2
        )}:${zeroPad(diff_as_date.getSeconds(), 2)}`
      );
      setTimePercent(Math.min(Math.round((diff / (1000 * 3600)) * 100), 100));
    },
    started ? 1000 : null
  );

  return (
    <Grid container>
      <Grid item sx={{ width: "30%" }}>
        <Button
          variant="contained"
          sx={{
            height: "50px",
            fontWeight: "bold",
            animation: started ? "null" : `${wave} 1s infinite`,
          }}
          onClick={() => {
            dispatch({ type: "START_TIMER" });
          }}
        >
          ↓ Start
        </Button>
      </Grid>
      <Grid item sx={{ width: "70%" }}>
        <LinearProgressWithLabel
          variant="determinate"
          value={started ? timePercent : 0}
          label={started ? timeDiff : "Not Started"}
        />
      </Grid>
    </Grid>
  );
};

export default SepsisTimeline;
