import { Typography } from "@mui/material";

import MedicationTable from "./MedicationTable";

const MiddlePanel = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom component="div">
        Medications
      </Typography>
      <MedicationTable />
    </div>
  );
};

export default MiddlePanel;
