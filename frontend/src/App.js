import logo from "./logo.svg";
import "./App.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Provider } from "react-redux";
import store from "./redux/store";

import {
  ThemeProvider,
  StyledEngineProvider,
  CssBaseline,
} from "@mui/material";
import theme from "./theme";

<<<<<<< HEAD
import { WebSocketProvider } from "./WebSocketContext"
=======
import WebSocketContextProvider from "./WebSocketContextProvider";
>>>>>>> origin/statemachine
import PsepsisTablet from "./PsepsisTablet";

function App() {
  return (
    <Provider store={store}>
      <WebSocketContextProvider>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <PsepsisTablet />
          </ThemeProvider>
        </StyledEngineProvider>
      </WebSocketContextProvider>
    </Provider>
  );
}

export default App;
