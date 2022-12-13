import { EffectStateType, RetrospaceadventureCard, TurnStatus } from "../types";

export type GameReducerState = {
  status:
    | "start"
    | "selectionCard"
    | "startMinigame"
    | "heroTurnDone"
    | "fightElement"
    | "fight"
    | "ended";
  hero: {
    cards: RetrospaceadventureCard[];
    cardChoice?: number;
  };
  enemy: {
    cards: RetrospaceadventureCard[];
    cardChoice?: number;
  };
  nbTurn: number;
  turn: number;
  effectState?: EffectStateType;
  howWin?: TurnStatus;
  isFinish: boolean;
};

export const gameLifeDefaultState: GameReducerState = {
  status: "start",
  nbTurn: 10,
  turn: 1,
  hero: {
    cards: [],
  },
  enemy: {
    cards: [],
  },
  isFinish: false,
};

export interface GameReducerActionData {
  heroCards: RetrospaceadventureCard[];
  enemyCards: RetrospaceadventureCard[];
}

export interface GameReducerActionData {
  heroCardSelect: number;
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
    | "fight"
    | "gameIsFinish";
  data?: GameReducerActionData;
};

const gameReducer = (
  state: GameReducerState,
  action: GameReducerAction
): GameReducerState => {
  const { type, data } = action as Required<GameReducerAction>;

  if (state.isFinish) {
    return { ...gameLifeDefaultState, status: "ended", isFinish: true };
  }

  switch (type) {
    case "getCard":
      return {
        ...state,
        status: "selectionCard",
        hero: { cards: data.heroCards },
        enemy: { cards: data.enemyCards },
      };
    case "selectCard":
      return {
        ...state,
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
    case "fight":
      return {
        ...state,
        status: type,
        turn: state.turn + 1,
      };
    case "gameIsFinish":
      return { ...state, isFinish: true };
  }
};

export default gameReducer;
