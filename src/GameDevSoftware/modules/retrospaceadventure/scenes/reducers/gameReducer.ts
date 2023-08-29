import { EffectStateType, RetrospaceadventureCard, TurnStatus } from "../types";

export type GameReducerStateStatus =
  | "start"
  | "selectionCard"
  | "startMinigame"
  | "heroTurnDone"
  | "fightElement"
  | "applyEffects"
  | "applyEffectsEchec"
  | "fight"
  | "tutorial"
  | "ended";

export type GameReducerState = {
  status: GameReducerStateStatus;
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
  tutorial: number[];
  nextStatus?: GameReducerStateStatus;
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
  tutorial: [],
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

export interface GameReducerActionData {
  tutorial: number;
}

export type GameReducerAction = {
  type:
    | "setTutorial"
    | "getCard"
    | "selectCard"
    | "resultMinigame"
    | "selectEnemy"
    | "appendEffect"
    | "applyEffects"
    | "applyEffectsEchec"
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
    case "setTutorial":
      return {
        ...state,
        status: state.nextStatus || "start",
        nextStatus: undefined,
        tutorial: state.tutorial.concat(data.tutorial),
      };
    case "getCard":
      if (!state.tutorial.includes(1)) {
        return {
          ...state,
          status: "tutorial",
          nextStatus: "selectionCard",
          hero: { cards: data.heroCards },
          enemy: { cards: data.enemyCards },
          howWin: undefined,
          effectState: undefined,
        };
      }
      return {
        ...state,
        status: "selectionCard",
        hero: { cards: data.heroCards },
        enemy: { cards: data.enemyCards },
        howWin: undefined,
        effectState: undefined,
      };
    case "selectCard":
      return {
        ...state,
        status: "heroTurnDone",
        hero: { cards: state.hero.cards, cardChoice: data.heroCardSelect },
        enemy: state.enemy,
      };
    case "resultMinigame":
      return {
        ...state,
        // status: "heroTurnDone",
        status: "fightElement",
        howWin: data.howWin,
      };
    case "selectEnemy":
      return {
        ...state,
        // status: "fightElement",
        status: "startMinigame",
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
    case "applyEffectsEchec":
    case "applyEffects":
      return {
        ...state,
        status: type,
      };
    case "fight":
      return {
        ...state,
        status: "fight",
        turn: state.turn + 1,
      };
    case "gameIsFinish":
      return { ...state, isFinish: true };
  }
};

export default gameReducer;
