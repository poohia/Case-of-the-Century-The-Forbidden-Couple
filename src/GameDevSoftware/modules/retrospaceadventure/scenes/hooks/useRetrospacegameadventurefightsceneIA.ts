import { useCallback, useContext, useMemo } from "react";
import { useGameProvider } from "../../../../../gameProvider";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import {
  RetrospaceadventureCard,
  RetrospaceadventureCardEffect,
} from "../types";
import { calculPercent, isArrayWithEqualEntries } from "../utils";

const useRetrospacegameadventurefightsceneIA = () => {
  const {
    Enemy,
    Hero,
    stateGame: { turn },
  } = useContext(RetrospaceadventureGameContext);
  const { getEnvVar } = useGameProvider();

  const iaActivated: boolean = useMemo(() => {
    const v = getEnvVar<boolean>("ACTIVATE_IA");
    return !!v;
  }, [getEnvVar]);

  const filterCannonLaser = useCallback(
    (
      criticalEffects: RetrospaceadventureCardEffect[],
      cards: RetrospaceadventureCard[]
    ) => {
      const { laser } = Enemy;
      if (laser === 0 || !criticalEffects.find((e) => e === "use_full_laser")) {
        return cards.filter(
          (c) => c.critical_effect.effect !== "use_full_laser"
        );
      }
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
    (
      criticalEffects: RetrospaceadventureCardEffect[],
      cards: RetrospaceadventureCard[]
    ) => {
      const effetcsHeal = ["double_heal", "full_life_self"];
      const { life, baseLife } = Enemy;
      const percent = calculPercent(life, baseLife);
      if (
        percent > 90 ||
        !criticalEffects.find((e) => effetcsHeal.includes(e))
      ) {
        return cards.filter(
          (c) => !effetcsHeal.includes(c.critical_effect.effect)
        );
      }

      if (percent > 40 && percent < 90) {
        return cards;
      }

      return cards.filter((c) =>
        effetcsHeal.includes(c.critical_effect.effect)
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
    (
      criticalEffects: RetrospaceadventureCardEffect[],
      cards: RetrospaceadventureCard[]
    ) => {
      const { laser } = Hero;
      const { life } = Enemy;
      const percent = calculPercent(life, laser);
      if (
        laser === 0 ||
        percent < 50 ||
        !criticalEffects.includes("half_laser_target")
      ) {
        return cards.filter(
          (c) => c.critical_effect.effect !== "half_laser_target"
        );
      }
      if (percent >= 80) {
        return cards.filter(
          (c) => c.critical_effect.effect === "half_laser_target"
        );
      }
      return cards;
    },
    [Hero, Enemy]
  );

  const filterCardsFiveFirstTurns = useCallback(
    (cards: RetrospaceadventureCard[]) => {
      const c = cards.filter(
        (card) =>
          card.critical_effect.effect === "double_damage" ||
          card.critical_effect.effect === "double_heal" ||
          card.critical_effect.effect === "full_life_self" ||
          card.critical_effect.effect === "protect_self"
      );
      const card = c[Math.floor(Math.random() * c.length)];
      card.isEnemyChoice = true;
      return card;
    },
    []
  );

  const generateCard = useCallback(
    (cards: RetrospaceadventureCard[]) => {
      console.log(turn);

      // if (!iaActivated) {
      //   return EnemyState.cards[
      //     Math.floor(Math.random() * EnemyState.cards.length)
      //   ].id;
      // }

      const criticalEffects = cards.map((c) => c.critical_effect.effect);

      // if (
      //   isArrayWithEqualEntries<RetrospaceadventureCardEffect>(criticalEffects)
      // ) {
      //   return EnemyState.cards[0].id;
      // }

      let cardsFilter: RetrospaceadventureCard[] = JSON.parse(
        JSON.stringify(cards)
      );
      let card;

      if (turn < 5) {
        return filterCardsFiveFirstTurns(cardsFilter);
      }
      cardsFilter = filterCannonLaser(criticalEffects, cardsFilter);
      cardsFilter = filterHeal(criticalEffects, cardsFilter);
      cardsFilter = filterDamage(criticalEffects, cardsFilter);
      cardsFilter = filterAntiCannon(criticalEffects, cardsFilter);
      if (cardsFilter.length > 0) {
        card = cardsFilter.sort((a, b) => {
          if (b.laser > a.laser) return -1;
          if (a.laser > b.laser) return 1;
          return 0;
        })[0];
      } else {
        card = cards[Math.floor(Math.random() * cards.length)];
      }

      card.isEnemyChoice = true;
      return card;
    },
    [filterCannonLaser, filterHeal, filterDamage, filterAntiCannon]
  );

  return generateCard;
};

export default useRetrospacegameadventurefightsceneIA;
