import styled from "styled-components";
import { useEffect, useMemo, useRef, useState } from "react";

import { useGameProvider } from "../../../../gameProvider";
import {
  ImgComponent,
  PageComponent,
  TranslationComponent,
} from "../../../../components";
import languages from "../../../languages.json";
import "animate.css";
import { useAssets, useVibrate } from "../../../../hooks";
import VideoComponent from "../../../../components/VideoComponent";
import { useConstants } from "../../../../gameProvider/hooks";

const HomeContainer = styled.div<{ backgroundUrl: string }>`
  height: 100%;
  background: url(${(props) => props.backgroundUrl});
  background: url(assets/images/police_station_background.png) no-repeat;
  background-size: cover;
`;

const Home = () => {
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
  const { getAssetVideo, getAssetFromConstant } = useAssets();
  const { getValueFromConstant } = useConstants();
  const [openModalDarkBlueDungeon, setOpenDarkBlueDungeon] =
    useState<boolean>(false);
  const { oneTap, success } = useVibrate();

  const backgroundUrl = useMemo(
    () => getAssetFromConstant("image_background_home", "image"),
    []
  );

  useEffect(() => {
    // preloadSound("buttonclick.mp3", 1, false);
    // pauseAllSoundExcept("LaserGroove.mp3").then(() => {
    //   playSoundWithPreload("LaserGroove.mp3", 1, true, 500);
    // });
  }, []);

  return (
    <PageComponent>
      <HomeContainer backgroundUrl={backgroundUrl}>im here</HomeContainer>
    </PageComponent>
  );
};

export default Home;
