import { useState } from "react";
import MedicationTable from "./MedicationTable";
import PendingOrders from "./PendingOrders";
import TreatmentLog from "./TreatmentLog";

const MiddlePanel = () => {
  return (
    <>
      Medication and Lab/Vital Orders
      <div style={{ height: "40vh", overflow: "scroll" }}>
        <MedicationTable />
      </div>
      <div style={{ height: "40vh", display: "flex" }}>
        <div style={{ width: "25vw" }}>
          <PendingOrders />
        </div>
        <div style={{ width: "25vw" }}>
          <TreatmentLog />
        </div>
      </div>
    </>
  );
};

export default MiddlePanel;
