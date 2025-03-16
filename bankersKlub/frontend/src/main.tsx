import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@mui/material";
import ThemeConfig from "./themes.ts";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <ThemeProvider theme={ThemeConfig()}>
          <Provider store={store}>
            <ToastContainer />
            <App />
          </Provider>
        </ThemeProvider>
      </BrowserRouter>
    </LocalizationProvider>
  </React.StrictMode>
);
