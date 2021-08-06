import logo from "./logo.svg";
import "./App.css";

import { Provider } from "react-redux";

import store from "./redux/store";

import Header from "./components/Header";

function App() {
  return (
    <Provider store={store}>
      <Header />
    </Provider>
  );
}

export default App;
