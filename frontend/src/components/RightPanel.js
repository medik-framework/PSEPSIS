import { useState } from "react";
import { Button } from "@material-ui/core";

export default function RightPanel() {
  return (
    <>
      Sepsis?
      <Button variant="contained">Generate Excel Log</Button>
      <Button variant="contained">Show Message History</Button>
    </>
  );
}
