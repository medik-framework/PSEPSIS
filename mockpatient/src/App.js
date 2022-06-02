import "./App.css";
import { useEffect, useState } from "react";

import { useSelector, useDispatch } from 'react-redux';
import { reset } from './redux/organDataSlice';

import MainPage from "./components/MainPage";
import WelcomePage from "./components/WelcomePage";

function App() {
  const [started, setStarted] = useState(false);
  const dispatch = useDispatch();
  const apiURL = useSelector((state) => state.misc['apiURL']);

  const sendRemoteRequest = (method, data) => {
    fetch(method, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: data // body data type must match "Content-Type" header
    }).catch(error => {
        console.log('Post error:', error)
    })
  }

  const startSession = () => {
    setStarted(true);
    const method = apiURL + 'form_start';
    sendRemoteRequest(method, {});
  }

  const exitSession = () => {
    setStarted(false);
    const method = apiURL + 'form_exit';
    sendRemoteRequest(method, {});
    dispatch(reset());
  }

  return (
    <>
      {started && <MainPage exitSession={exitSession}/>}
      {!started && <WelcomePage startSession={startSession} />}
    </>
  );
}

export default App;
