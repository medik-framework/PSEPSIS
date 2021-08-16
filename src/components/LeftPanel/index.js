import { useState } from "react";
import { Tabs, Tab, makeStyles } from "@material-ui/core";
import { mdiAccountDetails, mdiClipboardListOutline } from "@mdi/js";
import Icon from "@mdi/react";

import VitalTable from "./VitalTable";
import CheckList from "./CheckList";

const useStyles = makeStyles({
  labelContainer: {
    width: "auto",
    padding: 0,
  },
  wrapper: {
    flexDirection: "row",
  },
});

const LeftPanel = () => {
  const [tab, setTab] = useState(0);

  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <>
      <Tabs value={tab} onChange={handleChange}>
        <Tab
          classes={{
            wrapper: classes.wrapper,
            labelContainer: classes.labelContainer,
          }}
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
          label={
            <span>
              <Icon path={mdiClipboardListOutline} size={1} /> Checklists
            </span>
          }
        />
      </Tabs>

      <div style={{ display: tab === 0 ? "block" : "none" }}>
        <VitalTable />
      </div>
      <div style={{ display: tab === 1 ? "block" : "none" }}>
        <CheckList />
      </div>
    </>
  );
};

export default LeftPanel;
