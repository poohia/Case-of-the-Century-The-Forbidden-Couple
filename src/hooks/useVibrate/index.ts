import { useCallback } from "react";
import { useGameProvider } from "../../gameProvider";

const useVibrate = () => {
  const {
    platform,
    parameters: { activatedVibration },
  } = useGameProvider();

  const playPattern = useCallback((pattern: number | number[]) => {
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
      return;
    }
    navigator.vibrate(pattern);
  }, []);

  const vibrateUndefined = useCallback(() => {
    console.warn("API Vibration isn't supported.");
  }, []);

  const SOS = useCallback(() => {
    if (!activatedVibration) return;
    if (platform === "ios") {
      console.warn("API Vibration SOS function dosn't work on iOS.");
      return;
    }
    playPattern([
      100, 30, 100, 30, 100, 30, 200, 30, 200, 30, 200, 30, 100, 30, 100, 30,
      100,
    ]);
  }, [activatedVibration]);

  const success = useCallback(() => {
    if (!activatedVibration) return;
    playPattern([150, 50, 150]);
  }, [activatedVibration]);

  const echec = useCallback(() => {
    if (!activatedVibration) return;
    playPattern(1500);
  }, [activatedVibration]);

  if ("vibrate" in navigator) {
    return {
      playPattern,
      success,
      echec,
      SOS,
    };
  }

  return {
    playPattern: vibrateUndefined,
    success: vibrateUndefined,
    echec: vibrateUndefined,
    SOS: vibrateUndefined,
  };
};

export default useVibrate;
