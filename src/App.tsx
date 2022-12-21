import React, { Suspense } from "react";
import { I18n } from "i18n-js";
import { useGameProvider } from "./gameProvider";
import HomePath from "./GameDevSoftware/homecomponent.json";
const HomePage = React.lazy(() => import(`${HomePath.path}`));
const ScenePage = React.lazy(() => import("./pages/Scene"));
const ParametersPage = React.lazy(() => import("./pages/Parameters"));

export const i18n = new I18n();
function App() {
  const { route, params } = useGameProvider();

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
