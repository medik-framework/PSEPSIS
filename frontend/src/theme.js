import { createTheme } from "@material-ui/core";

const theme = createTheme({
  typography: {
    button: {
      textTransform: "none",
    },
  },
  overrides: {
    MuiTab: {
      wrapper: {
        flexDirection: "row",
      },
      labelContainer: {
        padding: 0,
      },
      selected: {
        backgroundColor: "black",
      },
      root: {
        "@media (min-width: 600px)": {
          minWidth: "70px",
        },
        "&$selected": {
          backgroundColor: "lightgray",
        },
      },
    },
    MuiTabs: {
      indicator: {
        backgroundColor: "gray",
      },
      root: {
        height: "64px",
      },
    },
  },
});

export default theme;
