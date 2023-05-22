import "./App.css";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import useWebSocket from "react-use-websocket";

import { addEndpoint } from "./redux/reducers/endpoints"
import { updateDiagnosis } from "./redux/reducers/diagnosis"
import PsepsisTablet from "./PsepsisTablet";
import WelcomePage from "./WelcomePage";

import { update_all } from "./redux/reducers/organDT";
import { setHighlight } from "./redux/reducers/highlight";
import { updateTreatmentResponse } from "./redux/reducers/treatmentResponse";

import { MedicationTabMapping } from "./resources/MedicationConfig";

function App() {
  const [started, setStarted] = useState(false);
  const kWsURL = useSelector((state) => state.misc['kwsURL']);
  const [isKConnActive, setIsKConnActive] = useState(false);

  const dispatch = useDispatch()

  const messageHandler = (msg) => {
    console.log('message received on websocket', msg)
    const cleanedMsg = msg.data.replace(/'/g, '"');
    const msgJson = JSON.parse(cleanedMsg)
    console.log(msgJson.name)
    const recommendRegex = /^Recommend/;
    const recommendDrugRegex = /^RecommendDrug/;
    if (msgJson.name.match(recommendDrugRegex)) {
      const msgInfo = {
        args: ['recommend', msgJson.args.slice(3)],
        id: msgJson.id
      }
      dispatch({ type: "dialogs/update", payload: JSON.stringify(msgInfo)});
      dispatch(setHighlight({
        tab: MedicationTabMapping[msgJson.args[1]],
        medication: msgJson.args[0],
        dose:msgJson.args[2]
      }))
      return;
    }
    if (msgJson.name.match(recommendRegex)) {
      dispatch({ type: "dialogs/update", payload: cleanedMsg});
      return;
    }
    switch (msgJson.name) {
      case "Instruct":
        dispatch({ type: "dialogs/update", payload: cleanedMsg});
        break;
      case "OrganUpdate":
        dispatch(update_all(msgJson.args[0]));
        break;
      case "SepsisDiagnosis":
        console.log("dispatching diagnosis update")
        dispatch(updateDiagnosis({
          "name": "sepsis",
          "value": msgJson.args[0]
        }))
        break;
      case "TreatmentResponse":
        dispatch(updateTreatmentResponse({
          name: msgJson.args[0],
          data: msgJson.args[1]
        }));
        break;
      case "get_fluid_response_result":
        delete msgJson.name;
        dispatch(updateTreatmentResponse({
          name: 'fluid',
          data: msgJson
        }))
        break;
      default:
        console.log("Message not recognized: ", msgJson.name)
    }
  }


  const kWebSocket = useWebSocket(kWsURL, {
    onOpen: () => {
      console.log('websocket with K Opened at ', kWsURL)
      dispatch(addEndpoint({endpointId:  'kEndpoint', endpointHandlers:kWebSocket}))
      setIsKConnActive(true)
    },
    share: true,
    shouldReconnect:() => true,
    onMessage: messageHandler
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
