import { useCallback, useContext, useEffect, useMemo } from "react";
import { useGameProvider } from "../../../../../gameProvider";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import { GameReducerActionData } from "../reducers/gameReducer";
import {
  RestrospaceSkillType,
  RetrospaceadventureCard,
  RetrospaceadventureTypeCard,
} from "../types";
import useRetrospacegameadventurefightsceneApplyEffects from "./useRetrospacegameadventurefightsceneApplyEffects";
import useRetrospacegameadventurefightsceneIA from "./useRetrospacegameadventurefightsceneIA";
import { useAssets, useGameObjects } from "../../../../../hooks";
import { shuffleArray } from "../utils";

const useRetrospacegameadventurefightsceneParty = () => {
  const { stateGame, dispatchGame, sendMessageFightInfosStatus } = useContext(
    RetrospaceadventureGameContext
  );
  const {
    status,
    hero: { cardChoice: cardChoiceHero },
    enemy: { cardChoice: cardChoiceEnemy, cards: cardsEnemy },
  } = stateGame;
  const applyEffects = useRetrospacegameadventurefightsceneApplyEffects();
  const { chooseCard: chooseCardIA } = useRetrospacegameadventurefightsceneIA();
  const { getValueFromConstant } = useGameProvider();
  const { getGameObjectsFromType, getGameObject } = useGameObjects();
  const { getAssetImg } = useAssets();

  const transformJSONCardtoCard = useCallback(
    (card: RetrospaceadventureTypeCard): RetrospaceadventureCard => {
      return {
        id: card._id,
        _title: card._title,
        image: getAssetImg(card.image),
        damage: card.damage,
        laser: card.laser,
        critical_effect: getGameObject<RestrospaceSkillType>(
          card.critical_effect
        ),
        echec_effect: getGameObject<RestrospaceSkillType>(card.echec_effect),
      };
    },
    [getGameObject, getAssetImg]
  );

  const deck = useMemo(
    () =>
      getGameObjectsFromType<RetrospaceadventureTypeCard>(
        "retrospaceadventure-card"
      ).map((card) => transformJSONCardtoCard(card)),
    [getGameObjectsFromType, transformJSONCardtoCard]
  );

  const drawCards = useCallback(() => {
    const cards: RetrospaceadventureCard[] = [];
    cards.push(chooseCardIA(deck));
    for (
      let i = 1;
      i < getValueFromConstant("retrospaceadventure_card_per_character");
      i++
    ) {
      const deckFilter = deck.filter(
        (c) => !cards.find((cc) => cc.id === c.id)
      );
      cards.push(deckFilter[Math.floor(Math.random() * deckFilter.length)]);
    }
    return shuffleArray(cards);
  }, [deck, getValueFromConstant]);

  useEffect(() => {
    switch (stateGame.status) {
      case "start":
        setTimeout(() => {
          const cards = drawCards();
          dispatchGame({
            type: "getCard",
            data: {
              heroCards: cards,
              enemyCards: cards,
            } as GameReducerActionData,
          });
          sendMessageFightInfosStatus(null);
        }, 2000);
        break;
      case "heroTurnDone":
        const enemyCardSelect =
          cardsEnemy.find((card) => !!card.isEnemyChoice)?.id ||
          cardsEnemy[Math.floor(Math.random() * cardsEnemy.length)].id;
        dispatchGame({
          type: "selectEnemy",
          data: {
            enemyCardSelect,
          } as GameReducerActionData,
        });
        break;
      case "fight":
        const cards = drawCards();
        console.log(
          "🚀 ~ file: useRetrospacegameadventurefightsceneParty.ts:99 ~ useEffect ~ cards",
          cards
        );
        if (!cardChoiceHero || !cardChoiceEnemy || !stateGame.howWin) {
          return;
        }
        applyEffects(stateGame.howWin);
        setTimeout(() => {
          dispatchGame({
            type: "getCard",
            data: {
              heroCards: cards,
              enemyCards: cards,
            } as GameReducerActionData,
          });
        }, 5000 * 2);
        break;
    }
  }, [status, drawCards]);

  return {};
};

export default useRetrospacegameadventurefightsceneParty;
