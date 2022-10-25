import { useEffect, useState } from "react";
import useScreenOrientation from "@awesome-cordova-library/screen-orientation/lib/react";

import useStatusbar from "@awesome-cordova-library/statusbar/lib/react";

import { GameProviderHooksDefaultInterface } from "..";

export interface useApplicationInterface
  extends GameProviderHooksDefaultInterface {
  backgroundColor: string;
  setBackgroundColor: (backgroundColor: string) => void;
}

const useApplication = (): useApplicationInterface => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [backgroundColor, setBackgroundColor] = useState<string>("blue");
  const { lock } = useScreenOrientation();
  const { hide } = useStatusbar();

  useEffect(() => {
    lock("landscape");
    hide();
    setLoaded(true);
  }, [hide, lock]);

  return {
    backgroundColor,
    loaded,
    setBackgroundColor,
  };
};

export default useApplication;
