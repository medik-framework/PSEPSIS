import { useSelector, useDispatch } from "react-redux";

import { Typography, Box, Button } from "@mui/material";
import { keyframes } from "@emotion/react";

import SepsisTimeline from "./SepsisTimer";
import BundleForm from "./BundleForm";

import { start } from "../../redux/reducers/treatment"

const wave = keyframes`
  0% { color: orange; }
  50% { color: darkblue; }
  100% { color: orange; }
`;

export default function OneHourBundle() {
  const dispatch = useDispatch();
  const started = useSelector((state) => state.treatment.started);

  return (
    <div style={{ flexGrow: 1, width: "100%" }}>
      <Box display={"flex"}>
        {/* <Button
          variant="outlined"
          sx={{
            height: "50px",
            fontWeight: "bold",
            animation: started ? "null" : `${wave} 1s infinite`,
            marginRight: "10px",
            border: "solid 2px"
          }}
          onClick={() => {
            if (!started) dispatch(start());
          }}
        >
          Start
        </Button> */}
        <Typography variant="h4" gutterBottom component="div">
          OSF PSepsis Bundle
        </Typography>
      </Box>

      <SepsisTimeline />
      <BundleForm />
    </div>
  );
}
