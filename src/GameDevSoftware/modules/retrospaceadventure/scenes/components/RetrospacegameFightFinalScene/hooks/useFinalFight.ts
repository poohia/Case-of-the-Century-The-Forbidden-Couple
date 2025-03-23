import { useCallback, useEffect, useReducer } from "react";

import { UseFinalFightDataProps } from "..";
import { useGameObjects } from "../../../../../../../hooks";
import { RetrospaceadventureCharacter } from "../../../types";
import finalFightReducer, {
  finalFightDefaultState,
} from "../finalFightReducer";

type UseFinalFightProps = Pick<UseFinalFightDataProps, "enemy" | "hero">;

const useFinalFight = (props: UseFinalFightProps) => {
  const { enemy, hero } = props;
  const { getGameObject } = useGameObjects();

  const characterEnemy = getGameObject<RetrospaceadventureCharacter>(enemy);
  const characterHero = getGameObject<RetrospaceadventureCharacter>(hero);
  const [state, dispatch] = useReducer(
    finalFightReducer,
    finalFightDefaultState
  );

  useEffect(() => {
    console.log("i'm here state action", state.action);
    switch (state.action) {
      case "startGame":
        setTimeout(() => {
          dispatch("selectMiniGame");
        }, 1200);
        break;
    }
  }, [state.action]);

  useEffect(() => {
    setTimeout(() => {
      dispatch("startGame");
    }, 100);
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch("startGame");
  //     // setInterval(() => {
  //     //   dispatch("hitHeroChoice");
  //     // }, 700);
  //     setTimeout(() => {
  //       dispatch("selectChoice");
  //     }, 1200);
  //   }, 100);
  // }, []);

  // useEffect(() => {
  //   // if (state.heroLife === 0) {
  //   //   dispatch("startGame");
  //   // }
  // }, [state.heroLife]);

  const handleStartMiniGame = useCallback((value: string) => {
    switch (value) {
      case "breakout":
        dispatch("startBreakout");
        break;
      case "snake":
        dispatch("startSnake");
        break;
      case "bossfight":
        dispatch("startBossfight");
        break;
    }
  }, []);

  const handleOnWinMinigame = useCallback(() => {
    dispatch("init");
    setTimeout(() => {
      dispatch("startGame");
    }, 1000);
  }, []);

  return {
    characterEnemy,
    characterHero,
    ...state,
    handleStartMiniGame,
    handleOnWinMinigame,
  };
};

export default useFinalFight;
