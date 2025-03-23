import { useEffect, useMemo, useState } from "react";

import { useAssets } from "../../../../../../../hooks";
import { randomExeptValueFromArray } from "../../../utils";
import { useGameProvider } from "../../../../../../../gameProvider";
import { GameObjectMiniGame } from "../types";
import { EnemyBarProps } from "../EnemyBarComponent";
import { MiniGames } from "../../../types";

const useBarEnemy = ({ action, onSelectMiniGame }: EnemyBarProps) => {
  const { getValueFromConstant, getEnvVar } = useGameProvider();
  const { getAssetImg } = useAssets();

  const icons = useMemo(
    () => [
      getAssetImg("shield.png"),
      getAssetImg("doublebaster.png"),
      getAssetImg("doubleseringue.png"),
    ],
    []
  );

  const forceMiniGame = useMemo(
    () => getEnvVar<MiniGames | boolean>("FORCE_MINI_GAME"),
    []
  );

  const miniGamesChoix = useMemo(() => {
    const minigames =
      getValueFromConstant<MiniGames[]>("retrospaceadventure_minigames") || [];
    const miniGameMap: GameObjectMiniGame[] = [];
    minigames.forEach((miniGame) => {
      miniGameMap.push({
        value: miniGame,
        icon: getAssetImg(`${miniGame}-thumbnail.png`),
      });
    });
    return miniGameMap;
  }, []);

  const [iconToShow, setIconToShow] = useState<string | null>(null);

  useEffect(() => {
    if (action === "selectChoice") {
      const timer = setInterval(() => {
        setIconToShow((_iconToShow) => {
          return randomExeptValueFromArray(icons, _iconToShow);
        });
      }, 150);

      setTimeout(() => {
        clearInterval(timer); // Décommente pour arrêter le timer après 7s
      }, 4000);
    }

    if (action === "selectMiniGame") {
      let icon = miniGamesChoix[0].icon;
      const timer = setInterval(() => {
        setIconToShow((_iconToShow) => {
          icon = randomExeptValueFromArray(
            miniGamesChoix.map((miniGame) => miniGame.icon),
            _iconToShow
          );
          return icon;
        });
      }, 150);

      setTimeout(() => {
        clearInterval(timer);
        if (typeof forceMiniGame === "string") {
          icon =
            miniGamesChoix.find((miniGame) => miniGame.value === forceMiniGame)
              ?.icon ?? icon;
        }
        setTimeout(() => {
          onSelectMiniGame(
            miniGamesChoix.find((miniGame) => miniGame.icon === icon)!.value
          );
        }, 500);
      }, 3000);
    }
  }, [action]);

  return {
    iconToShow,
  };
};

export default useBarEnemy;
