import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import TextHackedEffectComponent from "react-text-hacked";

import { useGameProvider } from "../../../../../gameProvider";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import { GameReducerActionData } from "../reducers/gameReducer";
import { MiniGameProps, MiniGames } from "../types";
import { randomFromArray, calculPercent } from "../utils";
import RetrospaceAdventureMiniGamePhaserWrapper from "../minigames/RetrospaceAdventureMiniGamePhaserWrapper";
import RetrospaceadventureTouchMiniGame from "../minigames/RetrospaceadventureTouchMiniGame";
import ProgressBar from "./styled/ProgressBar";
import { TranslationComponent } from "../../../../../components";
import ModalComponent from "./styled/Modal";
import { useAssets, useVibrate } from "../../../../../hooks";
import VideoComponent from "../../../../../components/VideoComponent";
import ChatGPTTypewriterEffect from "react-chatgpt-typewriter";

export const RetrospaceadventureMiniGameContainer = styled.div`
  height: 100%;
  width: 70%;
  align-self: center;
  // position: relative;
  position: absolute;
  top: 5%;
  left: 10%;
  width: 80%;
  z-index: 9;
  height: 90%;
  @keyframes reduce {
    from {
      width: 160%;
      height: 160%;
      background: green;
    }
    to {
      width: 90%;
      height: 90%;
      background: red;
    }
  }
  > div {
    position: absolute;
    visibility: hidden;
    &:last-child {
      display: flex;
      justify-content: space-between;
    }
  }
`;

const RetrospaceadventureMiniGameWrapper: React.FC = () => {
  const [homePagae, setHomePage] = useState<boolean>(true);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const { innerHeight, innerWidth, saveData, getData, getEnvVar } =
    useGameProvider();
  const forceMiniGame = useMemo(
    () => getEnvVar<MiniGames | boolean>("FORCE_MINI_GAME"),
    []
  );

  const {
    Enemy,
    Hero,
    stateGame: { nbTurn, turn },
    dispatchGame,
  } = useContext(RetrospaceadventureGameContext);

  const tableName = useMemo(() => `retrospace-adventure-minigames`, []);

  const minigamesPlayed = useMemo(() => {
    return getData<string[]>(tableName) || [];
  }, [tableName]);

  const minigames: MiniGames[] = useMemo(() => {
    if (typeof forceMiniGame === "string") {
      return [forceMiniGame];
    }
    const mgame: MiniGames[] = [];
    Enemy.minigames?.forEach((m) => {
      if (!minigamesPlayed.includes(m)) {
        mgame.push(m);
      }
    });
    if (mgame.length > 0) return mgame;
    if (Enemy.minigames) return Enemy.minigames;
    return [];
  }, [Enemy, minigamesPlayed, forceMiniGame]);

  const minigame = useMemo(() => {
    return randomFromArray(minigames);
  }, [minigames]);

  const difficulty = useMemo((): MiniGameProps["difficulty"] => {
    const forceLevelMinigame = getEnvVar<MiniGameProps["difficulty"]>(
      "MINIGAME_FORCE_LEVEL"
    );
    if (forceLevelMinigame) {
      return forceLevelMinigame;
    }

    if (!minigamesPlayed.find((game) => game === minigame)) {
      saveData(tableName, minigamesPlayed.concat(minigame));
      return "tutorial";
    }
    const percentLifeEnemy = calculPercent(Enemy.life, Enemy.baseLife);
    const percentTurn = calculPercent(turn, nbTurn);

    if (percentLifeEnemy < 20 || Enemy.life <= Hero.laser || percentTurn > 70) {
      return "level3";
    }
    if (percentLifeEnemy <= 50 || percentTurn > 40) {
      return "level2";
    }

    return "level1";
  }, [minigamesPlayed, minigame, Enemy, turn]);

  const handleWin = useCallback(() => {
    dispatchGame({
      type: "resultMinigame",
      data: { howWin: "win" } as GameReducerActionData,
    });
  }, [dispatchGame]);
  const handleLoose = useCallback(() => {
    dispatchGame({
      type: "resultMinigame",
      data: { howWin: "loose" } as GameReducerActionData,
    });
  }, [dispatchGame]);

  const miniGameProps = useMemo(
    () => ({
      difficulty,
      showGame: loaded,
      minigame,
      onWin: handleWin,
      onLoose: handleLoose,
    }),
    [difficulty, loaded, minigame, handleWin, handleLoose]
  );

  const GameComponent = useMemo(() => {
    switch (minigame) {
      case "touchgame":
        return RetrospaceadventureTouchMiniGame;
      case "breakout":
      case "snake":
      case "bossfight":
        return RetrospaceAdventureMiniGamePhaserWrapper;
    }
  }, [minigame]);

  const [show, setShow] = useState<boolean>(false);
  const [showWithAnimation, setShowWithAnimation] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setShowWithAnimation(false);
      setShow(true);
    }, 400);
  }, []);
  const refParentContainer = useRef<HTMLDivElement>(null);
  const refModalContainer = useRef<HTMLDivElement>(null);
  const refModalFooterContainer = useRef<HTMLDivElement>(null);

  const updateSize = useCallback(() => {
    if (refParentContainer.current) {
      setWidth(refParentContainer.current.clientWidth - 20);
      setHeight(refParentContainer.current.clientHeight - 20);
    }
  }, [refParentContainer]);

  useEffect(() => {
    if (refParentContainer.current) {
      updateSize();
    }
  }, [refParentContainer, innerHeight, innerWidth, updateSize]);

  return (
    <RetrospaceadventureMiniGameContainer
      className={
        showWithAnimation
          ? "animate__animated animate__bounceIn animate__faster"
          : ""
      }
      ref={refParentContainer}
    >
      <ModalComponent
        preset="game"
        width={width}
        height={height}
        refParentContainer={refParentContainer}
        refChildren={refModalContainer}
        refFooterContainer={refModalFooterContainer}
        show={show}
      ></ModalComponent>
      <div ref={refModalContainer}>
        {homePagae && (
          <HomePageGame miniGame={minigame} onPlay={() => setHomePage(false)} />
        )}
        {!homePagae && !loaded && (
          <LoadingComponent onFinish={() => setLoaded(true)} />
        )}
        {show && <GameComponent {...miniGameProps} />}
      </div>
      <div ref={refModalFooterContainer}>
        <div>
          <TranslationComponent
            id={`retrospaceadventure_minigame_${minigame}`}
          />
        </div>

        <div>
          <TranslationComponent id={`retrospaceadventure_${difficulty}`} />
        </div>
      </div>
    </RetrospaceadventureMiniGameContainer>
  );
};

const HomePageGameContainer = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  > div {
    flex: 1;
    width: 100%;

    &:nth-child(1) {
      padding: 10px;
      video {
        width: 100%;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    p {
      cursor: pointer;
      margin: 40px 0;
    }
    }
    .home-page-text-description{
      padding: 5px;
      line-height: 30px;
      overflow-y: auto;
      height: 100%;
      p{
        margin: 0;
      }
    }
  }
`;

const HomePageGame: React.FC<{ miniGame: MiniGames; onPlay: () => void }> = ({
  miniGame,
  onPlay,
}) => {
  console.log(
    "🚀 ~ file: RetrospaceadventureMiniGameWrapper.tsx:261 ~ miniGame:",
    miniGame
  );
  const { getAssetVideo } = useAssets();
  const { isMobileDevice, translateText } = useGameProvider();
  const { oneTap } = useVibrate();
  const [showDescription, setShowDescription] = useState<boolean>(false);

  const tutorialText = useMemo(
    () =>
      isMobileDevice
        ? translateText(
            `retrospaceadventure_minigame_${miniGame}_description_mobile`
          )
        : translateText(
            `retrospaceadventure_minigame_${miniGame}_description_computer`
          ),
    [isMobileDevice, miniGame, translateText]
  );

  return (
    <HomePageGameContainer>
      <div>
        <VideoComponent
          src={getAssetVideo(`${miniGame}-tutorial.mp4`)}
          loop
          autoPlay
        />
      </div>
      {!showDescription && (
        <div>
          <p
            onClick={() => {
              oneTap();
              onPlay();
            }}
          >
            &gt;&nbsp;
            <TranslationComponent id="label_play" />
          </p>
          <p
            onClick={() => {
              oneTap();
              setShowDescription(true);
            }}
          >
            &gt;&nbsp;
            <TranslationComponent id="retrospaceadventure_how_to_play" />
          </p>
        </div>
      )}
      {showDescription && (
        <div className="home-page-text-description">
          <ChatGPTTypewriterEffect delay={50} text={tutorialText} />
          <p
            onClick={() => {
              oneTap();
              setShowDescription(false);
            }}
          >
            &gt;&nbsp;
            <TranslationComponent id="label_close" />
          </p>
        </div>
      )}
    </HomePageGameContainer>
  );
};

const LoadingComponentContainer = styled.div<{}>`
  color: white;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  // display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: center;
  align-items: center;
  > div {
    // background: #03e3fc;
    background: transparent;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 7px;
  }
  canvas {
    // width: 100%;
    // height: 100%;
  }
  video {
    position: absolute;
    width: 100%;
    height: 97%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    object-fit: fill;
    border-radius: 7px;
  }
`;

type LoadingComponentProps = {
  onFinish: () => void;
};

const LoadingComponent: React.FC<LoadingComponentProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState<number>(0);
  const { translateText, playSound } = useGameProvider();

  useEffect(() => {
    setTimeout(() => {
      const timeOut = setInterval(
        () =>
          setProgress((_progress) => {
            if (_progress >= 100) {
              clearInterval(timeOut);
              return 100;
            }
            if (_progress > 30) {
              return _progress + 10;
            }
            if (_progress > 60) {
              return _progress + 20;
            }
            if (_progress < 100) {
              return _progress + 5;
            }
            return 100;
          }),
        100
      );
    }, 500);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      playSound("mixkit-glitch-communication-sound-1034.mp3", 0);
    }, 500);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(onFinish, 1000);
    }
  }, [progress]);

  return (
    <LoadingComponentContainer>
      <div>
        <div>
          {progress > 0 && (
            <h1>
              <TextHackedEffectComponent
                defaultText={translateText("label_loading")}
                timeOut={40}
                startAfterTimer={100}
              />
            </h1>
          )}
        </div>
        <ProgressBar progress={progress} />
      </div>
    </LoadingComponentContainer>
  );
};

export default RetrospaceadventureMiniGameWrapper;
