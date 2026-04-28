import { useEffect, useState } from "react";

import { GameProviderHooksDefaultInterface } from "..";
import { ConfigApplication } from "../../../types";
import c from "../../../config.json";

const config = c as ConfigApplication;

export interface useWeb2DesktopInterfaceInterface
  extends
    GameProviderHooksDefaultInterface,
    ReturnType<typeof useWeb2desktop> {}

const useWeb2desktop = () => {
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window.web2desktop === "undefined") {
      return;
    }
    window.web2desktop.setAppConfig(config.web2desktop).finally(() => {
      setLoaded(true);
    });
  }, []);

  return {
    loaded,
  };
};

export default useWeb2desktop;
