import { useCallback, useContext } from "react";
import {
  RetrospaceadventureCard,
  RetrospaceadventureCardEffect,
} from "../types";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import {
  calculPercent,
  drawCardByEffect,
  generateRandomCard,
  mapCardEffect,
} from "../utils";

const useRetrospacegameadventurefightsceneUser = () => {
  const {
    stateGame: { nbTurn, turn },
    Hero,
    Enemy,
  } = useContext(RetrospaceadventureGameContext);

  const filterCardsThreeFirstTurns = useCallback(
    (cards: RetrospaceadventureCard[]) => {
      const c = cards.filter(
        (card) =>
          card.critical_effect.effect === "double_damage" ||
          card.critical_effect.effect === "double_heal" ||
          card.critical_effect.effect === "half_life_target"
      );
      const card = c[Math.floor(Math.random() * c.length)];
      card.isEnemyChoice = true;
      return card;
    },
    []
  );

  const generateCard = useCallback(
    (cards: RetrospaceadventureCard[]) => {
      const criticalEffects = mapCardEffect(cards);
      if (turn < 3) {
        return filterCardsThreeFirstTurns(cards);
      }
      if (
        criticalEffects.find((effect) => effect === "half_life_target") &&
        turn > 5 &&
        calculPercent(Hero.life, Hero.baseLife) > 85
      ) {
        return drawCardByEffect(cards, "half_life_target");
      }
      if (
        criticalEffects.find((effect) => effect === "use_full_laser") &&
        Hero.laser >= Enemy.life
      ) {
        return drawCardByEffect(cards, "use_full_laser");
      }
      if (
        criticalEffects.find((effect) => effect === "half_laser_target") &&
        Enemy.laser >= Hero.life
      ) {
        return drawCardByEffect(cards, "half_laser_target");
      }
      return generateRandomCard(cards);
    },
    [turn, nbTurn]
  );

  return generateCard;
};
export default useRetrospacegameadventurefightsceneUser;
