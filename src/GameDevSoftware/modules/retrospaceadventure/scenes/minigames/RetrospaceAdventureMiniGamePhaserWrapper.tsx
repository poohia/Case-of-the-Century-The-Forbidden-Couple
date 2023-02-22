import { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import styled from "styled-components";
import { useGameProvider } from "../../../../../gameProvider";
import { useAssets } from "../../../../../hooks";
import BreakOutGame from "./BreakOutGame";
import {
  MiniGameProps,
  PhaserGameProps,
  RetrospaceadventureGamePhaserScene,
} from "../types";
import SnakeGame from "./SnakeGame";

const RetrospaceAdventureMiniGamePhaserContainer = styled.div<
  Pick<MiniGameProps, "showGame">
>`
  background: black;
  width: 100%;
  height: 100%;
  visibility: ${({ showGame }) => (showGame ? "visible" : "hidden")};
`;

const RetrospaceAdventureMiniGamePhaserWrapper: React.FC<MiniGameProps> = ({
  difficulty,
  showGame,
  minigame,
  onWin,
  onLoose,
}) => {
  const [gameIsLoaded, setGameIsLoaded] = useState<boolean>(false);
  const [phaserGame, setPhaserGame] = useState<Phaser.Game | null>(null);
  const [scene, setScene] = useState<RetrospaceadventureGamePhaserScene | null>(
    null
  );
  const phaserGameContainer = useRef<HTMLDivElement>(null);
  const { getAsset } = useAssets();
  const { playSound, preloadSound } = useGameProvider();

  useEffect(() => {
    if (phaserGameContainer.current && !gameIsLoaded) {
      setGameIsLoaded(true);
      const {
        current: { clientWidth: width, clientHeight: height },
      } = phaserGameContainer;
      if (minigame === "touchgame") return;
      let s;
      const props: PhaserGameProps = {
        getAsset,
        width,
        height,
        difficulty,
        onWin,
        onLoose,
        loadSound: preloadSound,
        playSound,
      };
      switch (minigame) {
        case "breakout":
          s = new BreakOutGame(props);
          break;
        case "snake":
          s = new SnakeGame(props);
          break;
      }

      setPhaserGame(new Phaser.Game({ ...s.config(), scene: s }));
      setScene(s);
    }
  }, [phaserGameContainer, gameIsLoaded]);

  useEffect(() => {
    return () => {
      phaserGame?.destroy(false);
    };
  }, [phaserGame]);

  useEffect(() => {
    if (showGame && scene) {
      setTimeout(() => (scene._canStart = true), 200);
    }
  }, [showGame, scene]);

  return (
    <RetrospaceAdventureMiniGamePhaserContainer
      id="phasergamecontent"
      showGame={showGame}
      ref={phaserGameContainer}
    />
  );
};

export default RetrospaceAdventureMiniGamePhaserWrapper;
