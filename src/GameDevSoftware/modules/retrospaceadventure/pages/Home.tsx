import styled from "styled-components";
import { useGameProvider } from "../../../../gameProvider";
import { PageComponent } from "../../../../components";
import languages from "../../../languages.json";
import { useAssets } from "../../../../hooks";
import { useEffect } from "react";
import RetrospaceadventureButtonComponent from "../scenes/components/styled/RetrospaceadventureButtonComponent";
import config from "../../../../config.json";

const HomeContainer = styled.div`
  height: 100vh;
  color: white;
  overflow-y: hidden;

  background: url("assets/images/backgroundprimary.png");
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
  width: 50%;
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
  > img {
    margin: 10px;
    width: 150px;
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
  const { getAssetImg } = useAssets();

  useEffect(() => {
    pauseAllSound();
    // setBackgroundColor(`url("${getAssetImg("backgroundprimary.png")}")`);
  }, []);

  return (
    <PageComponent>
      <HomeContainer>
        <ActionsContainer>
          <RetrospaceadventureButtonComponent
            onClick={() => startNewGame()}
            image={"startbtn.png"}
            alt="start new game"
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
                <RetrospaceadventureButtonComponent
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
              <img
                src={getAssetImg("soundon.png")}
                className={activedSound ? "active" : ""}
                alt="icon sound on"
                onClick={() => setActivatedSound(true)}
              />
              <img
                src={getAssetImg("soundoff.png")}
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
