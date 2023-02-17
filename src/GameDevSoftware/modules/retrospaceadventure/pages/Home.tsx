import styled from "styled-components";
import { useEffect } from "react";
import { useGameProvider } from "../../../../gameProvider";
import { PageComponent, TranslationComponent } from "../../../../components";
import languages from "../../../languages.json";
import RetrospaceadventureButtonComponent from "../scenes/components/styled/RetrospaceadventureButtonComponent";
import config from "../../../../config.json";
import RetrospaceadventureButtonImgComponent from "../scenes/components/styled/RetrospaceadventureButtonImgComponent";
import "animate.css";

const HomeContainer = styled.div`
  height: 100vh;
  color: white;
  overflow-y: hidden;

  // background: url("assets/images/backgroundprimary.png");
  background: black;
  background-size: contain;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    cursor: pointer;
  }
`;

const ActionsContainer = styled.div`
  padding: 20px;
  display: flex;
  width: 30%;
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
  > button {
    margin-bottom: 20px;
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
    startNewGame,
    startGame,
    switchLanguage,
    setActivatedSound,
    pauseAllSound,
    playSoundWithPreload,
    setBackgroundColor,
    translateText,
  } = useGameProvider();

  useEffect(() => {
    pauseAllSound();
    // setBackgroundColor(`url("${getAssetImg("backgroundprimary.png")}")`);
  }, []);

  return (
    <PageComponent>
      <HomeContainer>
        <ActionsContainer>
          <RetrospaceadventureButtonComponent
            fluid
            onClick={() => startNewGame()}
          >
            <TranslationComponent id="label_start" />
          </RetrospaceadventureButtonComponent>
          <RetrospaceadventureButtonComponent fluid onClick={() => startGame()}>
            <TranslationComponent id="label_continue" />
          </RetrospaceadventureButtonComponent>
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
          {/* <ParamsContainerRow>
            <div>
              <TranslationComponent id="parameters_activate_vibration" />:
            </div>
            <div>
              <TranslationComponent id="label_yes" />
              <TranslationComponent id="label_no" />
            </div>
          </ParamsContainerRow> */}
        </ParamsContainer>
        <VersionInfo>
          Version {config.build.version} - Proof of concept
        </VersionInfo>
      </HomeContainer>
    </PageComponent>
  );
};

export default Home;
