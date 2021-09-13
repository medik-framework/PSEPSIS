import { useState } from "react";
import { Button } from "@mui/material";

export default function RightPanel() {
  return (
    <>
      Sepsis?
      <Button variant="contained">Generate Excel Log</Button>
      <Button variant="contained">Show Message History</Button>
    </>
  );
}
