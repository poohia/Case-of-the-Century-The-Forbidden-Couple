import styled from "styled-components";
import { useEffect } from "react";
import { useGameProvider } from "../../../../gameProvider";
import { PageComponent } from "../../../../components";
import languages from "../../../languages.json";
import RetrospaceadventureButtonComponent from "../scenes/components/styled/RetrospaceadventureButtonComponent";
import config from "../../../../config.json";
import RetrospaceadventureButtonImgComponent from "../scenes/components/styled/RetrospaceadventureButtonImgComponent";
import "animate.css";
import { useAssets } from "../../../../hooks";
import VideoComponent from "../../../../components/VideoComponent";

const HomeContainer = styled.div`
  height: 100vh;
  color: white;
  overflow-y: hidden;

  // background: url("assets/images/backgroundprimary.png");
  background: black;
  background-size: contain;

  img {
    cursor: pointer;
  }
  > div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }
  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const ActionsContainer = styled.div`
  padding: 20px;
  display: flex;
  width: 80%;
  border-radius: 10px;
  // flex-direction: column;
  align-items: center;
  justify-content: space-around;
  // > button {
  //   margin-bottom: 20px;
  // }
  > div {
    width: 40%;
  }
`;

const ParamsContainer = styled.div`
  position: absolute;
  bottom: 10px;
  right: calc(var(--sar) + 10px);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ParamsContainerRow = styled.div`
  display: flex;
`;

const ParamsIconsContainer = styled.div`
  display: flex;
  height: 32px;
  img {
    width: 24px;
    height: 24px;
    transition: all 0.2s ease-in-out;
    &:first-child {
      margin-right: 10px;
    }
    &.active {
      width: 32px;
      height: 32px;
    }
  }
`;

const VersionInfo = styled.div`
  position: absolute;
  bottom: 10px;
  left: calc(var(--sal) + 10px);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 0.8rem;
  font-style: italic;
`;

const Home = () => {
  const {
    canContinue,
    parameters: { activedSound, activatedVibration, locale },
    isMobileDevice,
    startNewGame,
    startGame,
    switchLanguage,
    setActivatedSound,
    setActivatedVibration,
    playSoundWithPreload,
    pauseAllSoundExcept,
    setPrimaryFont,
    translateText,
  } = useGameProvider();
  const { getAssetVideo } = useAssets();

  useEffect(() => {
    setPrimaryFont("Audiowide");
    pauseAllSoundExcept("LaserGroove.mp3").then(() => {
      playSoundWithPreload("LaserGroove.mp3", 1);
    });
  }, []);

  return (
    <PageComponent>
      <HomeContainer>
        <VideoComponent loop={false} autoPlay={false} muted preload="metadata">
          <source
            src={`${getAssetVideo("backgroundvideo.mp4")}#t=0.1`}
            type="video/mp4"
          />
        </VideoComponent>
        <div>
          <ActionsContainer>
            <RetrospaceadventureButtonComponent
              fluid
              onClick={() => startNewGame()}
              text={translateText("label_start")}
            />
            <RetrospaceadventureButtonComponent
              fluid
              onClick={() => startGame()}
              direction="secondary"
              text={translateText("label_continue")}
              disabled={!canContinue}
            />
            {/* <img
            onClick={() => canContinue && startGame()}
            src={getAssetImg("startbtn.png")}
            alt="continue game"
          /> */}
          </ActionsContainer>
          <ParamsContainer>
            <ParamsContainerRow>
              <ParamsIconsContainer>
                {languages.map(({ code }) => (
                  <RetrospaceadventureButtonImgComponent
                    image={`${code}.png`}
                    alt="flag france"
                    className={locale === code ? "active" : ""}
                    onClick={() => switchLanguage(code)}
                    key={`langauge-code-${code}`}
                  />
                ))}
              </ParamsIconsContainer>
            </ParamsContainerRow>
            <ParamsContainerRow>
              <ParamsIconsContainer>
                <RetrospaceadventureButtonImgComponent
                  image={"soundon.png"}
                  className={activedSound ? "active" : ""}
                  alt="icon sound on"
                  onClick={() => setActivatedSound(true)}
                />
                <RetrospaceadventureButtonImgComponent
                  image={"soundoff.png"}
                  className={activedSound ? "" : "active"}
                  alt="icon sound off"
                  onClick={() => setActivatedSound(false)}
                />
              </ParamsIconsContainer>
            </ParamsContainerRow>
            {isMobileDevice && (
              <ParamsContainerRow>
                <ParamsIconsContainer>
                  <RetrospaceadventureButtonImgComponent
                    image={"vibrationon.png"}
                    className={activatedVibration ? "active" : ""}
                    alt="icon vibration on"
                    onClick={() => setActivatedVibration(true)}
                  />
                  <RetrospaceadventureButtonImgComponent
                    image={"vibrationoff.png"}
                    className={activatedVibration ? "" : "active"}
                    alt="icon vibration off"
                    onClick={() => setActivatedVibration(false)}
                  />
                </ParamsIconsContainer>
              </ParamsContainerRow>
            )}
          </ParamsContainer>
          <VersionInfo>
            Version {config.build.version} - Proof of concept
          </VersionInfo>
        </div>
      </HomeContainer>
    </PageComponent>
  );
};

export default Home;
