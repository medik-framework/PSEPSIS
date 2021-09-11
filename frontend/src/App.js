import logo from "./logo.svg";
import "./App.css";

import { Provider } from "react-redux";
import store from "./redux/store";

import { ThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "./theme";

import PsepsisTablet from "./PsepsisTablet";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PsepsisTablet />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
