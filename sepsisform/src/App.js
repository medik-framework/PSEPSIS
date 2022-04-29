import logo from "./logo.svg";
import "./App.css";

import { Provider } from "react-redux";
import store from "./redux/store";
import { EvaluationForm } from "./EvaluationForm";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <EvaluationForm />
      </div>
    </Provider>

  );
}

export default App;
