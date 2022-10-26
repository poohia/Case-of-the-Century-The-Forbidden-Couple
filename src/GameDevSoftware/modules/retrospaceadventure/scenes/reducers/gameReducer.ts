import { RetrospaceadventureCard, RetrospaceadventureElements } from "../types";

export type gameReducerState = {
  status:
    | "start"
    | "selectionCard"
    | "selectionElement"
    | "heroTurnDone"
    | "fight";
  hero: {
    cards: RetrospaceadventureCard[];
    cardChoice?: RetrospaceadventureCard;
    elementChoice?: RetrospaceadventureElements;
  };
  enemy: {
    cards: RetrospaceadventureCard[];
    cardChoice?: RetrospaceadventureCard;
    elementChoice?: RetrospaceadventureElements;
  };
};

export const gameLifeDefaultState: gameReducerState = {
  status: "start",
  hero: {
    cards: [],
  },
  enemy: {
    cards: [],
  },
};

export interface GameReducerActionData {
  heroCards: RetrospaceadventureCard[];
  enemyCards: RetrospaceadventureCard[];
}

export interface GameReducerActionData {
  heroCardSelect: RetrospaceadventureCard;
}

export interface GameReducerActionData {
  heroElementSelect: RetrospaceadventureElements;
}

export interface GameReducerActionData {
  enemyCardSelect: RetrospaceadventureCard;
  enemyElementSelect: RetrospaceadventureElements;
}

export type gameReducerAction = {
  type: "getCard" | "selectCard" | "selectElement" | "selectEnemy";
  data?: GameReducerActionData;
};

const gameReducer = (
  state: gameReducerState,
  action: gameReducerAction
): gameReducerState => {
  const { type, data } = action;
  if (!data) return state;
  switch (type) {
    case "getCard":
      return {
        status: "selectionCard",
        hero: { cards: data.heroCards },
        enemy: { cards: data.enemyCards },
      };
    case "selectCard":
      return {
        status: "selectionElement",
        hero: { cards: [], cardChoice: data.heroCardSelect },
        enemy: state.enemy,
      };
    case "selectElement":
      return {
        status: "heroTurnDone",
        hero: { ...state.hero, elementChoice: data.heroElementSelect },
        enemy: state.enemy,
      };
    case "selectEnemy":
      return {
        status: "fight",
        hero: state.hero,
        enemy: {
          cards: [],
          cardChoice: data.enemyCardSelect,
          elementChoice: data.enemyElementSelect,
        },
      };
  }
};

export default gameReducer;
