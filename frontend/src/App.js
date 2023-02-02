import "./App.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import PsepsisTablet from "./PsepsisTablet";
import WelcomePage from "./WelcomePage";

import { start } from "./redux/reducers/treatment"
import useRemoteRequest from "./components/Utility/Hooks";

function App() {
  const [started, setStarted] = useState(false);
  const [send] = useRemoteRequest();
  const dispatch = useDispatch();

  const startSession = () => {
    setStarted(true);
    send('/app_connect', {});
  }

  const exitSession = () => {
    setStarted(false);
    send('/app_disconnect', {});
  }

  return (
    <>
      {started  && <PsepsisTablet exitSession={exitSession}/>}
      {!started && <WelcomePage startSession={startSession} />}
    </>
  );
}

export default App;

