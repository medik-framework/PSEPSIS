import { useState } from "react";
import MedicationTable from "./MedicationTable";
import CheckList from "./CheckList";

export default function LeftPanel() {
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <>
      Medication and Lab/Vital Orders
      <div style={{ display: tab === 0 ? "block" : "none" }}>
        <MedicationTable />
      </div>
      <div style={{ display: tab === 1 ? "block" : "none" }}>
        <CheckList />
      </div>
    </>
  );
}
