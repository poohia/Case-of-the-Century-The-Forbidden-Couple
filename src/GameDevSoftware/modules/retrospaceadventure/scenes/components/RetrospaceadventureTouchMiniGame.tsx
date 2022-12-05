import { useContext, useEffect, useReducer } from "react";
import styled from "styled-components";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import { GameReducerActionData } from "../reducers/gameReducer";
import touchMinigameReducer, {
  touchMinigameDefaultState,
  TouchMinigameReducerState,
} from "../reducers/touchMinigameReducer";

const RetrospaceadventureTouchMiniGameContainer = styled.div`
  background: black;
  height: 100%;
  width: 70%;
  align-self: center;
  position: relative;
  @keyframes reduce {
    from {
      width: 160%;
      height: 160%;
      background: green;
    }
    to {
      width: 100%;
      height: 100%;
      background: red;
    }
  }
`;

const RetrospaceadventureTouchMiniGameTargetContainer = styled.div<{
  state: TouchMinigameReducerState;
}>`
  position: absolute;
  top: ${({ state: { top } }) => top}%;
  left: ${({ state: { left } }) => left}%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:before {
    content: "";
    background: green;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    width: 160%;
    height: 160%;
    animation-duration: ${({ state: { animationDuration } }) =>
      animationDuration}s;
    ${({ state: { startAnimation } }) =>
      startAnimation &&
      `
      animation-name: reduce;
      width: 100%; 
      height: 100%;
    `}
  }
`;

const RetrospaceadventureTouchMiniGameTarget = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  z-index: 1;
`;

const RetrospaceadventureTouchMiniGameInfo = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 10px;
  margin-top: 2px;
  > div {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: white;
    float: left;
    margin-right: 3px;
    margin-top: 3px;
  }
`;

let clicked = false;
let timeOut: NodeJS.Timeout;

const RetrospaceadventureTouchMiniGame: React.FC = () => {
  const { dispatchGame } = useContext(RetrospaceadventureGameContext);
  const [state, dispatch] = useReducer(
    touchMinigameReducer,
    touchMinigameDefaultState
  );

  const {
    startAnimation,
    animationDuration,
    isWin,
    isLoose,
    nbClicked,
    nbGoalClicked,
  } = state;

  useEffect(() => {
    if (startAnimation) {
      clicked = false;
      timeOut = setTimeout(() => {
        if (!clicked) {
          dispatch("gameIsLoose");
        }
      }, animationDuration * 500);
    }
  }, [startAnimation, animationDuration]);

  useEffect(() => {
    if (isWin) {
      dispatchGame({
        type: "resultMinigame",
        data: { howWin: "win" } as GameReducerActionData,
      });
    }
    if (isLoose) {
      dispatchGame({
        type: "resultMinigame",
        data: { howWin: "loose" } as GameReducerActionData,
      });
    }
  }, [isWin, isLoose, dispatchGame]);

  return (
    <RetrospaceadventureTouchMiniGameContainer>
      <RetrospaceadventureTouchMiniGameInfo>
        <div />
        <span>x{nbGoalClicked - nbClicked}</span>
      </RetrospaceadventureTouchMiniGameInfo>
      <RetrospaceadventureTouchMiniGameTargetContainer
        state={state}
        className={
          startAnimation
            ? "animate__animated animate__zoomIn animate__faster"
            : ""
        }
        onClick={() => {
          clearTimeout(timeOut);
          clicked = true;
          dispatch("restartAnimation");
          setTimeout(() => dispatch("generatePoint"));
        }}
      >
        <RetrospaceadventureTouchMiniGameTarget />
      </RetrospaceadventureTouchMiniGameTargetContainer>
    </RetrospaceadventureTouchMiniGameContainer>
  );
};

export default RetrospaceadventureTouchMiniGame;
