import { useCallback, useContext } from "react";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import {
  RetrospaceadventureCard,
  RetrospaceadventureCharacter,
  TurnStatus,
} from "../types";

const useRetrospacegameadventurefightsceneEffects = () => {
  const { Hero, Enemy, updateHero, updateEnemy } = useContext(
    RetrospaceadventureGameContext
  );

  const applyUseFullCanonLaser = useCallback(
    (isHero: boolean, isWin: boolean) => {
      if (isHero) {
        const damage = isWin ? Hero.laser : Hero.laser / 2;

        updateHero((hero) => {
          hero.laser -= damage;
          return hero;
        });
        updateEnemy((enemy) => {
          enemy.life -= damage;
          return enemy;
        });
      } else {
        const damage = isWin ? Enemy.laser : Enemy.laser / 2;
        updateEnemy((enemy) => {
          enemy.laser -= damage;
          return enemy;
        });
        updateHero((hero) => {
          hero.life -= damage;
          return hero;
        });
      }
    },
    [Hero, Enemy, updateHero, updateEnemy]
  );

  const applyDoubleDamage = useCallback(
    (
      card: RetrospaceadventureCard,
      updateTarget: React.Dispatch<
        React.SetStateAction<RetrospaceadventureCharacter>
      >
    ) => {
      const finalValue = card.damage * 2;

      updateTarget((target) => {
        const finalLife = target.life - finalValue;
        return { ...target, life: finalLife };
      });
    },
    []
  );

  const applyHalfDamage = useCallback(
    (
      card: RetrospaceadventureCard,
      updateTarget: React.Dispatch<
        React.SetStateAction<RetrospaceadventureCharacter>
      >
    ) => {
      const finalValue = card.damage / 2;
      updateTarget((target) => {
        const finalLife = target.life - finalValue;
        return { ...target, life: finalLife };
      });
    },
    []
  );

  const applyDamage = useCallback(
    (
      card: RetrospaceadventureCard,
      updateTarget: React.Dispatch<
        React.SetStateAction<RetrospaceadventureCharacter>
      >
    ) => {
      updateTarget((target) => {
        const finalLife = target.life - card.damage;
        return { ...target, life: finalLife };
      });
    },
    []
  );

  const appendCanonLaserDamage = useCallback(
    (
      card: RetrospaceadventureCard,
      updateTarget: React.Dispatch<
        React.SetStateAction<RetrospaceadventureCharacter>
      >
    ) => {
      updateTarget((target) => {
        return { ...target, laser: target.laser + card.laser };
      });
    },
    []
  );

  const doubleHeal = useCallback(
    (
      card: RetrospaceadventureCard,
      updateTarget: React.Dispatch<
        React.SetStateAction<RetrospaceadventureCharacter>
      >
    ) => {
      updateTarget((target) => {
        const futureLife = target.life + card.damage * 2;

        return {
          ...target,
          life: futureLife > target.baseLife ? target.baseLife : futureLife,
        };
      });
    },
    []
  );

  const heal = useCallback(
    (
      card: RetrospaceadventureCard,
      updateTarget: React.Dispatch<
        React.SetStateAction<RetrospaceadventureCharacter>
      >
    ) => {
      updateTarget((target) => {
        const futureLife = target.life + card.damage;
        return {
          ...target,
          life: futureLife > target.baseLife ? target.baseLife : futureLife,
        };
      });
    },
    []
  );

  const halfHeal = useCallback(
    (
      card: RetrospaceadventureCard,
      updateTarget: React.Dispatch<
        React.SetStateAction<RetrospaceadventureCharacter>
      >
    ) => {
      updateTarget((target) => {
        const futureLife = target.life + card.damage / 2;
        return {
          ...target,
          life: futureLife > target.baseLife ? target.baseLife : futureLife,
        };
      });
    },
    []
  );

  const applyHalfLife = useCallback(
    (
      updateTarget: React.Dispatch<
        React.SetStateAction<RetrospaceadventureCharacter>
      >
    ) => {
      updateTarget((target) => {
        const futureLife = target.baseLife / 2;
        return {
          ...target,
          life: futureLife,
        };
      });
    },
    []
  );

  return {
    appendCanonLaserDamage,
    applyDamage,
    applyHalfDamage,
    applyDoubleDamage,
    applyUseFullCanonLaser,
    heal,
    halfHeal,
    applyHalfLife,
    doubleHeal,
  };
};

export default useRetrospacegameadventurefightsceneEffects;
