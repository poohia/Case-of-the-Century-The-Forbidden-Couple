import { useCallback, useContext } from "react";

import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import { RetrospaceadventureCard } from "../types";

const useRetrospacegameadventurefightsceneUtils = () => {
  const { stateGame } = useContext(RetrospaceadventureGameContext);

  const findCardCharacterById = useCallback(
    (isHero: boolean): RetrospaceadventureCard => {
      let value: any;
      if (isHero) {
        value = stateGame.hero.cards.find(
          (c) => c.id === stateGame.hero.cardChoice
        );
      } else {
        value = stateGame.enemy.cards.find(
          (c) => c.id === stateGame.enemy.cardChoice
        );
      }
      return value;
    },
    [stateGame]
  );

  const findEffectByHowWin = useCallback(
    (isHero: boolean) => {
      const { howWin } = stateGame;
      const {
        critical_effect: criticalEffectHero,
        echec_effect: echecEffectHero,
      } = findCardHeroById();
      const {
        critical_effect: criticalEffectEnemy,
        echec_effect: echecEffectEnemy,
      } = findCardEnemyById();

      if (howWin === "win" && isHero) {
        return criticalEffectHero;
      }
      if (howWin === "loose" && isHero) {
        return echecEffectHero;
      }
      if (howWin === "win" && !isHero) {
        return criticalEffectEnemy;
      }
      if (howWin === "loose" && !isHero) {
        return echecEffectEnemy;
      }

      return criticalEffectHero;
    },
    [stateGame]
  );

  const findCardHeroById = useCallback(() => {
    return findCardCharacterById(true);
  }, [findCardCharacterById]);

  const findCardEnemyById = useCallback(() => {
    return findCardCharacterById(false);
  }, [findCardCharacterById]);

  const findEffectHeroByIdAndHowWin = useCallback(() => {
    return findEffectByHowWin(true);
  }, [findEffectByHowWin]);

  const findEffectEnemyByIdAndHowWin = useCallback(() => {
    return findEffectByHowWin(false);
  }, [findEffectByHowWin]);

  return {
    findCardHeroById,
    findCardEnemyById,
    findCardCharacterById,
    findEffectByHowWin,
    findEffectHeroByIdAndHowWin,
    findEffectEnemyByIdAndHowWin,
  };
};

export default useRetrospacegameadventurefightsceneUtils;
