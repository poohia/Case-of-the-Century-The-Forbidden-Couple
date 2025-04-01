import { MiniGames } from "../../types";

export type FinalFightReducerAction =
  | "init"
  | "startGame"
  | "selectChoice"
  | "selectMiniGame"
  | "hitRobot"
  | "startSnake"
  | "startBreakout"
  | "startBossfight"
  | "heroWinMiniGame";

export type FinalFightReducerState = {
  action: FinalFightReducerAction;
  heroLife: number;
  enemyLife: number;
  startMiniGame: boolean;
  startHitRobot: boolean;
  miniGame?: MiniGames;
  pause?: boolean;
};

export const finalFightDefaultState: FinalFightReducerState = {
  action: "init",
  heroLife: 0,
  enemyLife: 0,
  startMiniGame: false,
  startHitRobot: false,
};

const finalFightReducer = (
  state: FinalFightReducerState,
  action: FinalFightReducerAction
): FinalFightReducerState => {
  state.action = action;
  switch (action) {
    case "init":
      return finalFightDefaultState;
    case "startGame":
      return { ...state, heroLife: 100, enemyLife: 100 };
    case "hitRobot":
      if (state.enemyLife - 1 < 80) {
        // return { ...state, action: "selectMiniGame", startHitRobot: false };
        return { ...state, startHitRobot: false };
      }
      return { ...state, enemyLife: state.enemyLife - 1 };
    case "heroWinMiniGame":
      return {
        ...state,
        startMiniGame: false,
        startHitRobot: true,
      };
    case "startBossfight":
      return {
        ...state,
        startMiniGame: true,
        miniGame: "bossfight",
        pause: true,
      };
    case "startSnake":
      return { ...state, startMiniGame: true, miniGame: "snake", pause: true };
    case "startBreakout":
      return {
        ...state,
        startMiniGame: true,
        miniGame: "breakout",
        pause: true,
      };
    default:
      return JSON.parse(JSON.stringify(state));
  }
};

export default finalFightReducer;
