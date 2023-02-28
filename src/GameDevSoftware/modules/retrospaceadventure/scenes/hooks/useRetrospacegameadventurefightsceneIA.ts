import { useCallback, useContext } from "react";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import {
  RetrospaceadventureCard,
  RetrospaceadventureCardEffect,
} from "../types";
import { calculPercent } from "../utils";

const arrayEffetcsHeal = ["double_heal", "full_life_self"];

const useRetrospacegameadventurefightsceneIA = () => {
  const {
    Enemy,
    Hero,
    stateGame: { turn },
  } = useContext(RetrospaceadventureGameContext);

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
      const criticalEffects = cards.map((c) => c.critical_effect.effect);

      let cardsFilter: RetrospaceadventureCard[] = JSON.parse(
        JSON.stringify(cards)
      );

      console.log("🚀 0", cardsFilter);
      cardsFilter = filterCannonLaser(cardsFilter);
      console.log("🚀 1", cardsFilter);
      cardsFilter = filterHeal(cardsFilter);
      console.log("🚀 2", cardsFilter);
      cardsFilter = filterDamage(criticalEffects, cardsFilter);
      console.log("🚀 3", cardsFilter);

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
