import { useCallback } from "react";

import { useGameProvider } from "../../gameProvider";

const useButtonHandleClick = () => {
  const { playSoundEffect, oneTap, getThemeValue } = useGameProvider();

  const click = useCallback(
    (
      event?: { stopPropagation: () => void },
      opts?: {
        callback?: () => void;
        sound?: string;
        volume?: number;
        playSound?: boolean;
        dontStopPropagation?: boolean;
      }
    ) => {
      if (!opts?.dontStopPropagation) {
        event?.stopPropagation();
      }

      oneTap();
      if (opts?.playSound) {
        playSoundEffect({
          sound:
            opts?.sound ||
            getThemeValue("default", "button_click") ||
            "button_click.mp3",
          volume: opts?.volume,
        });
      }

      opts?.callback && opts?.callback();
    },
    [oneTap, playSoundEffect]
  );

  return click;
};

export default useButtonHandleClick;
