import { useState } from "react";
import { Paper, Tabs, Tab } from "@material-ui/core";

import VitalTable from "./VitalTable";
import CheckList from "./CheckList";

export default function LeftPanel() {
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <>
      <Paper square>
        <Tabs
          value={tab}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Measurements Lab Results" />
          <Tab label="Checklists" />
        </Tabs>
      </Paper>

      <div style={{ display: tab === 0 ? "block" : "none" }}>
        <VitalTable />
      </div>
      <div style={{ display: tab === 1 ? "block" : "none" }}>
        <CheckList />
      </div>
    </>
  );
}
