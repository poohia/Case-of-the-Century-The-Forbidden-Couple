import { useCallback } from "react";
import { useGameProvider } from "../../gameProvider";

const useButtonHandleClick = () => {
  const { playSoundEffect, oneTap, getValueFromConstant } = useGameProvider();

  const click = useCallback(
    (
      event: { stopPropagation: () => void },
      opts: {
        callback?: () => void;
        sound?: string;
        volume?: number;
        playSound?: boolean;
        dontStopPropagation?: boolean;
      }
    ) => {
      const {
        callback,
        playSound,
        sound = "button_click.mp3",
        volume = getValueFromConstant("button_click_volume"),
        dontStopPropagation,
      } = opts;

      if (!dontStopPropagation) {
        event.stopPropagation();
      }

      oneTap();
      if (playSound) {
        playSoundEffect({
          sound,
          volume,
        });
      }

      callback && callback();
    },
    [oneTap, playSoundEffect]
  );

  return click;
};

export default useButtonHandleClick;
