import { useCallback, useEffect, useState } from "react";
import { useGameProvider } from "../../gameProvider";

const useVibrate = () => {
  const {
    platform,
    parameters: { activatedVibration },
  } = useGameProvider();
  const [_canVibrate, setCanVibrate] = useState<boolean>(activatedVibration);

  const playPattern = useCallback(
    (pattern: number | number[]) => {
      setCanVibrate((canVibrate) => {
        if (!canVibrate) return canVibrate;
        if (platform === "ios" && Array.isArray(pattern)) {
          let i = 1;
          navigator.vibrate(pattern[0]);
          const timer = setInterval(() => {
            navigator.vibrate(pattern[i]);
            i += 1;
            if (i >= pattern.length / 2) {
              clearInterval(timer);
            }
          }, 550);
          return canVibrate;
        }
        navigator.vibrate(pattern);
        return canVibrate;
      });
    },
    [platform]
  );

  const vibrateUndefined = useCallback(() => {
    console.warn("API Vibration isn't supported.");
  }, []);

  const SOS = useCallback(() => {
    if (platform === "ios") {
      console.warn("API Vibration SOS function dosn't work on iOS.");
      return;
    }
    playPattern([
      100, 30, 100, 30, 100, 30, 200, 30, 200, 30, 200, 30, 100, 30, 100, 30,
      100,
    ]);
  }, [platform, playPattern]);

  const oneTap = useCallback(() => {
    playPattern(200);
  }, [playPattern]);

  const doubleTap = useCallback(() => {
    playPattern([200, 50, 200]);
  }, [playPattern]);

  const success = useCallback(() => {
    playPattern([150, 50, 150]);
  }, [playPattern]);

  const echec = useCallback(() => {
    playPattern(1500);
  }, [playPattern]);

  useEffect(() => {
    setCanVibrate(activatedVibration);
  }, [activatedVibration]);

  if ("vibrate" in navigator) {
    return {
      playPattern,
      oneTap,
      doubleTap,
      success,
      echec,
      SOS,
    };
  }

  return {
    playPattern: vibrateUndefined,
    oneTap: vibrateUndefined,
    doubleTap: vibrateUndefined,
    success: vibrateUndefined,
    echec: vibrateUndefined,
    SOS: vibrateUndefined,
  };
};

export default useVibrate;
