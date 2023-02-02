import "./App.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import PsepsisTablet from "./PsepsisTablet";
import WelcomePage from "./WelcomePage";

import { start } from "./redux/reducers/treatment"

function App() {
  const [started, setStarted] = useState(false);
  const apiURL = useSelector((state) => state.misc['apiURL']);
  const dispatch = useDispatch()

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
    const method = 'http://' + apiURL + '/app_connect';
    sendRemoteRequest(method, {});
    dispatch(start())
  }

  const exitSession = () => {
    setStarted(false);
    const method = 'http://' + apiURL + '/app_disconnect';
    sendRemoteRequest(method, {});
  }

  return (
    <>
      {started  && <PsepsisTablet exitSession={exitSession}/>}
      {!started && <WelcomePage startSession={startSession} />}
    </>
  );
}

export default App;

