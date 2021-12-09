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

const LeftPanel = () => {
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
      <div style={{ display: tab === 0 ? "block" : "none" }}>
        <DigitalTwin />
      </div>
  );
};

export default LeftPanel;
