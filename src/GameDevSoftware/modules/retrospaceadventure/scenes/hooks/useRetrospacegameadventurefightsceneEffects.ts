import { useCallback, useContext } from "react";

import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import {
  RetrospaceadventureCard,
  RetrospaceadventureCharacter,
} from "../types";

const useRetrospacegameadventurefightsceneEffects = () => {
  const { Hero, Enemy, updateHero, updateEnemy } = useContext(
    RetrospaceadventureGameContext
  );

  const applyUseFullCanonLaser = useCallback(
    (isHero: boolean, isWin: boolean, targetIsProtected: boolean) => {
      if (targetIsProtected) {
        return;
      }
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

  const applyHalfLaser = useCallback(
    (
      updateTarget: React.Dispatch<
        React.SetStateAction<RetrospaceadventureCharacter>
      >,
      targetIsProtected: boolean
    ) => {
      if (targetIsProtected) {
        return;
      }
      updateTarget((target) => {
        return {
          ...target,
          laser: target.laser / 2,
        };
      });
    },
    []
  );

  const applyDamage = useCallback(
    (
      card: RetrospaceadventureCard,
      updateTarget: React.Dispatch<
        React.SetStateAction<RetrospaceadventureCharacter>
      >,
      targetIsProtected: boolean,
      targetSufferDoubleDamage: boolean
    ) => {
      if (targetIsProtected) {
        return;
      }
      let finalValue = card.damage;
      if (targetSufferDoubleDamage) {
        finalValue *= 2;
      }
      updateTarget((target) => {
        const finalLife = target.life - finalValue;
        return { ...target, life: finalLife };
      });
    },
    []
  );

  const applyDoubleDamage = useCallback(
    (
      card: RetrospaceadventureCard,
      updateTarget: React.Dispatch<
        React.SetStateAction<RetrospaceadventureCharacter>
      >,
      targetIsProtected: boolean,
      targetSufferDoubleDamage: boolean
    ) => {
      if (targetIsProtected) {
        return;
      }
      let finalValue = card.damage * 2;
      if (targetSufferDoubleDamage) {
        finalValue *= 2;
      }
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
      >,
      targetIsProtected: boolean
    ) => {
      if (targetIsProtected) {
        return;
      }
      const finalValue = card.damage / 2;
      updateTarget((target) => {
        const finalLife = target.life - finalValue;
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
      >,
      targetIsProtected = false
    ) => {
      if (targetIsProtected) {
        return;
      }
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

  const applyFullLife = useCallback(
    (
      updateTarget: React.Dispatch<
        React.SetStateAction<RetrospaceadventureCharacter>
      >
    ) => {
      updateTarget((target) => {
        return {
          ...target,
          life: target.baseLife,
        };
      });
    },
    []
  );

  const sufferDoubleDamage = useCallback(
    (
      damage: number,
      updateTarget: React.Dispatch<
        React.SetStateAction<RetrospaceadventureCharacter>
      >
    ) => {
      updateTarget((target) => {
        const futureLife = target.baseLife - damage * 2;
        return {
          ...target,
          life: futureLife,
        };
      });
    },
    []
  );

  const appendDamageToLaser = useCallback(
    (
      damage: number,
      updateTarget: React.Dispatch<
        React.SetStateAction<RetrospaceadventureCharacter>
      >
    ) => {
      updateTarget((target) => {
        return {
          ...target,
          laser: target.laser + damage,
        };
      });
    },
    []
  );

  const applySwitchLife = useCallback(() => {
    const lifeHero = Number(Hero.life);
    const lifeEnemy = Number(Enemy.life);

    updateHero((hero) => {
      return { ...hero, life: lifeEnemy };
    });
    updateEnemy((hero) => {
      return { ...hero, life: lifeHero };
    });
  }, [Hero, Enemy]);

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
    applyFullLife,
    sufferDoubleDamage,
    applyHalfLaser,
    appendDamageToLaser,
    applySwitchLife,
  };
};

export default useRetrospacegameadventurefightsceneEffects;
