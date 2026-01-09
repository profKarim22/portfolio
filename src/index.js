import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Silence the known Rapier wasm-bindgen deprecation warning.
// This is emitted by @dimforge/rapier3d-compat's generated loader and is
// harmless for runtime behavior.
const originalWarn = console.warn.bind(console);
console.warn = (...args) => {
  const first = args[0];
  if (
    typeof first === "string" &&
    first.includes(
      "using deprecated parameters for the initialization function; pass a single object instead"
    )
  ) {
    return;
  }
  originalWarn(...args);
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
