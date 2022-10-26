import { useCallback, useEffect, useReducer, useState } from "react";
import { useAssets, useGameObjects } from "../../../../../hooks";
import gameReducer, {
  gameLifeDefaultState,
  GameReducerActionData,
} from "../reducers/gameReducer";
import {
  RetrospaceadventureCard,
  RetrospaceadventureCharacter,
  RetrospaceadventureElements,
} from "../types";
import useRetrospacegameadventurefightsceneEffects from "./useRetrospacegameadventurefightsceneEffects";

const useRetrospacegameadventurefightsceneParty = (
  Hero: RetrospaceadventureCharacter | undefined,
  Enemy: RetrospaceadventureCharacter | undefined,
  updateHero: React.Dispatch<
    React.SetStateAction<RetrospaceadventureCharacter | undefined>
  >,
  updateEnemy: React.Dispatch<
    React.SetStateAction<RetrospaceadventureCharacter | undefined>
  >
) => {
  const [state, dispatch] = useReducer(gameReducer, gameLifeDefaultState);
  const { applyEffect } = useRetrospacegameadventurefightsceneEffects(
    updateHero,
    updateEnemy
  );

  const defineHeroWinElementChoice = useCallback(
    (
      elementChoiceHero: RetrospaceadventureElements,
      elementChoiceEnemy: RetrospaceadventureElements
    ): "win" | "draw" | "loose" => {
      if (elementChoiceHero === elementChoiceEnemy) {
        return "draw";
      }
      if (
        (elementChoiceHero === 1 && elementChoiceEnemy === 2) ||
        (elementChoiceHero === 2 && elementChoiceEnemy === 3) ||
        (elementChoiceHero === 3 && elementChoiceEnemy === 1)
      ) {
        return "win";
      }
      return "loose";
    },
    []
  );

  const drawCards = useCallback((deck: RetrospaceadventureCard[]) => {
    return deck;
  }, []);

  useEffect(() => {
    if (!Hero || !Enemy) {
      return;
    }

    console.log("i'm ehre");

    switch (state.status) {
      case "start":
        dispatch({
          type: "getCard",
          data: {
            heroCards: drawCards(Hero.cards),
            enemyCards: drawCards(Enemy.cards),
          } as GameReducerActionData,
        });
        break;
      case "heroTurnDone":
        dispatch({
          type: "selectEnemy",
          data: {
            enemyCardSelect: Enemy.cards[0],
            enemyElementSelect: 2,
          } as GameReducerActionData,
        });
        break;
      case "fight":
        const {
          hero: {
            cardChoice: cardChoiceHero,
            elementChoice: elementChoiceHero,
          },
          enemy: {
            cardChoice: cardChoiceEnemy,
            elementChoice: elementChoiceEnemy,
          },
        } = state;
        if (
          !elementChoiceHero ||
          !elementChoiceEnemy ||
          !cardChoiceHero ||
          !cardChoiceEnemy
        )
          return;
        const howWin = defineHeroWinElementChoice(
          elementChoiceHero,
          elementChoiceEnemy
        );
        applyEffect(cardChoiceHero, cardChoiceEnemy, howWin);
        dispatch({
          type: "getCard",
          data: {
            heroCards: drawCards(Hero.cards),
            enemyCards: drawCards(Enemy.cards),
          } as GameReducerActionData,
        });
        break;
    }
  }, [state, Hero, Enemy, drawCards, defineHeroWinElementChoice]);

  return {
    stateGame: state,
    dispatchGame: dispatch,
  };
};

export default useRetrospacegameadventurefightsceneParty;
