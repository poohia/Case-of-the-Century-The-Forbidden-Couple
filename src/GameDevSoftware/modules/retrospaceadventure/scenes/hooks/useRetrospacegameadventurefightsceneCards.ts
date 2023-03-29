import { useCallback, useContext, useMemo } from "react";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import {
  RetrospaceadventureCard,
  RetrospaceadventureCardEffect,
} from "../types";
import { calculPercent, mapCardEffect, mapCardId } from "../utils";
import { useGameProvider } from "../../../../../gameProvider";

const arrayEffetHeal: RetrospaceadventureCardEffect[] = [
  "double_heal",
  "full_life_self",
  "switch_life",
];

const useRetrospacegameadventurefightsceneCards = () => {
  const { getEnvVar } = useGameProvider();
  const {
    stateGame: { nbTurn, turn },
    Hero,
    Enemy,
  } = useContext(RetrospaceadventureGameContext);
  const forceSkill = useMemo(
    () => getEnvVar<boolean | number>("FORCE_IA_USE_CARD"),
    []
  );

  const needToRedraw = useCallback(
    (cards: RetrospaceadventureCard[]) => {
      const { baseLife: baseLifeHero, life: lifeHero, laser: laserHero } = Hero;
      const { life: lifeEnemy, laser: laserEnemy } = Enemy;
      const percentHeroLife = calculPercent(lifeHero, baseLifeHero);
      const effects = mapCardEffect(cards);
      const ids = mapCardId(cards);

      // force card if var env FORCE_IA_USE_CARD !== false
      if (
        forceSkill &&
        typeof forceSkill === "number" &&
        !ids.includes(forceSkill)
      ) {
        return true;
      } else if (
        forceSkill &&
        typeof forceSkill === "number" &&
        ids.includes(forceSkill)
      ) {
        return false;
      }

      // show canon laser if user can kill enemy
      else if (laserHero >= lifeEnemy && !effects.includes("use_full_laser")) {
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

      // dosn't show heal if percent hero life > 80
      if (
        percentHeroLife > 80 &&
        effects.find((effect) => arrayEffetHeal.includes(effect))
      ) {
        return true;
      }

      // force action
      if (
        !effects.includes("double_damage") &&
        !effects.includes("apply_damage")
      ) {
        return true;
      }

      return false;
    },
    [turn, nbTurn]
  );

  return needToRedraw;
};

export default useRetrospacegameadventurefightsceneCards;
