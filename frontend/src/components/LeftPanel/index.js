import { useState } from "react";
import clsx from "clsx";
import { Tabs, Tab } from "@mui/material";

import Icon from "@mdi/react";
import {
  mdiAccountDetails,
  mdiClipboardListOutline,
  mdiInformation,
} from "@mdi/js";

import Assessment from "./Assessment";
import DigitalTwin from "./DigitalTwin";
import Measurement from "./Measurement";
import CheckList from "./CheckList";

const LeftPanel = () => {
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <>
      {/* <Tabs fullWidth value={tab} onChange={handleChange}>
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
      </Tabs> */}

      <div style={{ display: tab === 0 ? "block" : "none" }}>
        <Assessment />
      </div>

      <div style={{ display: tab === 1 ? "block" : "none" }}>
        <CheckList />
      </div>
    </>
  );
};

export default LeftPanel;
