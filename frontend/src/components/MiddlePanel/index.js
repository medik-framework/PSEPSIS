import { useState } from "react";
import MedicationTable from "./MedicationTable";
import PendingOrders from "./PendingOrders";
import TreatmentLog from "./TreatmentLog";
import OneHourBundle from "./OneHourBundle";

const MiddlePanel = () => {
  return (
    <>
      OSF PSepsis Bundle
      <div style={{ height: "100%"}}>
        <div>
            <OneHourBundle />
        </div>
      </div>
    </>
  );
};

export default MiddlePanel;
