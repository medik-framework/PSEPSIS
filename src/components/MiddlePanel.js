import { useState } from "react";
import MedicationTable from "./MedicationTable";
import CheckList from "./CheckList";
import PendingOrders from "./PendingOrders";
import TreatmentLog from "./TreatmentLog";

export default function MiddlePanel() {
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
}
