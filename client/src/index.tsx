import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.component.tsx";
import "../src/styles/index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "jotai";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
