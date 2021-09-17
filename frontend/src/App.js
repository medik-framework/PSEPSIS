import logo from "./logo.svg";
import "./App.css";

import { Provider } from "react-redux";
import store from "./redux/store";

import {
  ThemeProvider,
  StyledEngineProvider,
  CssBaseline,
} from "@mui/material";
import theme from "./theme";

import PsepsisTablet from "./PsepsisTablet";

function App() {
  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <PsepsisTablet />
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  );
}

export default App;
