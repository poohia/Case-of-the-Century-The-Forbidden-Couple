import styled, { ThemeProvider } from "styled-components";
import { useEffect, useMemo, useRef, useState } from "react";

import { useGameProvider } from "../../../../../gameProvider";
import {
  ImgComponent,
  PageComponent,
  TranslationComponent,
} from "../../../../../components";
import languages from "../../../../languages.json";
import "animate.css";
import { useAssets, useVibrate } from "../../../../../hooks";
import VideoComponent from "../../../../../components/VideoComponent";
import { useConstants } from "../../../../../gameProvider/hooks";
import TitleComponent from "../../components/TitleComponent";
import ButtonClassicComponent from "../../components/ButtonClassicComponent";
import { globalTheme } from "../../theme";

const HomeContainer = styled.div<{
  backgroundUrl: string;
}>`
  height: 100%;
  background: url(${(props) => props.backgroundUrl});
  background: url(assets/images/police_station_background.png) no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  justify-content: space-around;
  > div {
    /* flex: 1; */
    &:nth-child(1) {
      /* flex: 2; */
    }
  }
`;

const HomeButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
`;

const HomeComponent = () => {
  const {
    canContinue,
    parameters: { activedSound, activatedVibration, locale },
    isMobileDevice,
    appConfig,
    startNewGame,
    startGame,
    switchLanguage,
    setActivatedSound,
    setActivatedVibration,
    preloadSound,
    playSoundEffect,
    playSoundWithPreload,
    pauseAllSoundExcept,
  } = useGameProvider();
  console.log("🚀 ~ HomeComponent ~ canContinue:", canContinue);
  const { getAssetVideo, getAssetFromConstant } = useAssets();
  const [openModalDarkBlueDungeon, setOpenDarkBlueDungeon] =
    useState<boolean>(false);
  const { oneTap, success } = useVibrate();

  const [showButtons, setShowButtons] = useState<boolean>(false);

  const backgroundUrl = useMemo(
    () => getAssetFromConstant("image_background_home", "image") as string,
    []
  );

  useEffect(() => {
    // preloadSound("buttonclick.mp3", 1, false);
    // pauseAllSoundExcept("LaserGroove.mp3").then(() => {
    //   playSoundWithPreload("LaserGroove.mp3", 1, true, 500);
    // });
  }, []);

  return (
    <ThemeProvider theme={{ ...globalTheme }}>
      <PageComponent>
        <HomeContainer backgroundUrl={backgroundUrl}>
          <TitleComponent
            onAnimationFinished={() => {
              setShowButtons(true);
            }}
          />

          <HomeButtonsContainer>
            <ButtonClassicComponent visible={showButtons}>
              <TranslationComponent id="label_start_game" />
            </ButtonClassicComponent>
            <ButtonClassicComponent
              visible={showButtons}
              disabled={!canContinue}
            >
              <TranslationComponent id="label_continue" />
            </ButtonClassicComponent>
            <ButtonClassicComponent visible={showButtons}>
              <TranslationComponent id="parameters_title" />
            </ButtonClassicComponent>
          </HomeButtonsContainer>
        </HomeContainer>
      </PageComponent>
    </ThemeProvider>
  );
};

export default HomeComponent;
