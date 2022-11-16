import {
  EffectStateType,
  RetrospaceadventureCard,
  RetrospaceadventureElements,
} from "../types";

export type GameReducerState = {
  status:
    | "start"
    | "selectionCard"
    | "selectionElement"
    | "heroTurnDone"
    | "fightElement"
    | "fight";
  hero: {
    cards: RetrospaceadventureCard[];
    cardChoice?: number;
    elementChoice?: RetrospaceadventureElements;
  };
  enemy: {
    cards: RetrospaceadventureCard[];
    cardChoice?: number;
    elementChoice?: RetrospaceadventureElements;
  };
  effectState?: EffectStateType;
};

export const gameLifeDefaultState: GameReducerState = {
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
  heroCardSelect: number;
}

export interface GameReducerActionData {
  heroElementSelect: RetrospaceadventureElements;
}

export interface GameReducerActionData {
  enemyCardSelect: number;
  enemyElementSelect: RetrospaceadventureElements;
}

export interface GameReducerActionData {
  effectState: EffectStateType;
}

export type GameReducerAction = {
  type:
    | "getCard"
    | "selectCard"
    | "selectElement"
    | "selectEnemy"
    | "appendEffect"
    | "fight";
  data?: GameReducerActionData;
};

const gameReducer = (
  state: GameReducerState,
  action: GameReducerAction
): GameReducerState => {
  const { type, data } = action as Required<GameReducerAction>;
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
        hero: { cards: state.hero.cards, cardChoice: data.heroCardSelect },
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
        status: "fightElement",
        hero: state.hero,
        enemy: {
          cards: state.enemy.cards,
          cardChoice: data.enemyCardSelect,
          elementChoice: data.enemyElementSelect,
        },
      };
    case "appendEffect":
      return {
        ...state,
        effectState: data.effectState,
      };
    default:
      // "fight"
      return {
        ...state,
        status: type,
      };
  }
};

export default gameReducer;
