import { useCallback, useContext, useMemo } from "react";
import styled from "styled-components";
import { useGameProvider } from "../../../../../gameProvider";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import { GameReducerActionData } from "../reducers/gameReducer";
import { MiniGameProps } from "../types";
import { randomFromArray, calculPercent } from "../utils";
import RetrospaceadventureTouchMiniGame from "./RetrospaceadventureTouchMiniGame";

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

export const RetrospaceadventureGameLevelInfo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  margin-left: 10px;
  margin-top: 2px;
`;

const RetrospaceadventureMiniGameWrapper: React.FC = () => {
  const minigames: ["touchgame"] = useMemo(() => ["touchgame"], []);
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

  switch (minigame) {
    case "touchgame":
      return (
        <RetrospaceadventureTouchMiniGame
          difficulty={difficulty}
          onWin={handleWin}
          onLoose={handleLoose}
        />
      );
  }
};

export default RetrospaceadventureMiniGameWrapper;
