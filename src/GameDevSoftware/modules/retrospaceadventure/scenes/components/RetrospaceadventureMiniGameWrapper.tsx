import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useGameProvider } from "../../../../../gameProvider";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import { GameReducerActionData } from "../reducers/gameReducer";
import { MiniGameProps, MiniGames } from "../types";
import { randomFromArray, calculPercent } from "../utils";
import RetrospaceAdventureMiniGamePhaserWrapper from "./RetrospaceAdventureMiniGamePhaserWrapper";
import RetrospaceadventureTouchMiniGame from "./RetrospaceadventureTouchMiniGame";
import ProgressBar from "./styled/ProgressBar";

export const RetrospaceadventureMiniGameContainer = styled.div`
  background: black;
  height: 100%;
  width: 70%;
  align-self: center;
  border-radius: 10px;
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
  const minigames: MiniGames[] = useMemo(() => ["touchgame", "breakout"], []);
  const minigame = useMemo(() => randomFromArray(minigames), [minigames]);
  const {
    Enemy,
    Hero,
    stateGame: { nbTurn, turn },
    dispatchGame,
  } = useContext(RetrospaceadventureGameContext);
  const { saveData, getData, getEnvVar } = useGameProvider();

  const tableName = useMemo(
    () => `retrospace-adventure-${minigame}`,
    [minigame]
  );

  const firstMinigame = useMemo(() => {
    return getData(tableName);
  }, [tableName]);

  const difficulty = useMemo((): MiniGameProps["difficulty"] => {
    const activateMinigame = getEnvVar<boolean>("ACTIVATE_MINIGAME");
    if (!activateMinigame) {
      return "dev";
    }
    if (!firstMinigame) {
      saveData(tableName, { firstMinigame: true });
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
  }, [firstMinigame, Enemy, turn]);

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

  const GameComponent = useCallback(() => {
    switch (minigame) {
      case "touchgame":
        return <RetrospaceadventureTouchMiniGame {...miniGameProps} />;
      case "breakout":
        return <RetrospaceAdventureMiniGamePhaserWrapper {...miniGameProps} />;
    }
  }, [minigame, miniGameProps]);

  return (
    <RetrospaceadventureMiniGameContainer>
      {!loaded && (
        <LoadingComponent
          minigame={minigame}
          difficulty={difficulty}
          onFinish={() => setLoaded(true)}
        />
      )}
      <GameComponent />
    </RetrospaceadventureMiniGameContainer>
  );
};

const LoadingComponentContainer = styled.div`
  background: black;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
        <h1>{minigame}</h1>
      </div>
      <div>
        <h2>Difficulty: {difficulty}</h2>
      </div>
      <ProgressBar progress={progress} />
    </LoadingComponentContainer>
  );
};

export default RetrospaceadventureMiniGameWrapper;
