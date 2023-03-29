import { useCallback, useContext, useMemo } from "react";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import {
  RetrospaceadventureCard,
  RetrospaceadventureCardEffect,
} from "../types";
import { calculPercent, mapCardEffect, mapCardId } from "../utils";
import { useGameProvider } from "../../../../../gameProvider";

const arrayEffetcsHeal = ["double_heal", "full_life_self"];

const useRetrospacegameadventurefightsceneIA = () => {
  const { getEnvVar } = useGameProvider();
  const {
    Enemy,
    Hero,
    stateGame: { turn },
  } = useContext(RetrospaceadventureGameContext);

  const forceSkill = useMemo(
    () => getEnvVar<boolean | number>("FORCE_IA_USE_CARD"),
    []
  );

  const filterCannonLaser = useCallback(
    (cards: RetrospaceadventureCard[]) => {
      const { laser } = Enemy;

      const percent = calculPercent(laser, Hero.life);
      if (percent < 80) {
        return cards.filter(
          (c) => c.critical_effect.effect !== "use_full_laser"
        );
      }
      if (percent >= 100) {
        return cards.filter(
          (c) => c.critical_effect.effect === "use_full_laser"
        );
      }

      return cards;
    },
    [Enemy, Hero]
  );

  const filterHeal = useCallback(
    (cards: RetrospaceadventureCard[]) => {
      const { life, baseLife } = Enemy;
      const percent = calculPercent(life, baseLife);

      if (percent > 40 && percent < 80) {
        return cards;
      }

      return cards.filter(
        (c) => !arrayEffetcsHeal.includes(c.critical_effect.effect)
      );
    },
    [Enemy]
  );

  const filterDamage = useCallback(
    (
      criticalEffects: RetrospaceadventureCardEffect[],
      cards: RetrospaceadventureCard[]
    ) => {
      const { life, baseLife } = Hero;
      const percent = calculPercent(life, baseLife);
      if (percent <= 50 && criticalEffects.includes("half_life_target")) {
        return cards.filter(
          (c) => c.critical_effect.effect !== "half_life_target"
        );
      } else if (
        percent >= 70 &&
        criticalEffects.includes("half_life_target")
      ) {
        return cards.filter(
          (c) => c.critical_effect.effect === "half_life_target"
        );
      }
      return cards;
    },
    [Hero]
  );

  const filterAntiCannon = useCallback(
    (cards: RetrospaceadventureCard[]) => {
      const { laser } = Hero;
      const { life } = Enemy;
      const percent = calculPercent(life, laser);
      if (laser === 0 || percent < 50) {
        return cards.filter(
          (c) => c.critical_effect.effect !== "half_laser_target"
        );
      }
      return cards;
    },
    [Hero, Enemy]
  );
  const drawCard = useCallback(
    (cards: RetrospaceadventureCard[]) => {
      const criticalEffects = mapCardEffect(cards);
      const ids = mapCardId(cards);

      let cardsFilter: RetrospaceadventureCard[] = JSON.parse(
        JSON.stringify(cards)
      );

      // force card if var env FORCE_IA_USE_CARD !== false
      if (
        forceSkill &&
        typeof forceSkill === "number" &&
        ids.includes(forceSkill)
      ) {
        return cardsFilter.filter((c) => c.id === forceSkill)[0];
      }

      cardsFilter = filterCannonLaser(cardsFilter);
      cardsFilter = filterHeal(cardsFilter);
      cardsFilter = filterDamage(criticalEffects, cardsFilter);

      if (cardsFilter.length > 0) {
        return cardsFilter.sort((a, b) => {
          if (b.laser > a.laser) return -1;
          if (a.laser > b.laser) return 1;
          return 0;
        })[0];
      } else {
        return cards[Math.floor(Math.random() * cards.length)];
      }
    },
    [filterCannonLaser, filterHeal, filterDamage, filterAntiCannon]
  );

  return drawCard;
};

export default useRetrospacegameadventurefightsceneIA;
