import { useCallback, useContext, useEffect } from "react";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import { GameReducerActionData } from "../reducers/gameReducer";
import { RetrospaceadventureCard, RetrospaceadventureElements } from "../types";
import useRetrospacegameadventurefightsceneApplyEffects from "./useRetrospacegameadventurefightsceneApplyEffects";

const useRetrospacegameadventurefightsceneParty = () => {
  const { Hero, Enemy, stateGame, dispatchGame } = useContext(
    RetrospaceadventureGameContext
  );
  const applyEffects = useRetrospacegameadventurefightsceneApplyEffects();

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
    const cards: RetrospaceadventureCard[] = [];
    for (let i = 0; i < 3; i++) {
      const deckFiltered = deck.filter(
        (d) => !cards.find((c) => c.id === d.id)
      );
      cards.push(deckFiltered[Math.floor(Math.random() * deckFiltered.length)]);
    }
    return cards;
  }, []);

  useEffect(() => {
    switch (stateGame.status) {
      case "start":
        dispatchGame({
          type: "getCard",
          data: {
            heroCards: drawCards(Hero.cards),
            enemyCards: drawCards(Enemy.cards),
          } as GameReducerActionData,
        });
        break;
      case "heroTurnDone":
        const enemyCardSelect =
            Enemy.cards[Math.floor(Math.random() * Enemy.cards.length)].id,
          enemyElementSelect = [1, 2, 3][Math.floor(Math.random() * 3)];

        dispatchGame({
          type: "selectEnemy",
          data: {
            enemyCardSelect,
            enemyElementSelect,
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
        } = stateGame;

        if (
          !elementChoiceHero ||
          !elementChoiceEnemy ||
          !cardChoiceHero ||
          !cardChoiceEnemy
        ) {
          return;
        }
        console.log(cardChoiceEnemy, cardChoiceHero);
        const howWin = defineHeroWinElementChoice(
          elementChoiceHero,
          elementChoiceEnemy
        );
        applyEffects(howWin);
        dispatchGame({
          type: "getCard",
          data: {
            heroCards: drawCards(Hero.cards),
            enemyCards: drawCards(Enemy.cards),
          } as GameReducerActionData,
        });
        break;
    }
  }, [stateGame, Hero, Enemy, drawCards, defineHeroWinElementChoice]);

  return {};
};

export default useRetrospacegameadventurefightsceneParty;
