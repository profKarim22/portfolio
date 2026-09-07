import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { PortfolioProvider } from "./context/PortfolioContext.jsx";
import "./styles/variables.css";
import "./styles/global.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PortfolioProvider>
      <App />
    </PortfolioProvider>
  </React.StrictMode>
);
