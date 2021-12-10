import logo from "./logo.svg";
import "./App.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Provider } from "react-redux";
import store from "./redux/store";

import { ThemeProvider } from "@mui/material";
import theme from "./theme";

import PsepsisTablet from "./PsepsisTablet";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <PsepsisTablet />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
