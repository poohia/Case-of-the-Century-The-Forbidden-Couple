import { useCallback, useEffect, useMemo, useState } from "react";

import LocalStorage from "@awesome-cordova-library/localstorage";
import styled from "styled-components";

import { useGameProvider } from "../../../../gameProvider";
import {
  ImgComponent,
  PageComponent,
  AnimationImgsComponent,
  ImgBackgroundComponent,
  ButtonClassicGroupComponent,
} from "../../../../components";
import TitleComponent from "../components/TitleComponent";
import TextVersionComponent from "../components/TextVersionComponent";
import ModalParametersComponent from "../../../../components/ModalComponent/ModalParametersComponent";
import { ButtonClassicType } from "../../../../components/ButtonClassicComponent";
import ModalGameConfigurationComponent from "../../../../components/ModalComponent/ModalParametersComponent/ModalGameConfigurationComponent";
import { useScenes } from "../../../../hooks";
import { HomeSceneProps } from "../../../game-types";
import {
  PaperSheet,
  PaperSheetLayout,
  PaperSheetTitle,
} from "../components/PaperSheetComponent";

const HomeContainer = styled.div`
  position: relative;
  height: 100%;
  z-index: 1;

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

const HomeLayout = styled.div`
  position: relative;
  height: 100%;
  z-index: 1;
`;

// Le menu occupe presque toute la vue sur mobile et tablette, et reste
// centré sur les écrans plus grands
const HomeSheet = styled(PaperSheet)`
  max-width: 760px;
  /* min-height: 90vh; */
  height: 100%;
  max-height: 657px;
`;

const HomeSheetHeader = styled(PaperSheetTitle)`
  padding-bottom: 14px;
  border-bottom: 3px double ${({ theme }) => theme.colors.textdark};

  @media (max-height: 480px) {
    padding-bottom: 8px;
  }
`;

const HomeSheetButtons = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 18px 4px 4px;
  --button-action-group-button-flex-basis: 100%;

  /* centré quand ça tient, défilable depuis le haut sinon */
  > div {
    max-width: 400px;
    margin: auto;
  }

  button {
    margin: 0;
  }

  /* écran peu haut: boutons sur deux colonnes */
  @media (max-height: 640px) {
    --button-action-group-button-flex-basis: 47%;

    > div {
      max-width: 860px;
    }
  }

  @media (max-height: 480px) {
    padding-top: 12px;
  }
`;

const HomeSheetFooter = styled.footer`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: ${({ theme }) => theme.game_configuration.footer_border_top};
  font-size: clamp(0.85rem, 0.75rem + 0.4vw, 1rem);

  > div {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  @media (max-height: 480px) {
    margin-top: 8px;
    padding-top: 8px;

    img {
      width: 32px;
    }
  }
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
    game: { currentScene },
    canContinue,
    openParameters,
    dialogIsOpen,
    parameters: { screenReaderEnabled },
    startNewGame: startNewGameProvider,
    startGame,
    playMusic,
    releaseAllMusic,
    getValueFromConstant,
    getEnvVar,
    push,
    clearGameData,
    getSaves,
    deleteSave,
    confirm,
    setOpenParameters,
  } = useGameProvider();

  const { findSceneByType } = useScenes();

  const homeScene = useMemo(
    () => findSceneByType<HomeSceneProps>("HomeScene")![0],
    []
  );

  const byScenes = useMemo(() => {
    return homeScene.byScenes.find((bScene) =>
      bScene.scenes
        .map((s) => s.replace("@s:", ""))
        .includes(currentScene.toString())
    );
  }, []);

  const startNewGame = useCallback(
    (forceSceneId?: number) => {
      getSaves().forEach((save) => {
        if (save.title?.startsWith("interrogatoire_")) {
          deleteSave(save.id);
        }
      });
      startNewGameProvider(forceSceneId);
    },
    [getSaves, deleteSave]
  );

  const [showButtons, setShowButtons] = useState<boolean>(false);
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
      {
        key: "credits",
        idText: "label_credits",
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
        confirm({
          title: "label_start_game",
          message: "label_start_game_warning",
        }).then((confirmation) => {
          if (confirmation) {
            startNewGame(1);
          }
        });
        break;
      case "continue":
        startGame();
        break;
      case "parameters":
        setOpenParameters(true);
        break;
      case "delete_database":
        clearGameData({ includeGameAlreadyEndedOnce: true });
        break;
      case "credits":
        // La route "credits" marque la partie comme terminée: on transmet
        // l'état actuel pour que la page crédits le remette en place
        push("credits", {
          fromHome: true,
          gameEnded: LocalStorage.getItem("game-ended"),
          gameAlreadyEndedOnce: LocalStorage.getItem("game-already-ended-once"),
        });
        break;
      case "saves":
        push("saves");
        break;
    }
  }, []);

  useEffect(() => {
    if (byScenes) {
      releaseAllMusic(byScenes.music).then(() => {
        playMusic({
          sound: byScenes.music,
        });
      });
    } else {
      playMusic({
        sound: "main_music.mp3",
      });
    }
  }, [byScenes]);

  useEffect(() => {
    if (!canContinue) {
      const timeout = setTimeout(() => {
        setBlur(4);
        setTimeout(() => {
          setShowConfigurationGame(true);
        }, 2000);
      }, 4000);
      return () => {
        clearTimeout(timeout);
      };
    } else {
      const timeout = setTimeout(
        () => {
          setBlur(4);
        },
        screenReaderEnabled ? 0 : 4000
      );
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [canContinue, screenReaderEnabled, disableGameConfiguration]);

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
      <PageComponent>
        <ImgBackgroundComponent
          src="VIEUX-480px-COUL-64--poids-609-Ko.gif"
          forceMaxSize={false}
          blur={blur}
        />
        <HomeContainer>
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
    <PageComponent>
      <AnimationImgsComponent
        imgs={byScenes!.backgroundImages.map((b) => b.image.replace("@a:", ""))}
        isBackground
        forceMaxSize={false}
        blur={blur}
      />
      <HomeLayout inert={openParameters || dialogIsOpen ? "" : undefined}>
        {blur > 0 && (
          <PaperSheetLayout className="animate__animated animate__fadeIn">
            <HomeSheet>
              <HomeSheetHeader>
                <TitleComponent
                  titleId1="game_title_1"
                  titleId2="game_title_2"
                  onAnimationFinished={() => {
                    setShowButtons(true);
                  }}
                />
              </HomeSheetHeader>
              <HomeSheetButtons>
                <ButtonClassicGroupComponent
                  buttons={buttonsAction}
                  show={showButtons}
                  onClick={handleClickButtonAction}
                  direction="row"
                />
              </HomeSheetButtons>
              <HomeSheetFooter>
                <TextVersionComponent />
                <div>
                  <a
                    href={xcom.link}
                    target="_blank"
                    className="animate__animated animate__bounceIn"
                    rel="noreferrer"
                    aria-label="X"
                  >
                    <HomeFooterIcon src={xcom.img} />
                  </a>
                  <a
                    href={discord.link}
                    target="_blank"
                    className="animate__animated animate__bounceIn"
                    rel="noreferrer"
                    aria-label="Discord"
                  >
                    <HomeFooterIcon src={discord.img} />
                  </a>
                </div>
              </HomeSheetFooter>
            </HomeSheet>
          </PaperSheetLayout>
        )}
      </HomeLayout>
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
