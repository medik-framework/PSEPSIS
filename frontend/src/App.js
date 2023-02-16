import "./App.css";
import { useState } from "react";

import PsepsisTablet from "./PsepsisTablet";
import WelcomePage from "./WelcomePage";

function App() {
  const [started, setStarted] = useState(false);

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
      {!started && <WelcomePage startSession={startSession} />}
    </>
  );
}

export default App;

