import "./App.css";
import { useState } from "react";

import PsepsisTablet from "./PsepsisTablet";
import WelcomePage from "./WelcomePage";

import useRemoteRequest from "./components/Utility/Hooks";

function App() {
  const [started, setStarted] = useState(false);
  const [send] = useRemoteRequest();

  const { REACT_APP_K_BACKEND_URL } = process.env;
  console.log(process.env);
  console.log(`Version ${REACT_APP_K_BACKEND_URL}`);

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

