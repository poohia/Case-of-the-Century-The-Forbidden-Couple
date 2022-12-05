import { useCallback, useContext, useEffect } from "react";
import { useGameProvider } from "../../../../../gameProvider";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import { GameReducerActionData } from "../reducers/gameReducer";
import { RetrospaceadventureCard } from "../types";
import { defineHeroWinElementChoice } from "../utils";
import useRetrospacegameadventurefightsceneApplyEffects from "./useRetrospacegameadventurefightsceneApplyEffects";
import useRetrospacegameadventurefightsceneIA from "./useRetrospacegameadventurefightsceneIA";

const useRetrospacegameadventurefightsceneParty = () => {
  const { Hero, Enemy, stateGame, dispatchGame, sendMessageFightInfosStatus } =
    useContext(RetrospaceadventureGameContext);
  const {
    status,
    hero: { cardChoice: cardChoiceHero },
    enemy: { cardChoice: cardChoiceEnemy },
  } = stateGame;
  const applyEffects = useRetrospacegameadventurefightsceneApplyEffects();
  const { chooseCard: chooseCardIA, chooseElement: chooseElementIA } =
    useRetrospacegameadventurefightsceneIA();
  const { getValueFromConstant } = useGameProvider();

  const drawCards = useCallback(
    (deck: RetrospaceadventureCard[]) => {
      const cards: RetrospaceadventureCard[] = [];
      for (
        let i = 0;
        i < getValueFromConstant("retrospaceadventure_card_per_character");
        i++
      ) {
        const deckFiltered = deck.filter(
          (d) => !cards.find((c) => c.id === d.id)
        );
        cards.push(
          deckFiltered[Math.floor(Math.random() * deckFiltered.length)]
        );
      }
      return cards;
    },
    [getValueFromConstant]
  );

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
        setTimeout(() => sendMessageFightInfosStatus(null), 2000);
        break;
      case "heroTurnDone":
        const enemyCardSelect = chooseCardIA();

        dispatchGame({
          type: "selectEnemy",
          data: {
            enemyCardSelect,
          } as GameReducerActionData,
        });
        break;
      case "fight":
        if (!cardChoiceHero || !cardChoiceEnemy || !stateGame.howWin) {
          return;
        }
        applyEffects(stateGame.howWin);
        setTimeout(() => {
          dispatchGame({
            type: "getCard",
            data: {
              heroCards: drawCards(Hero.cards),
              enemyCards: drawCards(Enemy.cards),
            } as GameReducerActionData,
          });
        }, 5000);
        break;
    }
  }, [status, drawCards, defineHeroWinElementChoice]);

  return {};
};

export default useRetrospacegameadventurefightsceneParty;
