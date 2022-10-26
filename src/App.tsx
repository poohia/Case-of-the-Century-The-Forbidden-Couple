import { I18n } from "i18n-js";
import { useGameProvider } from "./gameProvider";
import { useScreenOrientationConfig, useStatusBarConfig } from "./hooks";
import { Scene, Home, Parameters } from "./pages";

export const i18n = new I18n();

function App() {
  const { route, params } = useGameProvider();
  useScreenOrientationConfig();
  useStatusBarConfig();
  switch (route) {
    case "parameters":
      return <Parameters routeBack={params?.backRoute || "home"} />;
    case "scene":
      return <Scene />;
    case "home":
    default:
      return <Home />;
  }
}

export default App;
