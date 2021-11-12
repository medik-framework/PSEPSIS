import { useState } from "react";
import MedicationTable from "./MedicationTable";
import PendingOrders from "./PendingOrders";
import TreatmentLog from "./TreatmentLog";

const MiddlePanel = () => {
  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <div>
        <MedicationTable />
      </div>
      <div style={{ height: "40vh", display: "flex" }}>
        <div style={{ width: "25vw" }}></div>
        <div style={{ width: "25vw" }}></div>
      </div>
    </div>
  );
};

export default MiddlePanel;
