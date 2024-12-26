import styled from "styled-components";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useGameProvider } from "../../../../gameProvider";
import {
  ImgComponent,
  PageComponent,
  TranslationComponent,
} from "../../../../components";
import languages from "../../../languages.json";
import RetrospaceadventureButtonComponent from "../scenes/components/styled/RetrospaceadventureButtonComponent";
import RetrospaceadventureButtonImgComponent from "../scenes/components/styled/RetrospaceadventureButtonImgComponent";
import "animate.css";
import { useAssets } from "../../../../hooks";
import VideoComponent from "../../../../components/VideoComponent";
import RetrospaceadevntureTutorialComponent from "../scenes/components/RetrospaceadevntureTutorialComponent";
import { TutorialViewType } from "../../../../types";
import { useConstants } from "../../../../gameProvider/hooks";
import ModalComponent from "../scenes/components/styled/Modal";
import ComputerModalComponent from "../scenes/components/ComputerModalComponent";

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
  align-items: center;
  min-height: 24px;
  cursor: pointer;
  span {
    margin-right: 10px;
  }
  img {
    width: 24px;
    height: 24px;
  }
`;

const ParamsIconsContainer = styled.div`
  display: flex;
  height: 32px;
  img {
    width: 24px;
    height: 24px;
    transition: all 0.2s ease-in-out;
    margin-right: 10px;
    cursor: pointer;
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
  align-items: flex-start;
  font-size: 0.8rem;
  font-style: italic;
  > span {
    &:first-child {
      font-style: italic;
      text-decoration: underline;
      cursor: pointer;
      display: flex;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 10px;
      padding-right: 5px;
      img {
        border-radius: 10px;
        margin-right: 5px;
        width: 40px;
      }
    }
  }
`;

const ModalDarkBlueDungeonContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: black;
  text-shadow: none;
  z-index: 9;
`;

const ParamsViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 100%;
  > div {
    display: flex;
    flex-direction: column;
    &:first-child {
      flex-direction: row;
      align-items: center;
      img {
        margin-right: 10px;
      }
      margin-bottom: 20px;
    }
    margin-bottom: 10px;
    > div {
      margin-left: 20px;
      margin-top: 10px;
      align-items: center;
    }
  }
`;

const ModalDarkBlueDungeon: React.FC<{
  open?: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const { platform, playSound } = useGameProvider();
  const refContainer = useRef<HTMLDivElement>(null);
  const { getValueFromConstant } = useConstants();
  const [iosLink, androidLink, computerLink] = getValueFromConstant<string[]>(
    "darkbluedungeon_links"
  );
  const views = useMemo((): TutorialViewType[] => {
    return [
      {
        title: "retrospaceadventure_darkblue_dungeon_title",
        image: "darkbluedungeon-thumbnail.png",
        text: "retrospaceadventure_darkblue_dungeon_description",
        isVideo: false,
        action: {
          text: "Download",
          callback: () => {
            switch (platform) {
              case "android":
                window.open(androidLink);
                break;
              case "ios":
                window.open(iosLink);
                break;
              default:
                window.open(computerLink);
            }
          },
        },
      },
    ];
  }, []);

  if (!open) return <></>;
  return (
    <ModalDarkBlueDungeonContainer ref={refContainer}>
      <RetrospaceadevntureTutorialComponent
        lastIcon="cancel.png"
        views={views}
        refParentContainer={refContainer}
        onClickLastStep={() => {
          playSound("buttonclick.mp3", 0);
          onClose();
        }}
      />
    </ModalDarkBlueDungeonContainer>
  );
};

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
    playSound,
    playSoundWithPreload,
    pauseAllSoundExcept,
    setPrimaryFont,
  } = useGameProvider();
  const { getAssetVideo } = useAssets();
  const [openModalDarkBlueDungeon, setOpenDarkBlueDungeon] =
    useState<boolean>(false);
  const [openParamsModal, setOpenParamsModal] = useState<boolean>(false);

  useEffect(() => {
    setPrimaryFont("Audiowide");
    preloadSound("buttonclick.mp3", 1, false);
    pauseAllSoundExcept("LaserGroove.mp3").then(() => {
      playSoundWithPreload("LaserGroove.mp3", 1);
    });
  }, []);

  const ComponentModalParamsFooter: React.FC = () => {
    return (
      <div
        onClick={() => {
          setOpenParamsModal(false);
        }}
        style={{
          cursor: "pointer",
          alignSelf: "center",
          justifyContent: "center",
          display: "flex",
          width: "100%",
        }}
      >
        <TranslationComponent id="label_confirm" />
      </div>
    );
  };

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
              text={"label_start"}
            />
            <RetrospaceadventureButtonComponent
              fluid
              onClick={() => startGame()}
              direction="secondary"
              text={"label_continue"}
              disabled={!canContinue}
            />
          </ActionsContainer>
          <ParamsContainer>
            <ParamsContainerRow
              onClick={() => {
                setOpenParamsModal(true);
              }}
            >
              <TranslationComponent id="label_settings" />
              <RetrospaceadventureButtonImgComponent
                image={"settings.png"}
                alt="icon vibration on"
              />
            </ParamsContainerRow>
          </ParamsContainer>
          <VersionInfo>
            <span
              onClick={() => {
                playSound("buttonclick.mp3", 0, 1);
                setOpenDarkBlueDungeon(true);
              }}
            >
              <ImgComponent src="darkbluedungeon-thumbnail.png" />
              <TranslationComponent id="retrospaceadventure_darkblue_dungeon_title" />
            </span>
            <br />
            <span>Version {appConfig.build.version} - Proof of concept</span>
          </VersionInfo>
        </div>
      </HomeContainer>
      <ModalDarkBlueDungeon
        open={openModalDarkBlueDungeon}
        onClose={() => setOpenDarkBlueDungeon(false)}
      />
      <ComputerModalComponent
        open={openParamsModal}
        childrenFooter={ComponentModalParamsFooter({})}
      >
        <ParamsViewContainer>
          <div>
            <ImgComponent src={"settings.png"} width={32} height={32} />
            <TranslationComponent id="label_settings" />
          </div>
          <div>
            <TranslationComponent id="parameters_activate_sound" />
            <div>
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
            </div>
          </div>
          {isMobileDevice && (
            <div>
              <TranslationComponent id="parameters_activate_vibration" />
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
            </div>
          )}
          <div>
            <TranslationComponent id="parameters_languages" />
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
          </div>
        </ParamsViewContainer>
      </ComputerModalComponent>
    </PageComponent>
  );
};

export default Home;
