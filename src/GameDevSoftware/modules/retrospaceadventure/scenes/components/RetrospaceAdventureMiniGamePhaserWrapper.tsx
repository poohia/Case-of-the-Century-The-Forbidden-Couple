import Phaser from "phaser";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useGameProvider } from "../../../../../gameProvider";
import { useAssets } from "../../../../../hooks";
import BreakOutGame from "../phaserjs/BreakOutGame";
import { MiniGameProps } from "../types";

const RetrospaceAdventureMiniGamePhaserContainer = styled.div<
  Pick<MiniGameProps, "showGame">
>`
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
  const canvasContainer = useRef<HTMLDivElement>(null);
  const { getAssetImg, getConfigurationFile } = useAssets();
  const { preloadSound, playSound } = useGameProvider();

  useEffect(() => {
    if (canvasContainer && canvasContainer.current && !gameIsLoaded) {
      setGameIsLoaded(true);
      const {
        current: { clientWidth: width, clientHeight: height },
      } = canvasContainer;
      if (minigame === "touchgame") return;
      let scene;
      switch (minigame) {
        case "breakout":
          scene = new BreakOutGame({
            breakoutImage: getAssetImg("breakout.png"),
            breakoutConfig: getConfigurationFile("breakout.json"),
            width,
            height,
            difficulty,
            onWin,
            onLoose,
            loadSound: preloadSound,
            playSound,
          });
          break;
      }

      new Phaser.Game({ ...scene.config(), scene });
    }
  }, [canvasContainer, gameIsLoaded]);

  return (
    <RetrospaceAdventureMiniGamePhaserContainer
      id="phasergamecontent"
      showGame={showGame}
      ref={canvasContainer}
    />
  );
};

export default RetrospaceAdventureMiniGamePhaserWrapper;
