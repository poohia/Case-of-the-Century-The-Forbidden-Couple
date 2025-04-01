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
import { useAssets, useVibrate } from "../../../../../hooks";
import BreakOutGame from "./BreakOutGame";
import {
  MiniGameProps,
  PhaserGameProps,
  RetrospaceadventureGamePhaserScene,
  MiniGames,
  TurnStatus,
} from "../types";
import SnakeGame from "./SnakeGame";
import BossFightGame from "./BossFightGame";
import {
  ImgComponent,
  ImgFromSpriteComponent,
  TranslationComponent,
} from "../../../../../components";

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

const RetrospaceAdventureMiniGamePhaserResumeContainer = styled.div`
  width: 100%;
  display: flex;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    &:nth-child(1) {
      flex-basis: 45%;
    }
    &:nth-child(2) {
      position: relative;
      flex-basis: 55%;
      color: black;
      font-size: 1.5rem;
      span {
        z-index: 1;
        position: relative;
        bottom: 5%;
      }
      img {
        width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
`;

const useSizeMiniGame = () => {
  const { getValueFromConstant } = useGameProvider();

  const getSize = useCallback((miniGame: MiniGames) => {
    switch (miniGame) {
      case "snake":
        return getValueFromConstant<[number, number]>(
          "retrospaceadventure_width_height_minigame_snake"
        );
      case "bossfight":
        return getValueFromConstant<[number, number]>(
          "retrospaceadventure_width_height_minigame_bossfight"
        );
      case "breakout":
        return getValueFromConstant<[number, number]>(
          "retrospaceadventure_width_height_minigame_breakout"
        );
      default:
        return [896, 424];
    }
  }, []);
  return getSize;
};

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
  const [howWin, setHowWinState] = useState<TurnStatus | null>(null);
  const phaserGameContainer = useRef<HTMLDivElement>(null);
  const { getAsset } = useAssets();
  const { playSound, preloadSound } = useGameProvider();
  const getSize = useSizeMiniGame();
  const { oneTap, success, echec } = useVibrate();

  const [maxWidth, maxHeight] = useMemo(() => getSize(minigame), []);

  const setHowWin: React.Dispatch<React.SetStateAction<TurnStatus | null>> =
    useCallback((_howWin) => {
      setTimeout(() => setHowWinState(_howWin), 800);
    }, []);

  useEffect(() => {
    if (phaserGameContainer.current && !gameIsLoaded) {
      setGameIsLoaded(true);
      setTimeout(() => {
        if (minigame === "touchgame") {
          return;
        }
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
          // width: phaserGameContainer.current!.clientWidth,
          // height: phaserGameContainer.current!.clientHeight,
          difficulty,
          onWin: () => setHowWin("win"),
          onLoose: () => setHowWin("loose"),
          loadSound: preloadSound,
          playSound,
          hitVibration: oneTap,
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
      }, 100);
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

  useEffect(() => {
    switch (howWin) {
      case "win":
        success();
        playSound("win.mp3", 0);
        setTimeout(() => onWin(), 2000);
        break;
      case "loose":
        echec();
        playSound("loose.mp3", 0);
        setTimeout(() => onLoose(), 2000);
        break;
      default:
        return;
    }
  }, [howWin]);

  if (howWin !== null) {
    return howWin === "loose" ? (
      <RetrospaceAdventureMiniGamePhaserResumeContainer className="animate__animated animate__zoomIn">
        <div>
          <ImgFromSpriteComponent
            atlasFile="robot_sprites_atlas.json"
            frameName="idle_sprite_3"
            imageFile="robot_sprites.png"
            blockAtMaxSize
            blockAtMinSize
            // responsive
            // center
          />
        </div>
        <div>
          <ImgComponent src="bulle 2.png" />
          <TranslationComponent id="retrospaceadventure_message_fight_info_status_loose" />
        </div>
      </RetrospaceAdventureMiniGamePhaserResumeContainer>
    ) : (
      <RetrospaceAdventureMiniGamePhaserResumeContainer className="animate__animated animate__zoomIn">
        <div>
          <ImgFromSpriteComponent
            atlasFile="robot_sprites_atlas.json"
            frameName="robot_croix"
            imageFile="robot_sprites.png"
            blockAtMaxSize
            blockAtMinSize
            responsive
          />
        </div>
        <div>
          <ImgComponent src="bulle 2.png" />
          <TranslationComponent id="retrospaceadventure_message_fight_info_status_win" />
        </div>
      </RetrospaceAdventureMiniGamePhaserResumeContainer>
    );
  }

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
