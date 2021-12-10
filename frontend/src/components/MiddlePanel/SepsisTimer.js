import { useState } from "react";
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

const SepsisTimeline = () => {
  const [started, setStarted] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [timeDiff, setTimeDiff] = useState("00:00:00");

  useInterval(() => {
    let diff = new Date() - startTime; // this is a time in milliseconds
    let diff_as_date = new Date(diff);
    diff_as_date.getHours(); // hours
    diff_as_date.getMinutes(); // minutes
    diff_as_date.getSeconds(); // seconds
    setTimeDiff(
      `${diff_as_date.getHours()}:${diff_as_date.getMinutes()}:${diff_as_date.getSeconds()}`
    );
  }, 1000);

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
            setStarted(true);
            if (started) return;
            setStartTime(new Date());
          }}
        >
          ↓ Start
        </Button>
      </Grid>
      <Grid item sx={{ width: "70%" }}>
        <LinearProgressWithLabel
          variant="determinate"
          value={65}
          label={started ? timeDiff : "Not Started"}
        />
      </Grid>
    </Grid>
  );
};

export default SepsisTimeline;
