import { useCallback, useContext } from "react";
import { IACanUseLaser } from "../contants";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import { RetrospaceadventureCardEffect } from "../types";
import { isArrayWithEqualEntries } from "../utils";

const useRetrospacegameadventurefightsceneIA = () => {
  const {
    Enemy,
    stateGame: { enemy: EnemyState },
  } = useContext(RetrospaceadventureGameContext);

  const chooseElement = useCallback(() => {
    return [1, 2, 3][Math.floor(Math.random() * 3)];
  }, []);

  const filterCanonLaser = useCallback(
    (criticalEffects: RetrospaceadventureCardEffect[]) => {
      const { laser } = Enemy;
      if (
        laser >= IACanUseLaser &&
        criticalEffects.find((e) => e === "use_full_laser")
      ) {
        EnemyState.cards = EnemyState.cards.filter(
          (c) => c.critical_effect === "use_full_laser"
        );
      } else {
        EnemyState.cards = EnemyState.cards.filter(
          (c) => c.critical_effect !== "use_full_laser"
        );
      }
    },
    [Enemy, EnemyState]
  );

  const chooseCard = useCallback(() => {
    const criticalEffects = EnemyState.cards.map((c) => c.critical_effect);
    if (
      isArrayWithEqualEntries<RetrospaceadventureCardEffect>(criticalEffects)
    ) {
      return EnemyState.cards[0].id;
    }

    filterCanonLaser(criticalEffects);

    return EnemyState.cards[Math.floor(Math.random() * EnemyState.cards.length)]
      .id;
  }, [EnemyState, filterCanonLaser]);

  return {
    chooseElement,
    chooseCard,
  };
};

export default useRetrospacegameadventurefightsceneIA;
