import { useState } from "react";
import useVibrate from "../../hooks/useVibrate";

const useOnLongPress = ({
  onLongPress,
  onClick,
  delay = 300,
  vibrateSuccess = false,
}: {
  onLongPress?: () => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  delay?: number; // Temps requis pour déclencher le long press (en ms)
  vibrateSuccess?: boolean;
}) => {
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const { success } = useVibrate();

  const startPressTimer = (
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.TouchEvent<HTMLDivElement>
  ) => {
    const id = setTimeout(() => {
      if (onLongPress) {
        if (vibrateSuccess) {
          success();
        }
        onLongPress();
      }
      setLongPressTriggered(true); // Indique qu'un long press a été exécuté
      setTimerId(null); // Réinitialiser le timer après le long press
      setTimeout(() => {
        setLongPressTriggered(false);
      }, delay);
    }, delay);
    setTimerId(id);
  };

  const stopPressTimer = () => {
    if (timerId) {
      clearTimeout(timerId);
      setTimerId(null);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!longPressTriggered && onClick) {
      // Si un long press n'a pas été exécuté, déclencher le clic normal
      onClick(e);
    }
    setLongPressTriggered(false); // Réinitialiser l'état après chaque interaction
  };

  // onMouseDown={startPressTimer} // Desktop long click
  // onMouseUp={stopPressTimer}
  // onMouseLeave={stopPressTimer}
  // onTouchStart={startPressTimer} // Mobile long touch
  // onTouchEnd={stopPressTimer}

  return {
    startPressTimer,
    stopPressTimer,
    handleClick,
  };
};

export default useOnLongPress;
