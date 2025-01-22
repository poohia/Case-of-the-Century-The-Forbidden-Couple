import { useState } from "react";

const useOnDoubleClick = ({
  onDoubleClick,
  onClick,
  delay = 150,
}: {
  onDoubleClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  delay?: number; // Délai pour différencier simple clic et double clic
}) => {
  const [lastTap, setLastTap] = useState<number | null>(null);
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const now = Date.now();

    if (lastTap && now - lastTap < delay) {
      // Si un double clic est détecté
      if (onDoubleClick) {
        onDoubleClick(e);
      }
      setLastTap(null);

      // Nettoyer le délai du simple clic
      if (clickTimeout) {
        clearTimeout(clickTimeout);
        setClickTimeout(null);
      }
    } else {
      setLastTap(now);

      // Si un deuxième clic ne survient pas dans le délai, exécuter onClick
      const timeout = setTimeout(() => {
        if (onClick) {
          onClick(e);
        }
        setClickTimeout(null);
      }, delay);

      setClickTimeout(timeout);
    }
  };

  return { handleClick };
};

export default useOnDoubleClick;
