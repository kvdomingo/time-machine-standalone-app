import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import App from "./App";
import { AxiosInterceptorProvider } from "./api";
import "./index.css";
import { store } from "./store/store";
import theme from "./themes";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AxiosInterceptorProvider>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <CssBaseline />
            <App />
          </LocalizationProvider>
        </ThemeProvider>
      </AxiosInterceptorProvider>
    </Provider>
  </React.StrictMode>,
);
