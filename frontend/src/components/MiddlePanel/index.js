import { Typography } from "@mui/material";

import SepsisTimeline from "./SepsisTimer";
import BundleForm from "./BundleForm";

export default function OneHourBundle() {
  return (
    <div style={{ flexGrow: 1, width: "100%" }}>
      <Typography variant="h4" gutterBottom component="div">
        OSF PSepsis Bundle
      </Typography>
      <SepsisTimeline />
      {/* <BundleForm /> */}
    </div>
  );
}
