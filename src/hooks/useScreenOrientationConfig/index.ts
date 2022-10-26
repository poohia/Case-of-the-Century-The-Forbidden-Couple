import { useCallback, useEffect } from "react";
import useScreenOrientation from "@awesome-cordova-library/screen-orientation/lib/react";
import { OrientationLockCordovaType } from "@awesome-cordova-library/screen-orientation";

import config from "../../config.json";

const useScreenOrientationConfig = () => {
  const { lock } = useScreenOrientation();

  const configScreenOrientation = useCallback(() => {
    const screenOrientationConfig =
      config.screenOrientation as OrientationLockCordovaType;
    console.log(
      "🚀 ~ file: index.ts ~ line 12 ~ configScreenOrientation ~ screenOrientationConfig",
      screenOrientationConfig
    );

    lock(screenOrientationConfig);
  }, [lock]);

  useEffect(() => {
    configScreenOrientation();
  }, [configScreenOrientation]);
};

export default useScreenOrientationConfig;
