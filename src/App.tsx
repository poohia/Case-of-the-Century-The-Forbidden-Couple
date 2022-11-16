import useScreenOrientation from "@awesome-cordova-library/screen-orientation/lib/react";
import { I18n } from "i18n-js";
import { useEffect } from "react";
import { useGameProvider } from "./gameProvider";
import { Scene, Home, Parameters } from "./pages";

export const i18n = new I18n();

function App() {
  const { route, params } = useGameProvider();
  const { lock } = useScreenOrientation();

  useEffect(() => {
    lock("landscape");
  }, [lock]);

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
