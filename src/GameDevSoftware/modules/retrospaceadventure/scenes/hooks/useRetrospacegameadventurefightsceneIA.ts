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
    stateGame: { enemy: EnemyState },
  } = useContext(RetrospaceadventureGameContext);
  const { getEnvVar } = useGameProvider();

  const iaActivated: boolean = useMemo(() => {
    const v = getEnvVar("ACTIVATE_IA");
    return v ? JSON.parse(v) : false;
  }, [getEnvVar]);

  const filterCannonLaser = useCallback(
    (
      criticalEffects: RetrospaceadventureCardEffect[],
      cards: RetrospaceadventureCard[]
    ) => {
      const { laser } = Enemy;
      if (laser === 0 || !criticalEffects.find((e) => e === "use_full_laser")) {
        return cards.filter((c) => c.critical_effect !== "use_full_laser");
      }
      const percent = calculPercent(laser, Hero.life);
      if (percent < 80) {
        return cards.filter((c) => c.critical_effect !== "use_full_laser");
      }
      if (percent >= 100) {
        return cards.filter((c) => c.critical_effect === "use_full_laser");
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
        return cards.filter((c) => !effetcsHeal.includes(c.critical_effect));
      }

      if (percent > 40 && percent < 90) {
        return cards;
      }

      return cards.filter((c) => effetcsHeal.includes(c.critical_effect));
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
        return cards.filter((c) => c.critical_effect !== "half_life_target");
      } else if (
        percent >= 70 &&
        criticalEffects.includes("half_life_target")
      ) {
        return cards.filter((c) => c.critical_effect === "half_life_target");
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
        return cards.filter((c) => c.critical_effect !== "half_laser_target");
      }
      if (percent >= 80) {
        return cards.filter((c) => c.critical_effect === "half_laser_target");
      }
      return cards;
    },
    [Hero, Enemy]
  );

  const chooseCard = useCallback(() => {
    if (!iaActivated) {
      return EnemyState.cards[
        Math.floor(Math.random() * EnemyState.cards.length)
      ].id;
    }

    const criticalEffects = EnemyState.cards.map((c) => c.critical_effect);

    if (
      isArrayWithEqualEntries<RetrospaceadventureCardEffect>(criticalEffects)
    ) {
      return EnemyState.cards[0].id;
    }

    let cardsFilter: RetrospaceadventureCard[] = JSON.parse(
      JSON.stringify(EnemyState.cards)
    );

    cardsFilter = filterCannonLaser(criticalEffects, cardsFilter);
    cardsFilter = filterHeal(criticalEffects, cardsFilter);
    cardsFilter = filterDamage(criticalEffects, cardsFilter);
    cardsFilter = filterAntiCannon(criticalEffects, cardsFilter);

    if (cardsFilter.length > 0) {
      return cardsFilter.sort((a, b) => {
        if (b.laser > a.laser) return -1;
        if (a.laser > b.laser) return 1;
        return 0;
      })[0].id;
    }
    return EnemyState.cards[Math.floor(Math.random() * EnemyState.cards.length)]
      .id;
  }, [
    iaActivated,
    EnemyState,
    filterCannonLaser,
    filterHeal,
    filterDamage,
    filterAntiCannon,
  ]);

  return {
    chooseCard,
  };
};

export default useRetrospacegameadventurefightsceneIA;
