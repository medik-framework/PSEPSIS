import "./App.css";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import useWebSocket from "react-use-websocket";

import PsepsisTablet from "./PsepsisTablet";
import WelcomePage from "./WelcomePage";

function App() {
  const [started, setStarted] = useState(false);
  const kWsURL = useSelector((state) => state.misc['kwsURL']);
  //const [kWebSocket, setKWebSocket] = useState(null);
  const [isKConnActive, setIsKConnActive] = useState(false);

  const kWebSocket = useWebSocket(kWsURL, {
    onOpen: () => {
      console.log('websocket with K Opened at ', kWsURL)
      setIsKConnActive(true)
    },
    share: true
  })


  const startSession = () => {
    setStarted(true);
    //send('/app_connect', {});
  }

  const exitSession = () => {
    setStarted(false);
    //send('/app_disconnect', {});
  }

  return (
    <>
      {started  && <PsepsisTablet exitSession={exitSession}/>}
      {!started && <WelcomePage startSession={startSession} isKConnActive={isKConnActive} />}
    </>
  );
}

export default App;

