import "./App.css";
import { useState } from "react";

import MainPage from "./components/MainPage";
import WelcomePage from "./components/WelcomePage";

function App() {
  const [started, setStarted] = useState(false);

  const startSession = () => {
    setStarted(true);
  }

  const exitSession = () => {
    setStarted(false);
  }

  return (
    <>
      {started && <MainPage exitSession={exitSession}/>}
      {!started && <WelcomePage startSession={startSession} />}
    </>
  );
}

export default App;
