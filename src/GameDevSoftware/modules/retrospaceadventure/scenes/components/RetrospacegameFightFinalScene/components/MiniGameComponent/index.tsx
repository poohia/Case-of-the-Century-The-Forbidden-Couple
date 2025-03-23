import { useCallback, useEffect, useRef, useState } from "react";

import { MiniGameProps, MiniGames } from "../../../../types";
import { RetrospaceadventureMiniGameContainer } from "./styles";
import ModalComponent from "../../../styled/Modal";
import { useGameProvider } from "../../../../../../../../gameProvider";
import { TranslationComponent } from "../../../../../../../../components";
import HomePageGame from "./HomePageGame";
import LoadingComponent from "./LoadingComponent";
import RetrospaceAdventureMiniGamePhaserWrapper from "../../../../minigames/RetrospaceAdventureMiniGamePhaserWrapper";

type MiniGameComponentProps = {
  miniGame: MiniGames;
  onLoose: () => void;
  onWin: () => void;
};

const MiniGameComponent: React.FC<MiniGameComponentProps> = ({
  miniGame,
  onLoose,
  onWin,
}) => {
  const refParentContainer = useRef<HTMLDivElement>(null);
  const refModalContainer = useRef<HTMLDivElement>(null);
  const refModalFooterContainer = useRef<HTMLDivElement>(null);

  const [homePagae, setHomePage] = useState<boolean>(true);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);

  const { innerHeight, innerWidth, platform, saveData, getData, getEnvVar } =
    useGameProvider();

  const difficulty =
    getEnvVar<MiniGameProps["difficulty"]>("MINIGAME_FORCE_LEVEL") || "level2";

  const updateSize = useCallback(() => {
    if (refParentContainer.current) {
      setWidth(refParentContainer.current.clientWidth - 20);
      setHeight(refParentContainer.current.clientHeight - 20);
    }
  }, [refParentContainer]);

  useEffect(() => {
    if (refParentContainer.current) {
      updateSize();
    }
  }, [refParentContainer, innerHeight, innerWidth, updateSize]);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 400);
  }, []);

  return (
    <RetrospaceadventureMiniGameContainer
      className={"animate__animated animate__bounceIn animate__faster"}
      ref={refParentContainer}
    >
      <ModalComponent
        preset="game"
        width={width}
        height={height}
        refParentContainer={refParentContainer}
        refChildren={refModalContainer}
        refFooterContainer={refModalFooterContainer}
        show={show}
      ></ModalComponent>
      <div ref={refModalContainer}>
        {homePagae && (
          <HomePageGame miniGame={miniGame} onPlay={() => setHomePage(false)} />
        )}
        {!homePagae && !loaded && (
          <LoadingComponent onFinish={() => setLoaded(true)} />
        )}
        {show && (
          <RetrospaceAdventureMiniGamePhaserWrapper
            difficulty={difficulty}
            minigame={miniGame}
            onLoose={onLoose}
            onWin={onWin}
            showGame={loaded}
          />
        )}
      </div>
      <div ref={refModalFooterContainer}>
        <div>
          <TranslationComponent
            id={`retrospaceadventure_minigame_${miniGame}`}
          />
        </div>

        <div>
          <TranslationComponent id={`retrospaceadventure_${difficulty}`} />
        </div>
      </div>
    </RetrospaceadventureMiniGameContainer>
  );
};

export default MiniGameComponent;
