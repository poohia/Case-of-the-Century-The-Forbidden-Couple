import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useGameProvider } from "../../../../../gameProvider";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import { GameReducerActionData } from "../reducers/gameReducer";
import { MiniGameProps, MiniGames } from "../types";
import { randomFromArray, calculPercent } from "../utils";
import RetrospaceAdventureMiniGamePhaserWrapper from "../minigames/RetrospaceAdventureMiniGamePhaserWrapper";
import RetrospaceadventureTouchMiniGame from "../minigames/RetrospaceadventureTouchMiniGame";
import ProgressBar from "./styled/ProgressBar";
import { TranslationComponent } from "../../../../../components";

export const RetrospaceadventureMiniGameContainer = styled.div`
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
      width: 90%;
      height: 90%;
      background: red;
    }
  }
`;

const RetrospaceadventureMiniGameWrapper: React.FC = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const { saveData, getData, getEnvVar } = useGameProvider();
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
    const activateMinigame = getEnvVar<boolean>("ACTIVATE_MINIGAME");
    const forceLevelMinigame = getEnvVar<MiniGameProps["difficulty"]>(
      "MINIGAME_FORCE_LEVEL"
    );
    if (forceLevelMinigame) {
      return forceLevelMinigame;
    }
    if (!activateMinigame) {
      return "dev";
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
        return RetrospaceAdventureMiniGamePhaserWrapper;
    }
  }, [minigame]);

  return (
    <RetrospaceadventureMiniGameContainer>
      {!loaded && (
        <LoadingComponent
          minigame={minigame}
          difficulty={difficulty}
          onFinish={() => setLoaded(true)}
        />
      )}
      <GameComponent {...miniGameProps} />
    </RetrospaceadventureMiniGameContainer>
  );
};

const LoadingComponentContainer = styled.div`
  background: black;
  color: white;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: center;
  align-items: center;
`;

type LoadingComponentProps = {
  minigame: MiniGames;
  difficulty: MiniGameProps["difficulty"];
  onFinish: () => void;
};

const LoadingComponent: React.FC<LoadingComponentProps> = ({
  minigame,
  difficulty,
  onFinish,
}) => {
  const [progress, setProgress] = useState<number>(0);

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
    if (progress === 100) {
      setTimeout(onFinish, 1000);
    }
  }, [progress]);

  return (
    <LoadingComponentContainer className="animate__animated animate__zoomIn">
      <div>
        <h1>
          <TranslationComponent
            id={`retrospaceadventure_minigame_${minigame}`}
          />
        </h1>
      </div>
      <div>
        <h2>
          <TranslationComponent id="label_difficulty" />:{" "}
          <TranslationComponent id={`retrospaceadventure_${difficulty}`} />
        </h2>
      </div>
      <ProgressBar progress={progress} />
    </LoadingComponentContainer>
  );
};

export default RetrospaceadventureMiniGameWrapper;
