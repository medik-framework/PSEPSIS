import "./App.css";
import { useState, useRef } from "react";

import { useSelector } from "react-redux";
import useWebSocket from "react-use-websocket";

import MainPage from "./components/MainPage";
import WelcomePage from "./components/WelcomePage";

function App() {
  const [started, setStarted] = useState(false);
  const kWsURL = useSelector((state) => state.misc['kwsURL']);

  const [isKConnActive, setIsKConnActive] = useState(false);

  const kWebSocket = useRef(null);


  const kWsRef = useWebSocket(kWsURL, {
    onOpen: () => {
      console.log('websocket with K Opened at ', kWsURL)
      setIsKConnActive(true)
      kWebSocket.current = kWsRef
    },
    share: true,
    shouldReconnect:() => true,
  })

  const startSession = () => {
    setStarted(true);
  }

  const exitSession = () => {
    setStarted(false);
  }

  return (
    <>
      {started && <MainPage exitSession={exitSession} kWebSocket={kWebSocket.current}/>}
      {
        !started && <WelcomePage
                      startSession={startSession}
                      isKConnActive={isKConnActive}
                    />
      }
    </>
  );
}

export default App;
