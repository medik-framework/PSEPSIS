import { useState } from "react";
import { Paper, Tabs, Tab } from "@material-ui/core";
import { mdiAccountDetails, mdiClipboardListOutline } from '@mdi/js'; 
import Icon from '@mdi/react';

import VitalOrders from "./VitalOrders";
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
        <VitalOrders />
      </div>
      <div style={{ display: tab === 1 ? "block" : "none" }}>
        <CheckList />
      </div>
    </>
  );
}
