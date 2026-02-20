import React, { Suspense } from "react";

import { useGameProvider } from "./gameProvider";
import pages from "./GameDevSoftware/pages.json";
import { useMessage } from "./hooks";
const HomePage = React.lazy(() => import(`./${pages.homePath.path}`));
const EndDemoPage = React.lazy(() => import(`./${pages.endDemoPath.path}`));
const CreditsPage = React.lazy(() => import(`./${pages.creditsPath.path}`));
const ScenePage = React.lazy(() => import("./pages/Scene"));
const ParametersPage = React.lazy(() => import("./pages/Parameters"));
const SavesPage = React.lazy(() => import("./pages/Saves"));

function App() {
  const { route, params, loaded } = useGameProvider();
  useMessage();
  if (!route || !loaded) {
    return <div />;
  }
  switch (route) {
    case "saves":
      return (
        <Suspense fallback={<div />}>
          <SavesPage routeBack={params?.backRoute || "home"} />
        </Suspense>
      );
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
    case "endDemo":
      return (
        <Suspense fallback={<div />}>
          <EndDemoPage />
        </Suspense>
      );
    case "credits":
      return (
        <Suspense fallback={<div />}>
          <CreditsPage />
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
