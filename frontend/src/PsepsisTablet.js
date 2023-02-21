import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInterval } from 'usehooks-ts';
import useWebSocket, { ReadyState } from "react-use-websocket";

import { Box } from "@mui/material";

import DigitalTwin from "./components/LeftPanel/DigitalTwin";
import MiddlePanel from "./components/MiddlePanel/MiddlePanel";
import RightPanel from "./components/RightPanel/RightPanel";
import CollapsiblePanel from "./components/CollapsiblePanel";

import InputDialog from "./components/DialogContent/InputDialog";

const PsepsisTablet = () => {
  const kwsURL = useSelector((state) => state.misc.kwsURL);

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    kwsURL, {
      share: true,
      onOpen: () => console.log('K WebSocket connected'),
      // onMessage: wsMsgHandler,
      shouldReconnect: (CloseEvent) => true,
    }
  );

  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});
  const dispatch = useDispatch();
  const dialogs = useSelector((state) => state.dialogs.todo)

  useEffect(() => {
    console.log("Sending start system");
    sendMessage(JSON.stringify({
      'eventName':'StartScreening',
    }));
  }, [sendMessage])

  //useEffect(() => {
  //  console.log("check message")
  //  if (lastMessage !== null) {
  //    console.log("there is some message")
  //    console.log(lastMessage);
  //    const d = lastMessage.data.replace(/'/g, '"');
  //    dispatch({ type: "dialogs/update", payload: d});
  //  }
  //}, [lastMessage]);

  useEffect(() => {
    if(dialogs.length != 0 && !open) {
      setInfo(JSON.parse(dialogs[0]));
      setOpen(true);
    }
  }, [dialogs, open, setOpen, setInfo])


  return (
    <Box width="100vw" height="100vh" overflow="hidden" display="flex">
      {open && <InputDialog {...{ open, setOpen, info, sendMessage }}/>}
    <Box width="30vw" height="100vh" sx={{display:'inline-flex', paddingRight: '5px'}}>
        <DigitalTwin />
      </Box>
      <Box width="30vw" height="100vh" sx={{display:'inline-flex', padding:'5px'}}>
        <MiddlePanel />
      </Box>
      <Box width="30vw" height="100vh" sx={{display:'inline-flex', padding:'5px'}}>
        <RightPanel />
      </Box>
      <Box width="10vw" height="100vh" sx={{display:'inline-flex', padding:'5px'}}>
        <CollapsiblePanel />
      </Box>
      {/* <Grid container>
        <Grid
          item
          sx={{
            width: "50%",
            height: "100vh",
            paddingRight: "10px",
          }}
        >
          <LeftPanel />
        </Grid> */}
        {/* <Grid
          item
          sx={{
            width: "25%",
            height: "100vh",
            paddingRight: "10px",
          }}
        >
          <MiddlePanel />
        </Grid>
        <Grid
          item
          sx={{
            width: "35%",
            height: "100vh",
          }}
        >
          <RightPanel />
        </Grid>
        <Grid
          item
          sx={{
            width: "10%",
            height: "100vh",
          }}
        >
          <CollapsiblePanel />
        </Grid> */}
      {/* </Grid> */}
    </Box>
  );
};

export default PsepsisTablet;
