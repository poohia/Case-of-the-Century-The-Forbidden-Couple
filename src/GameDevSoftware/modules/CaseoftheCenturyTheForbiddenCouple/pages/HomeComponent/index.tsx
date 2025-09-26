import styled, { ThemeProvider } from "styled-components";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useGameProvider } from "../../../../../gameProvider";
import { PageComponent } from "../../../../../components";
import TitleComponent from "../../components/TitleComponent";
import { globalTheme } from "../../theme";
import { ButtonClassicType } from "../../types";
import ButtonClassicGroupComponent from "../../components/ButtonClassicGroupComponent";
import ModalParametersComponent from "../../modals/ModalParametersComponent";

import "animate.css";
import TextVersionComponent from "../../components/TextVersionComponent";

const HomeContainer = styled.div<{
  backgroundUrl: string;
}>`
  position: relative;
  height: 100%;
  background: url(${(props) => props.backgroundUrl}) no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;

  justify-content: center;
  gap: 20px;

  box-sizing: border-box;

  > div {
    &:nth-child(1) {
    }
    &:nth-child(2) {
    }
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
`;

const HomeComponent = () => {
  const {
    canContinue,
    parameters,
    startNewGame,
    startGame,
    playMusic,
    releaseAllMusic,
    getAssetFromConstant,
    setParamsValue,
    getEnvVar,
    push,
  } = useGameProvider();

  const [showButtons, setShowButtons] = useState<boolean>(false);
  const [openParameters, setOpenParameters] = useState<boolean>(false);

  const showSaves = useMemo(
    () => getEnvVar<boolean>("ENABLE_SAVES") || false,
    []
  );

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
    return buttons;
  }, [canContinue, showSaves]);

  const backgroundUrl = useMemo(
    () => getAssetFromConstant("image_background_home", "image") as string,
    []
  );

  const handleClickButtonAction = useCallback((key: string) => {
    switch (key) {
      case "start_game":
        startNewGame();
        break;
      case "continue":
        startGame();
        break;
      case "parameters":
        setOpenParameters(true);
        break;
      case "saves":
        push("saves");
        break;
    }
  }, []);

  useEffect(() => {
    releaseAllMusic("main_music.mp3").then(() => {
      playMusic({
        sound: "main_music.mp3",
      });
    });
  }, []);

  // set default parameters
  useEffect(() => {
    if (parameters.textScrolling === undefined) {
      setParamsValue("textScrolling", "0");
    }
  }, []);

  return (
    <ThemeProvider theme={{ ...globalTheme }}>
      <PageComponent maxSize={{ width: 1920, height: 1080 }}>
        <HomeContainer backgroundUrl={backgroundUrl}>
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
          <HomeFooter>
            <TextVersionComponent />
          </HomeFooter>
        </HomeContainer>
        <ModalParametersComponent
          open={openParameters}
          onClose={() => {
            setOpenParameters(false);
          }}
        />
      </PageComponent>
    </ThemeProvider>
  );
};

export default HomeComponent;
