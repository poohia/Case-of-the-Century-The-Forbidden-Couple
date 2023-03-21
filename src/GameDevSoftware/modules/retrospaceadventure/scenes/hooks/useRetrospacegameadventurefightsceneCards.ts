import { useCallback, useContext } from "react";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import {
  RetrospaceadventureCard,
  RetrospaceadventureCardEffect,
} from "../types";
import { calculPercent, mapCardEffect } from "../utils";

const arrayEffetHeal: RetrospaceadventureCardEffect[] = [
  "double_heal",
  "double_heal",
];

const useRetrospacegameadventurefightsceneCards = () => {
  const {
    stateGame: { nbTurn, turn },
    Hero,
    Enemy,
  } = useContext(RetrospaceadventureGameContext);

  const needToRedraw = useCallback(
    (cards: RetrospaceadventureCard[]) => {
      const { baseLife: baseLifeHero, life: lifeHero, laser: laserHero } = Hero;
      const { life: lifeEnemy, laser: laserEnemy } = Enemy;
      const percentHeroLife = calculPercent(lifeHero, baseLifeHero);
      const effects = mapCardEffect(cards);

      // show canon laser if user can kill enemy
      if (laserHero >= lifeEnemy && !effects.includes("use_full_laser")) {
        return true;
      } else if (laserHero >= lifeEnemy && effects.includes("use_full_laser")) {
        return false;
      }

      // don't show canon if user can't kill enemy with it (one shot or double shot)
      if (laserHero < lifeEnemy / 2 && effects.includes("use_full_laser")) {
        return true;
      }

      // if laser enemy dosn't has half life value don't show half laser target
      if (lifeHero / 2 > laserEnemy && effects.includes("half_laser_target")) {
        return true;
      }

      // if user can heal return false
      if (
        percentHeroLife < 60 &&
        effects.find((effect) => arrayEffetHeal.includes(effect))
      ) {
        return false;
      }

      // force action
      if (!effects.includes("double_damage")) {
        return true;
      }

      return false;
    },
    [turn, nbTurn]
  );

  return needToRedraw;
};

export default useRetrospacegameadventurefightsceneCards;
