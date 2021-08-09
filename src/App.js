import logo from "./logo.svg";
import "./App.css";

import { Provider } from "react-redux";

import store from "./redux/store";

import Header from "./components/Header";
import VitalTable from "./components/VitalTable";

function App() {
  return (
    <Provider store={store}>
      <Header />
      <VitalTable />
    </Provider>
  );
}

export default App;
