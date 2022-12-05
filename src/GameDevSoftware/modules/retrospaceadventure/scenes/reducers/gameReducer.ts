import {
  EffectStateType,
  RetrospaceadventureCard,
  RetrospaceadventureElements,
  TurnStatus,
} from "../types";

export type GameReducerState = {
  status:
    | "start"
    | "selectionCard"
    | "startMinigame"
    | "heroTurnDone"
    | "fightElement"
    | "fight";
  hero: {
    cards: RetrospaceadventureCard[];
    cardChoice?: number;
  };
  enemy: {
    cards: RetrospaceadventureCard[];
    cardChoice?: number;
  };
  effectState?: EffectStateType;
  howWin?: TurnStatus;
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
}

export interface GameReducerActionData {
  effectState: EffectStateType;
}

export interface GameReducerActionData {
  howWin: TurnStatus;
}

export type GameReducerAction = {
  type:
    | "getCard"
    | "selectCard"
    | "resultMinigame"
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
        status: "startMinigame",
        hero: { cards: state.hero.cards, cardChoice: data.heroCardSelect },
        enemy: state.enemy,
      };
    case "resultMinigame":
      return { ...state, status: "heroTurnDone", howWin: data.howWin };
    case "selectEnemy":
      return {
        ...state,
        status: "fightElement",
        hero: state.hero,
        enemy: {
          cards: state.enemy.cards,
          cardChoice: data.enemyCardSelect,
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
