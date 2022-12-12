import Phaser from "phaser";
import { useEffect, useRef } from "react";
import SimpleGame from "../phaserjs/SimpleGame";
import { RetrospaceadventureMiniGameContainer } from "./RetrospaceadventureMiniGameWrapper";

const RetrospaceAdventureMiniGamePhaserWrapper: React.FC = () => {
  const canvasContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (canvasContainer && canvasContainer.current) {
      const { current } = canvasContainer;
      console.log(
        "🚀 ~ file: RetrospaceAdventureMiniGamePhaserWrapper.tsx:12 ~ useEffect ~ current",
        current.clientWidth,
        current.clientHeight
      );

      let config: Phaser.Types.Core.GameConfig = {
        parent: "phasergamecontent",
        scale: {
          width: current.clientWidth,
          height: current.clientHeight,
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        scene: new SimpleGame({
          logo: "assets/retrospaceadventure/images/alien1_idle.png",
        }),
      };
      new Phaser.Game(config);
    }
  }, [canvasContainer]);

  return (
    <RetrospaceadventureMiniGameContainer
      id="phasergamecontent"
      ref={canvasContainer}
    />
  );
};

export default RetrospaceAdventureMiniGamePhaserWrapper;
