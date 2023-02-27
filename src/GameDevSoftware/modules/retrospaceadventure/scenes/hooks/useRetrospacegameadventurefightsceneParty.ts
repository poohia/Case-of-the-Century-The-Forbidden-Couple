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
import { generateRandomCard, shuffleArray } from "../utils";
import useRetrospacegameadventurefightsceneUser from "./useRetrospacegameadventurefightsceneUser";

const useRetrospacegameadventurefightsceneParty = () => {
  const { stateGame, Hero, Enemy, dispatchGame, sendMessageFightInfosStatus } =
    useContext(RetrospaceadventureGameContext);
  const {
    status,
    hero: { cardChoice: cardChoiceHero },
    enemy: { cardChoice: cardChoiceEnemy, cards: cardsEnemy },
    turn,
  } = stateGame;
  const applyEffects = useRetrospacegameadventurefightsceneApplyEffects();
  const generateCardIA = useRetrospacegameadventurefightsceneIA();
  const generateCardUser = useRetrospacegameadventurefightsceneUser();
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

  const filterRandomCard = useCallback((cards: RetrospaceadventureCard[]) => {
    return generateRandomCard(
      cards.filter((card) => {
        if (
          (card.critical_effect.effect === "half_laser_target" &&
            Enemy.laser < 400) ||
          (card.critical_effect.effect === "half_laser_target" &&
            Hero.laser < 400)
        ) {
          return false;
        }
        return card.critical_effect.effect !== "use_full_laser";
      })
    );
  }, []);

  const drawCards = useCallback(() => {
    const cards: RetrospaceadventureCard[] = [];
    cards.push(generateCardIA(deck));
    let deckFilter = deck.filter((c) => !cards.find((cc) => cc.id === c.id));
    cards.push(generateCardUser(deckFilter));
    for (
      let i = 2;
      i < getValueFromConstant("retrospaceadventure_card_per_character");
      i++
    ) {
      deckFilter = deck.filter((c) => !cards.find((cc) => cc.id === c.id));
      cards.push(filterRandomCard(deckFilter));
    }
    return shuffleArray(cards);
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
