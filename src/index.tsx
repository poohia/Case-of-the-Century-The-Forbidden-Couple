import React from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import AppWrapper from "./AppWrapper";
import reportWebVitals from "./reportWebVitals";
import GameProvider from "./gameProvider";

const renderReactDom = () => {
  const container = document.getElementById("app") as HTMLElement;
  const root = createRoot(container!); // createRoot(container!) if you use TypeScript

  root.render(
    <GameProvider>
      <AppWrapper />
    </GameProvider>
  );
};

if (window.cordova) {
  document.addEventListener(
    "deviceready",
    () => {
      console.log("i'm here!!!");
      renderReactDom();
    },
    false
  );
} else {
  renderReactDom();
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
