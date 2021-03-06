import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Services from "./services";
import { ModalProvider } from "./contexts/Modal";
// import reportWebVitals from "./reportWebVitals";
import smoothscroll from "smoothscroll-polyfill";

import FingerprintJS from "@fingerprintjs/fingerprintjs";

// Initialize an agent at application startup.
export const fpPromise = FingerprintJS.load();

// kick off the polyfill!
smoothscroll.polyfill();
const root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);
const services = new Services();
export { services };
ReactDOM.render(
  <React.StrictMode>
    <ModalProvider>
      <App />
    </ModalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
