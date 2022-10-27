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

  const findCardHeroById = useCallback(() => {
    return findCardCharacterById(true);
  }, [findCardCharacterById]);

  const findCardEnemyById = useCallback(() => {
    return findCardCharacterById(false);
  }, [findCardCharacterById]);

  return {
    findCardHeroById,
    findCardEnemyById,
    findCardCharacterById,
  };
};

export default useRetrospacegameadventurefightsceneUtils;
