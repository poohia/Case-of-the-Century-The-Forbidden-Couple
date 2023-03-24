import { useEffect, useMemo, useReducer, useState } from "react";
import styled from "styled-components";
import { useAssets } from "../../../../../hooks";
import touchMinigameReducer, {
  touchMinigameDefaultState,
  touchMiniGameDevState,
  touchMiniGameLevel2State,
  touchMiniGameLevel3State,
  TouchMinigameReducerState,
  touchMiniGameTutorialState,
} from "../reducers/touchMinigameReducer";
import { MiniGameProps } from "../types";
import { useGameProvider } from "../../../../../gameProvider";
import { SpriteComponent } from "../../../../../components";
import { useConstants } from "../../../../../gameProvider/hooks";

export const RetrospaceadventureReactJSMiniGameContainer = styled.div<{
  maxWidth: number;
  maxHeight: number;
}>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    position: relative;
    width: 100%;
    height: 100%;
    background: #2d2d2d;
    background: black;
    max-width: ${({ maxWidth }) => maxWidth}px;
    max-height: ${({ maxHeight }) => maxHeight}px;
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
      width: 90%; 
      height: 90%;
    `}
  }
  img {
    width: 40px;
    height: 40px;
    z-index: 1;
    cursor: pointer;
  }
`;

const RetrospaceadventureTouchMiniGameInfo = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 10px;
  margin-top: 2px;
  > img {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    float: left;
    margin-right: 3px;
    margin-top: 3px;
  }
`;

let clicked = false;
let timeOut: NodeJS.Timeout;

const RetrospaceadventureTouchMiniGame: React.FC<MiniGameProps> = (props) => {
  const { difficulty, showGame, onLoose, onWin } = props;
  const [showPlanet, setShowPlanet] = useState<boolean>(true);
  const [explosionAnimation, setExplosionAnimation] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const { getAssetImg } = useAssets();
  const { preloadSound, playSound } = useGameProvider();
  const { getValueFromConstant } = useConstants();

  const [maxWidth, maxHeight] = useMemo(
    () =>
      getValueFromConstant("retrospaceadventure_max_width_height_minigames"),
    []
  );

  const stateReducerFromDifficulty = useMemo(() => {
    switch (difficulty) {
      case "dev":
        return touchMiniGameDevState;
      case "tutorial":
        return touchMiniGameTutorialState;
      case "level2":
        return touchMiniGameLevel2State;
      case "level3":
        return touchMiniGameLevel3State;
      case "level1":
      default:
        return touchMinigameDefaultState;
    }
  }, [difficulty]);

  const [state, dispatch] = useReducer(
    touchMinigameReducer,
    stateReducerFromDifficulty
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
      setShowPlanet(false);
      setTimeout(() => {
        onWin();
      }, 30 * 18);
    }
  }, [isWin, onWin]);

  useEffect(() => {
    if (isLoose) onLoose();
  }, [isLoose, onLoose]);

  useEffect(() => {
    if (showGame) dispatch("startGame");
  }, [showGame]);

  useEffect(() => {
    preloadSound("explode.mp3", 0.7);
  }, [preloadSound]);

  if (!showGame) return <></>;

  return (
    <RetrospaceadventureReactJSMiniGameContainer
      maxWidth={maxWidth}
      maxHeight={maxHeight}
    >
      <div>
        {explosionAnimation && (
          <SpriteComponent
            width={65}
            timeBeetweenSprite={20}
            image="spriteexplosion.png"
            maxFrame={23}
            style={{
              position: "absolute",
              top: `${explosionAnimation.top}%`,
              left: `${explosionAnimation.left}%`,
            }}
            onFinish={() => setExplosionAnimation(null)}
          />
        )}
        <RetrospaceadventureTouchMiniGameInfo>
          <img src={getAssetImg("mars.png")} alt="" />
          <span>x{nbGoalClicked - nbClicked}</span>
        </RetrospaceadventureTouchMiniGameInfo>
        {showPlanet && (
          <RetrospaceadventureTouchMiniGameTargetContainer
            state={state}
            className={
              startAnimation
                ? "animate__animated animate__zoomIn animate__faster"
                : ""
            }
          >
            <img
              src={getAssetImg("mars.png")}
              onClick={() => {
                clearTimeout(timeOut);
                clicked = true;
                dispatch("restartAnimation");
                setTimeout(() => {
                  setExplosionAnimation({
                    top: state.top - 4,
                    left: state.left - 4,
                  });
                  dispatch("generatePoint");
                });
                // playSoundWithPreload("explode.mp3", 0.7, false, 0);
                playSound("explode.mp3", 0);
              }}
              alt=""
            />
          </RetrospaceadventureTouchMiniGameTargetContainer>
        )}
      </div>
    </RetrospaceadventureReactJSMiniGameContainer>
  );
};

export default RetrospaceadventureTouchMiniGame;
