import { useState } from "react";
import clsx from "clsx";
import { Tabs, Tab } from "@material-ui/core";

import Icon from "@mdi/react";
import {
  mdiAccountDetails,
  mdiClipboardListOutline,
  mdiInformation,
} from "@mdi/js";

import Measurement from "./Measurement";
import CheckList from "./CheckList";
import Info from "./Info";

const LeftPanel = () => {
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <>
      <Tabs fullWidth value={tab} onChange={handleChange}>
        <Tab
          icon={<Icon path={mdiAccountDetails} size={1} />}
          label={
            <>
              Measurements
              <br />
              Lab Results
            </>
          }
        />
        <Tab
          icon={<Icon path={mdiClipboardListOutline} size={1} />}
          label={"Checklists"}
        />
        <Tab icon={<Icon path={mdiInformation} size={1} />} label={"Info"} />
      </Tabs>

      <div style={{ display: tab === 0 ? "block" : "none" }}>
        <Measurement />
      </div>

      <div style={{ display: tab === 1 ? "block" : "none" }}>
        <CheckList />
      </div>

      <div style={{ display: tab === 2 ? "block" : "none" }}>
        <Info />
      </div>
    </>
  );
};

export default LeftPanel;
