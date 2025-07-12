import { useCallback, useMemo, useState } from "react";
import { useGameProvider } from "../../../../../gameProvider";

const usePointsGame = () => {
  const { getData, saveData } = useGameProvider();

  const TABLE_POINTS = "game_points";

  const [points, setPoints] = useState<{ key: string; value: number }[]>(() => {
    return getData<{ key: string; value: number }[]>(TABLE_POINTS) || [];
  });

  const totalPoints = useMemo(
    () =>
      points.reduce((sum, currentItem) => {
        // Pour chaque 'item' dans le tableau 'points', on ajoute sa 'value' à la somme (sum).
        return sum + currentItem.value;
      }, 0),
    [points]
  );

  const addPoints = useCallback((key: string, value: number) => {
    setPoints((p) => {
      if (p.find((pp) => pp.key === key)) {
        return p;
      }
      p.push({ key, value });
      saveData(TABLE_POINTS, p);
      return Array.from(p);
    });
  }, []);

  return { points: totalPoints, addPoints };
};

export default usePointsGame;
