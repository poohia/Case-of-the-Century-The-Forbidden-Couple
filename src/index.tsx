import React from "react";
import { createRoot } from "react-dom/client";

import reportWebVitals from "./reportWebVitals";
import GameProvider from "./gameProvider";
import App from "./App";

const renderReactDom = () => {
  const container = document.getElementById("app") as HTMLElement;
  const root = createRoot(container!); // createRoot(container!) if you use TypeScript

  root.render(
    <GameProvider>
      <App />
    </GameProvider>
  );
};

renderReactDom();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
