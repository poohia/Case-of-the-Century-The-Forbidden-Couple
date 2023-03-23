import { useEffect, useMemo, useRef, useState } from "react";
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
import { useConstants } from "../../../../../gameProvider/hooks";
import VideoComponent from "../../../../../components/VideoComponent";
import BossFightGame from "./BossFightGame";

const RetrospaceAdventureMiniGamePhaserContainer = styled.div<
  Pick<MiniGameProps, "showGame"> & { maxWidth: number; maxHeight: number }
>`
  // background: #03e3fc;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${({ showGame }) => (showGame ? "visible" : "hidden")};
  canvas {
    max-width: ${({ maxWidth }) => maxWidth}px;
    max-height: ${({ maxHeight }) => maxHeight}px;
    margin: 0 !important;
    z-index: 1;
  }
  video {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    object-fit: fill;
    max-width: ${({ maxWidth }) => maxWidth}px;
    max-height: ${({ maxHeight }) => maxHeight}px;
  }
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
  const { getAsset, getAssetVideo } = useAssets();
  const { playSound, preloadSound } = useGameProvider();
  const { getValueFromConstant } = useConstants();

  const [maxWidth, maxHeight] = useMemo(
    () =>
      getValueFromConstant("retrospaceadventure_max_width_height_minigames"),
    []
  );

  useEffect(() => {
    if (phaserGameContainer.current && !gameIsLoaded) {
      setGameIsLoaded(true);
      let {
        current: { clientWidth: width, clientHeight: height },
      } = phaserGameContainer;
      if (minigame === "touchgame") return;
      let s;
      if (width > maxWidth) {
        width = maxWidth;
      }
      if (height > maxHeight) {
        height = maxHeight;
      }
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
        case "bossfight":
          s = new BossFightGame(props);
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
      maxHeight={maxHeight}
      maxWidth={maxWidth}
      ref={phaserGameContainer}
    >
      <VideoComponent src={getAssetVideo("tv-old.mp4")} autoPlay loop={false} />
    </RetrospaceAdventureMiniGamePhaserContainer>
  );
};

export default RetrospaceAdventureMiniGamePhaserWrapper;
