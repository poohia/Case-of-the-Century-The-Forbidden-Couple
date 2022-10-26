import { useCallback } from "react";
import {
  RetrospaceadventureCard,
  RetrospaceadventureCardEffect,
  RetrospaceadventureCharacter,
} from "../types";

const useRetrospacegameadventurefightsceneEffects = (
  updateHero: React.Dispatch<
    React.SetStateAction<RetrospaceadventureCharacter | undefined>
  >,
  updateEnemy: React.Dispatch<
    React.SetStateAction<RetrospaceadventureCharacter | undefined>
  >
) => {
  const applyCCEffect = useCallback(
    (
      card: RetrospaceadventureCard,
      updateTarget: React.Dispatch<
        React.SetStateAction<RetrospaceadventureCharacter | undefined>
      >
    ) => {},
    []
  );

  const applyECEffect = useCallback((card: RetrospaceadventureCard) => {}, []);

  const defineTarget = useCallback(
    (effect: RetrospaceadventureCardEffect) => {},
    []
  );

  const applyEffect = useCallback(
    (
      cardHero: RetrospaceadventureCard,
      cardEnemy: RetrospaceadventureCard,
      howWin: "win" | "draw" | "loose"
    ) => {
      if (howWin === "win") {
        switch (cardHero.critical_effect) {
          case "double_damage":
            applyDoubleDamage(cardHero, updateEnemy);
            break;
          default:
            return;
        }
        switch (cardEnemy.echec_effect) {
          case "divise_damage":
            applyDiviseDamage(cardEnemy, updateHero);
            break;
          default:
            return;
        }
      }
      if (howWin === "loose") {
        switch (cardEnemy.critical_effect) {
          case "double_damage":
            applyDoubleDamage(cardEnemy, updateHero);
            break;
          default:
            return;
        }
        switch (cardHero.echec_effect) {
          case "divise_damage":
            applyDiviseDamage(cardHero, updateEnemy);
            break;
          default:
            return;
        }
      }
    },
    []
  );

  const applyDoubleDamage = useCallback(
    (
      card: RetrospaceadventureCard,
      updateTarget: React.Dispatch<
        React.SetStateAction<RetrospaceadventureCharacter | undefined>
      >
    ) => {
      const finalValue = card.damage * 2;

      updateTarget((target) => {
        if (!target) return undefined;
        console.log(finalValue, target.life, target.life - finalValue);
        const finalLife = target.life - finalValue;
        return { ...target, life: finalLife };
      });
    },
    []
  );

  const applyDiviseDamage = useCallback(
    (
      card: RetrospaceadventureCard,
      updateTarget: React.Dispatch<
        React.SetStateAction<RetrospaceadventureCharacter | undefined>
      >
    ) => {
      const finalValue = card.damage / 2;
      updateTarget((target) => {
        if (!target) return undefined;
        const finalLife = target.life - finalValue;
        console.log(finalLife);
        return { ...target, life: finalLife };
      });
    },
    []
  );

  return { applyEffect };
};

export default useRetrospacegameadventurefightsceneEffects;
