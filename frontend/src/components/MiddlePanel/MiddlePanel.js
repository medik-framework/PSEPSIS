import { useSelector } from "react-redux";
import { Typography, Box } from "@mui/material";

import SepsisTimeline from "./SepsisTimer";
import BundleForm from "./BundleForm";

export default function OneHourBundle() {
  const sepsisDiagnosis = useSelector((state) => state.diagnosis.sepsis);

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
        <Typography variant="h4" gutterBottom component="div"
          sx={{background: sepsisDiagnosis ? 'yellow':'white'}}
        >
          PSepsis Bundle
        </Typography>
      </Box>

      <SepsisTimeline />
      <BundleForm />
    </div>
  );
}
