import { useState } from "react";
import { Typography } from "@mui/material";

import DigitalTwin from "./DigitalTwin";

const LeftPanel = () => {
  return (
    <>
      <Typography variant="h4" gutterBottom component="div">
        Patient Digital Twin
      </Typography>
      <DigitalTwin />
    </>
  );
};

export default LeftPanel;
