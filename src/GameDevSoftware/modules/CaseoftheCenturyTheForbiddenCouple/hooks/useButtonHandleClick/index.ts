import { useCallback } from "react";
import { useGameProvider } from "../../../../../gameProvider";

const useButtonHandleClick = (
  handleClick: () => void,
  playSound: boolean = false
) => {
  const { playSoundEffect, oneTap, getValueFromConstant } = useGameProvider();

  const click = useCallback(
    (event: React.MouseEvent<any, MouseEvent>) => {
      event.stopPropagation();
      oneTap();
      if (playSound) {
        playSoundEffect({
          sound: "button_click.mp3",
          volume: getValueFromConstant("button_click_volume"),
        });
      }

      handleClick();
    },
    [playSound, handleClick]
  );

  return click;
};

export default useButtonHandleClick;
