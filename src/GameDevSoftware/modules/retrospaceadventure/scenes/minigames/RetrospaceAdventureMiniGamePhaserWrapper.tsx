/**
 * 19 * 19 = 361 ( possibilitées du snake ) / 2 = 180

896x424 donne 29 * 14 =  406 possibilitées ( bien pour le breakout )

796x324 donne 26 * 10 = 260 ( bien pour le snake et bossfight!)


696x324 donne 23 * 10 = 230 ( peut être mieux encore pour le snake )
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Phaser from "phaser";
import styled from "styled-components";
import { useGameProvider } from "../../../../../gameProvider";
import { useAssets } from "../../../../../hooks";
import BreakOutGame from "./BreakOutGame";
import {
  MiniGameProps,
  PhaserGameProps,
  RetrospaceadventureGamePhaserScene,
  MiniGames
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
  // display: flex;
  // justify-content: center;
  // align-items: center;
  visibility: ${({ showGame }) => (showGame ? "visible" : "hidden")};
  canvas {
    // max-width: ${({ maxWidth }) => maxWidth}px;
    // max-height: ${({ maxHeight }) => maxHeight}px;
    margin: 0 !important;
    z-index: 1;
    border-radius: 7px !important;
  }
  video {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    object-fit: fill;
    // max-width: ${({ maxWidth }) => maxWidth}px;
    // max-height: ${({ maxHeight }) => maxHeight}px;
  }
`;

const useSizeMiniGame = () => {
  const { getValueFromConstant } = useConstants();

  const getSize = useCallback((miniGame: MiniGames) => {
    switch (miniGame) {
      case "snake":
        return getValueFromConstant<[number, number]>("retrospaceadventure_width_height_minigame_snake");
      case "bossfight":
        return getValueFromConstant<[number, number]>("retrospaceadventure_width_height_minigame_bossfight");
      case "breakout":
        return getValueFromConstant<[number, number]>("retrospaceadventure_width_height_minigame_breakout");
      default:
        return [896, 424]
    }

  }, []);
  return getSize
}

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
  const getSize = useSizeMiniGame();

  const [maxWidth, maxHeight] = useMemo(
    () =>
      getSize(minigame),
    []
  );
  console.log("🚀 ~ file: RetrospaceAdventureMiniGamePhaserWrapper.tsx:99 ~ maxWidth, maxHeight:", maxWidth, maxHeight)

  useEffect(() => {
    if (phaserGameContainer.current && !gameIsLoaded) {
      setGameIsLoaded(true);
      if (minigame === "touchgame") return;
      let s;
      // if (width > maxWidth) {
      //   width = maxWidth;
      // }
      // if (height > maxHeight) {
      //   height = maxHeight;
      // }
      const props: PhaserGameProps = {
        getAsset,
        width: maxWidth,
        height: maxHeight,
        // width: phaserGameContainer.current.clientWidth,
        // height: phaserGameContainer.current.clientHeight,
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
    />
  );
};

export default RetrospaceAdventureMiniGamePhaserWrapper;
