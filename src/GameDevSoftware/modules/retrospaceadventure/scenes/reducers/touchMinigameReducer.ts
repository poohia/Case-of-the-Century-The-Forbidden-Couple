import { getRandomInt } from "../utils";

export type TouchMinigameReducerState = {
  startAnimation: boolean;
  top: number;
  left: number;
  animationDuration: number;
  nbGoalClicked: number;
  nbClicked: number;
  isWin: boolean;
  isLoose: boolean;
};

export type TouchMinigameReducerAction =
  | "restartAnimation"
  | "generatePoint"
  | "gameIsLoose";

export const touchMinigameDefaultState: TouchMinigameReducerState = {
  startAnimation: true,
  top: getRandomInt(10, 80),
  left: getRandomInt(10, 80),
  animationDuration: 3,
  nbGoalClicked: 7,
  nbClicked: 0,
  isWin: false,
  isLoose: false,
};

export const touchMiniGameDevState: TouchMinigameReducerState = {
  ...touchMinigameDefaultState,
  top: getRandomInt(10, 80),
  left: getRandomInt(10, 80),
  animationDuration: 1000,
  nbGoalClicked: 3,
};

export const touchMiniGameTutorialState: TouchMinigameReducerState = {
  ...touchMinigameDefaultState,
  top: getRandomInt(10, 80),
  left: getRandomInt(10, 80),
  animationDuration: 5,
  nbGoalClicked: 5,
};

export const touchMiniGameLevel2State: TouchMinigameReducerState = {
  ...touchMinigameDefaultState,
  top: getRandomInt(10, 80),
  left: getRandomInt(10, 80),
  animationDuration: 2.5,
  nbGoalClicked: 12,
};

export const touchMiniGameLevel3State: TouchMinigameReducerState = {
  ...touchMinigameDefaultState,
  top: getRandomInt(10, 80),
  left: getRandomInt(10, 80),
  animationDuration: 1.5,
  nbGoalClicked: 15,
};

const touchMinigameReducer = (
  state: TouchMinigameReducerState,
  action: TouchMinigameReducerAction
): TouchMinigameReducerState => {
  if (state.nbClicked + 1 >= state.nbGoalClicked) {
    return { ...state, isWin: true, nbClicked: state.nbGoalClicked };
  }
  switch (action) {
    case "gameIsLoose":
      return { ...state, isLoose: true };
    case "restartAnimation":
      return { ...state, startAnimation: false };
    case "generatePoint":
      return {
        ...state,
        startAnimation: true,
        nbClicked: state.nbClicked + 1,
        top: getRandomInt(10, 80),
        left: getRandomInt(10, 80),
      };
  }
};

export default touchMinigameReducer;
