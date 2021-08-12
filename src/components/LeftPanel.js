import { useState } from "react";
import { Paper, Tabs, Tab } from "@material-ui/core";
import { mdiAccountDetails, mdiClipboardListOutline } from "@mdi/js";
import Icon from "@mdi/react";

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
          <Tab
            label={
              <span>
                <Icon path={mdiAccountDetails} size={1} /> Measurements Lab
                Results
              </span>
            }
          />
          <Tab
            label={
              <span>
                <Icon path={mdiClipboardListOutline} size={1} /> Checklists
              </span>
            }
          />
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
