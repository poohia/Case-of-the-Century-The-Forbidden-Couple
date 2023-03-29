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
import { randomFromArray } from "../utils";
import useRetrospacegameadventurefightsceneCards from "./useRetrospacegameadventurefightsceneCards";

const useRetrospacegameadventurefightsceneParty = () => {
  const { stateGame, Enemy, dispatchGame, sendMessageFightInfosStatus } =
    useContext(RetrospaceadventureGameContext);
  const {
    status,
    hero: { cardChoice: cardChoiceHero },
    enemy: { cardChoice: cardChoiceEnemy, cards: cardsEnemy },
    turn,
  } = stateGame;
  const applyEffects = useRetrospacegameadventurefightsceneApplyEffects();
  const drawCardEnemy = useRetrospacegameadventurefightsceneIA();
  const needToRedraw = useRetrospacegameadventurefightsceneCards();
  const { getValueFromConstant } = useGameProvider();
  const { getGameObject } = useGameObjects();
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
    []
  );

  const deck = useMemo(() => {
    // @ts-ignore
    return Enemy.cards.map((card) => transformJSONCardtoCard(card));
  }, [transformJSONCardtoCard]);
  const drawCards = useCallback((): RetrospaceadventureCard[] => {
    const cards: RetrospaceadventureCard[] = [];
    let deckFilter = [];
    for (
      let i = 0;
      i < getValueFromConstant("retrospaceadventure_card_per_character");
      i++
    ) {
      deckFilter = deck.filter((c) => !cards.find((cc) => cc.id === c.id));
      cards.push(randomFromArray(deckFilter));
    }
    if (needToRedraw(cards)) {
      return drawCards();
    }
    return cards;
  }, [deck, turn, getValueFromConstant]);

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
        }, 3000);
        break;
      case "heroTurnDone":
        const enemyCardSelect = drawCardEnemy(cardsEnemy).id;
        dispatchGame({
          type: "selectEnemy",
          data: {
            enemyCardSelect,
          } as GameReducerActionData,
        });
        break;
      case "applyEffects":
        if (!cardChoiceHero || !cardChoiceEnemy || !stateGame.howWin) {
          return;
        }
        applyEffects(stateGame.howWin);
        break;
      case "fight":
        const cards = drawCards();
        dispatchGame({
          type: "getCard",
          data: {
            heroCards: cards,
            enemyCards: cards,
          } as GameReducerActionData,
        });
        break;
    }
  }, [status, drawCards]);

  return {};
};

export default useRetrospacegameadventurefightsceneParty;
