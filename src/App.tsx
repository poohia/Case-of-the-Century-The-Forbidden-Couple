import React, { Suspense } from "react";

import { useGameProvider } from "./gameProvider";
import HomePath from "./GameDevSoftware/homecomponent.json";
import { useMessage } from "./hooks";
const HomePage = React.lazy(() => import(`./${HomePath.path}`));
const ScenePage = React.lazy(() => import("./pages/Scene"));
const ParametersPage = React.lazy(() => import("./pages/Parameters"));

function App() {
  const { route, params } = useGameProvider();
  useMessage();

  if (!route) {
    return <div />;
  }
  switch (route) {
    case "parameters":
      return (
        <Suspense fallback={<div />}>
          <ParametersPage routeBack={params?.backRoute || "home"} />
        </Suspense>
      );
    case "scene":
      return (
        <Suspense fallback={<div />}>
          <ScenePage />
        </Suspense>
      );
    case "home":
    default:
      return (
        <Suspense fallback={<div />}>
          <HomePage />
        </Suspense>
      );
  }
}

export default App;
