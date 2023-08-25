import { useCallback, useEffect, useState } from "react";
import useTapicEngineIos from "@awesome-cordova-library/taptic-engine/lib/react";
import useVibration from "@awesome-cordova-library/vibration/lib/react";
import { useGameProvider } from "../../gameProvider";

const useVibrate = () => {
  const {
    platform,
    parameters: { activatedVibration },
  } = useGameProvider();
  const [_canVibrate, setCanVibrate] = useState<boolean>(activatedVibration);
  const { selection, notification } = useTapicEngineIos();
  const vibrate = useVibration();

  const vibrateUndefined = useCallback(() => {
    console.warn("API Vibration isn't supported.");
  }, []);

  const oneTap = useCallback(() => {
    setCanVibrate((canVibrate) => {
      if (!canVibrate) return canVibrate;

      if (platform === "ios") {
        selection();
        return canVibrate;
      }
      vibrate(50);
      return canVibrate;
    });
  }, [platform, selection]);

  const doubleTap = useCallback(() => {
    setCanVibrate((canVibrate) => {
      if (!canVibrate) return canVibrate;

      if (platform === "ios") {
        notification("success");
        return canVibrate;
      }
      vibrate([200, 50, 200]);
      return canVibrate;
    });
  }, [platform]);

  const longTap = useCallback(() => {
    setCanVibrate((canVibrate) => {
      if (!canVibrate) return canVibrate;

      if (platform === "ios") {
        notification("error");
        let i = 0;
        while (i < 5) {
          setTimeout(() => notification("error"), 450 * i);
          i++;
        }
        return canVibrate;
      }
      vibrate(2000);
      return canVibrate;
    });
  }, [platform]);

  const success = useCallback(() => {
    setCanVibrate((canVibrate) => {
      if (!canVibrate) return canVibrate;

      if (platform === "ios") {
        notification("success");
        return canVibrate;
      }
      vibrate([150, 50, 150]);
      return canVibrate;
    });
  }, [platform, notification]);

  const echec = useCallback(() => {
    setCanVibrate((canVibrate) => {
      if (!canVibrate) return canVibrate;

      if (platform === "ios") {
        notification("error");
        return canVibrate;
      }
      vibrate(1500);
      return canVibrate;
    });
  }, [platform, notification]);

  useEffect(() => {
    setCanVibrate(activatedVibration);
  }, [activatedVibration]);

  if ("vibrate" in navigator) {
    return {
      oneTap,
      doubleTap,
      longTap,
      success,
      echec,
    };
  }

  return {
    oneTap: vibrateUndefined,
    doubleTap: vibrateUndefined,
    longTap: vibrateUndefined,
    success: vibrateUndefined,
    echec: vibrateUndefined,
  };
};

export default useVibrate;
