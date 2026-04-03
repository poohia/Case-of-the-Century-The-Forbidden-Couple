import styled from "styled-components";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useGameProvider } from "../../../../../gameProvider";
import {
  ImgComponent,
  PageComponent,
  AnimationImgsComponent,
  ImgBackgroundComponent,
  ButtonClassicGroupComponent,
} from "../../../../../components";
import TitleComponent from "../../components/TitleComponent";

import "animate.css";
import TextVersionComponent from "../../components/TextVersionComponent";
import ModalParametersComponent from "../../../../../components/ModalComponent/ModalParametersComponent";
import { ButtonClassicType } from "../../../../../components/ButtonClassicComponent";
import ModalGameConfigurationComponent from "../../../../../components/ModalComponent/ModalParametersComponent/ModalGameConfigurationComponent";

const HomeContainer = styled.div<{
  $blur: number;
}>`
  position: relative;
  height: 100%;
  backdrop-filter: blur(${(p) => p.$blur}px);
  -webkit-backdrop-filter: blur(${(p) => p.$blur}px);

  transition:
    backdrop-filter 700ms ease,
    -webkit-backdrop-filter 700ms ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;

  justify-content: center;
  gap: 20px;

  box-sizing: border-box;

  > div {
    &:nth-child(1) {
      z-index: 9;
    }
    &:nth-child(2) {
      z-index: 9;
    }
  }
  &:after {
    content: "";
    position: fixed; /* reste en bas même si on scrolle */
    left: 0;
    right: 0;
    bottom: 0;
    height: 200px; /* hauteur du dégradé */
    pointer-events: none; /* n’empêche pas les clics */
    background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
  }
`;

const HomeButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;

  overflow-y: auto;

  padding: 10px;

  button {
    margin: 0;
  }
`;

const HomeFooter = styled.div`
  position: absolute;
  bottom: 10px;
  left: clamp(10px, var(--sal), 30px);
  display: flex;
  color: white;
  display: flex;
  align-items: center;
  z-index: 9;
`;

const HomeFooterRight = styled(HomeFooter)`
  left: unset;
  right: clamp(10px, var(--sar), 30px);
`;

const HomeFooterIcon = styled(ImgComponent)`
  width: 42px;
  cursor: pointer;
  margin-right: 4px;
  /* box-shadow:
    rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
  border-radius: 50%;
  padding: 4px; */
`;

const HomeComponent = () => {
  const {
    canContinue,
    startNewGame,
    startGame,
    playMusic,
    releaseAllMusic,
    getValueFromConstant,
    getEnvVar,
    push,
    clearGameData,
  } = useGameProvider();

  const [showButtons, setShowButtons] = useState<boolean>(false);
  const [openParameters, setOpenParameters] = useState<boolean>(false);
  const [blur, setBlur] = useState<number>(0);

  const showSaves = useMemo(() => getEnvVar("ENABLE_SAVES") || false, []);
  const showClearDatabase = useMemo(
    () => getEnvVar("ENABLE_CLEAR_DATABASE") || false,
    []
  );
  const disableGameConfiguration = useMemo(
    () => getEnvVar("DISABLE_GAME_CONFIGURATION") || false,
    []
  );
  const [showConfigurationGame, setShowConfigurationGame] = useState<
    null | boolean
  >(disableGameConfiguration ? false : null);

  const buttonsAction = useMemo<ButtonClassicType[]>(() => {
    const buttons = [
      {
        key: "start_game",
        idText: "label_start_game",
        animate: true,
      },
      {
        key: "continue",
        idText: "label_continue",
        disabled: !canContinue,
        animate: true,
      },
      {
        key: "parameters",
        idText: "parameters_title",
        animate: true,
      },
    ];
    if (showSaves) {
      buttons.push({
        key: "saves",
        idText: "label_saves",
        animate: true,
      });
    }
    if (showClearDatabase) {
      buttons.push({
        key: "delete_database",
        idText: "Supprimer les donées de jeu",
        animate: true,
      });
    }
    return buttons;
  }, [canContinue, showSaves, showClearDatabase]);

  const discord = useMemo(
    () => ({
      link: getValueFromConstant("discord_link"),
      img: "discord.png",
    }),
    []
  );

  const xcom = useMemo(
    () => ({
      link: getValueFromConstant("x_link"),
      img: "xcom.png",
    }),
    []
  );

  const handleClickButtonAction = useCallback((key: string) => {
    switch (key) {
      case "start_game":
        startNewGame(1);
        break;
      case "continue":
        startGame();
        break;
      case "parameters":
        setOpenParameters(true);
        break;
      case "delete_database":
        clearGameData({ includeGameAlreadyEndedOnce: true });
        alert("Relancer le jeu pour revoir l'intro et éviter tout bug");
        break;
      case "saves":
        push("saves");
        break;
    }
  }, []);

  useEffect(() => {
    releaseAllMusic("Visual Novel_Menu_1803.mp3").then(() => {
      playMusic({
        sound: canContinue
          ? "Visual Novel_Menu_1803.mp3"
          : "Visual Novel_C1_Voiture_V2_1903.mp3",
      });
    });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBlur(4);
      setTimeout(() => {
        setShowConfigurationGame(true);
      }, 2000);
    }, 2500);
    return () => {
      clearTimeout(timeout);
    };
  }, [canContinue, disableGameConfiguration]);

  useEffect(() => {
    if (showConfigurationGame === false && !canContinue) {
      const timeout = setTimeout(() => {
        startNewGame();
      }, 2500);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [showConfigurationGame, canContinue]);

  if (!canContinue) {
    return (
      <PageComponent maxSize={{ width: 1920, height: 1080 }}>
        <ImgBackgroundComponent src="VIEUX-480px-COUL-64--poids-609-Ko.gif" />
        <HomeContainer $blur={blur}>
          {blur > 0 && (
            <>
              <TitleComponent
                titleId1="game_title_1"
                titleId2="game_title_2"
                onAnimationFinished={() => {
                  setShowButtons(true);
                }}
              />
            </>
          )}
        </HomeContainer>
        <ModalGameConfigurationComponent
          open={!!showConfigurationGame}
          onClose={() => {
            setShowConfigurationGame(false);
          }}
        />
      </PageComponent>
    );
  }

  return (
    <PageComponent maxSize={{ width: 1920, height: 1080 }}>
      <AnimationImgsComponent
        imgs={[
          "COMMISSARIAT LUMIERE 1.webp",
          "COMMISSARIAT LUMIERE 2.webp",
          "COMMISSARIAT LUMIERE 3.webp",
          "COMMISSARIAT LUMIERE 4.webp",
        ]}
        isBackground
      />
      <HomeContainer $blur={blur}>
        {blur > 0 && (
          <>
            <TitleComponent
              titleId1="game_title_1"
              titleId2="game_title_2"
              onAnimationFinished={() => {
                setShowButtons(true);
              }}
            />

            <HomeButtonsContainer>
              <ButtonClassicGroupComponent
                buttons={buttonsAction}
                show={showButtons}
                onClick={handleClickButtonAction}
              />
            </HomeButtonsContainer>
          </>
        )}
        <HomeFooter>
          <TextVersionComponent />
        </HomeFooter>
        <HomeFooterRight>
          <a
            href={xcom.link}
            target="_blank"
            className="animate__animated animate__bounceIn animate__delay-2s"
            rel="noreferrer"
          >
            <HomeFooterIcon src={xcom.img} />
          </a>
          <a
            href={discord.link}
            target="_blank"
            className="animate__animated animate__bounceIn animate__delay-2s"
            rel="noreferrer"
          >
            <HomeFooterIcon src={discord.img} />
          </a>
        </HomeFooterRight>
      </HomeContainer>
      <ModalParametersComponent
        open={openParameters}
        onClose={() => {
          setOpenParameters(false);
        }}
      />
    </PageComponent>
  );
};

export default HomeComponent;
