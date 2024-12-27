import { useRef } from "react";

const useOnSwipe = ({
  onSwipe,
  threshold = 50, // Seuil minimal pour déclencher un swipe (en pixels)
}: {
  onSwipe?: (direction: "left" | "right" | "up" | "down") => void;
  threshold?: number; // Distance minimale pour considérer un swipe
}) => {
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
  const isMouseDown = useRef<boolean>(false);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    handleEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    isMouseDown.current = true;
    startX.current = e.clientX;
    startY.current = e.clientY;
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isMouseDown.current) {
      handleEnd(e.clientX, e.clientY);
      isMouseDown.current = false;
    }
  };

  const handleEnd = (endX: number, endY: number) => {
    if (onSwipe && startX.current !== null && startY.current !== null) {
      const deltaX = endX - startX.current;
      const deltaY = endY - startY.current;

      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      if (absDeltaX > threshold || absDeltaY > threshold) {
        const direction =
          absDeltaX > absDeltaY
            ? deltaX > 0
              ? "right"
              : "left"
            : deltaY > 0
            ? "down"
            : "up";
        onSwipe(direction);
      }
    }

    // Réinitialiser les valeurs
    startX.current = null;
    startY.current = null;
  };

  return {
    handleTouchStart,
    handleTouchEnd,
    handleMouseDown,
    handleMouseUp,
  };
};

export default useOnSwipe;
