import { useCallback } from "react";
import { useGameProvider } from "../../../../../gameProvider";

const useButtonHandleClick = (playSound: boolean = false) => {
  const { playSoundEffect, oneTap, getValueFromConstant } = useGameProvider();

  const click = useCallback(
    (event: React.MouseEvent<any, MouseEvent>, callback: () => void) => {
      event.stopPropagation();
      oneTap();
      if (playSound) {
        playSoundEffect({
          sound: "button_click.mp3",
          volume: getValueFromConstant("button_click_volume"),
        });
      }

      callback();
    },
    [playSound]
  );

  return click;
};

export default useButtonHandleClick;
