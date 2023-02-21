import "./App.css";
import { useState } from "react";

import { useSelector, useDispatch } from 'react-redux';
import { reset } from './redux/organDataSlice';

import MainPage from "./components/MainPage";
import WelcomePage from "./components/WelcomePage";

function App() {
  const [started, setStarted] = useState(false);
  const dispatch = useDispatch();

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
