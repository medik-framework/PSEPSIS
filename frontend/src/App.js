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

import { WebSocketProvider } from "./WebSocketContext"
import PsepsisTablet from "./PsepsisTablet";

function App() {
  return (
    <Provider store={store}>
      <WebSocketProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <PsepsisTablet />
        </ThemeProvider>
      </StyledEngineProvider>
      </WebSocketProvider>
    </Provider>
  );
}

export default App;
