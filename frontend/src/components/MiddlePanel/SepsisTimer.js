import { useState } from "react";
import { useSelector } from "react-redux";

import { useInterval } from "react-use";
import { Box, Typography } from "@mui/material";
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

const zeroPad = (num, places) => String(num).padStart(places, "0");

const SepsisTimeline = () => {
  const started = useSelector((state) => state.treatment.started);
  const startTime = useSelector((state) => state.treatment.startTime);
  const [timeDiff, setTimeDiff] = useState("00:00:00");
  const [timePercent, setTimePercent] = useState(0);

  useInterval(
    () => {
      let diff = new Date() - Date.parse(startTime); // this is a time in milliseconds
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
    <Box container>
        <LinearProgressWithLabel
          variant="determinate"
          value={started ? timePercent : 0}
          label={started ? timeDiff : "Not Started"}
        />
    </Box>
  );
};

export default SepsisTimeline;
