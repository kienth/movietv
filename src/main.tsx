import { createRoot } from "react-dom/client";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";

import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store.ts";

let theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
    h1: {
      fontSize: 50,
    },
    h2: {
      fontSize: 45,
    },
    h3: {
      fontSize: 40,
    },
    h4: {
      fontSize: 35,
    },
    h5: {
      fontSize: 30,
    },
    h6: {
      fontSize: 25,
    },
    subtitle1: {
      fontSize: 18,
      fontWeight: 600,
    },
    subtitle2: {
      fontSize: 18,
    },
    body1: {
      fontSize: 14,
      fontWeight: 600,
    },
    body2: {
      fontSize: 14,
    },
    button: {
      fontSize: 14,
      textTransform: "none",
    },
    caption: {
      fontSize: 12,
      color: "gray",
    },
  },
  palette: {
    text: {
      primary: "#323941", // Set the primary text color
    },
    primary: {
      main: "#18181B",
      contrastText: "#F4F4F5",
      light: "#2E2E32",
      dark: "#0F0F11",
    },
    secondary: {
      main: "#3F3F46",
      contrastText: "#F4F4F5",
      light: "#52525B",
      dark: "#27272A",
    },
  },
});

theme = responsiveFontSizes(theme);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);
