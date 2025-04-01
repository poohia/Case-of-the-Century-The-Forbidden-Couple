import { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import { RobotComponentContainer } from "../styled";
import { useGameProvider } from "../../../../../../../gameProvider";
import { useAssets, useVibrate } from "../../../../../../../hooks";
import { RobotGame, RobotGameProps } from "./RobotGame";

type RobotComponentProps = {
  enableHit: boolean;
  hitRobot: () => void;
};

const RobotComponent: React.FC<RobotComponentProps> = (props) => {
  const { enableHit, hitRobot } = props;
  const phaserGameContainer = useRef<HTMLDivElement>(null);

  const { playSound, preloadSound } = useGameProvider();
  const { getAsset } = useAssets();
  const { oneTap, success, echec } = useVibrate();

  const [gameIsLoaded, setGameIsLoaded] = useState<boolean>(false);
  const [phaserGame, setPhaserGame] = useState<Phaser.Game | null>(null);
  const [scene, setScene] = useState<RobotGame | null>(null);

  useEffect(() => {
    if (phaserGameContainer.current && !gameIsLoaded) {
      setGameIsLoaded(true);
      const props: RobotGameProps = {
        getAsset,
        width: phaserGameContainer.current.clientWidth,
        height: phaserGameContainer.current.clientHeight,
        difficulty: "level2",
        loadSound: preloadSound,
        playSound,
        hitVibration: oneTap,
        hitRobot,
      };
      const s = new RobotGame(props);
      setPhaserGame(new Phaser.Game({ ...s.config(), scene: s }));
      setScene(s);
    }
  }, [phaserGameContainer]);

  useEffect(() => {
    if (scene?.created) {
      scene.setEnableHit(enableHit);
    }
  }, [enableHit]);

  return (
    <RobotComponentContainer
      id="phaserrobotgamecontent"
      ref={phaserGameContainer}
    />
  );
};

export default RobotComponent;
