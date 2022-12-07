import styled from "styled-components";
import { useGameProvider } from "../../../../gameProvider";
import { PageComponent, TranslationComponent } from "../../../../components";
import languages from "../../../languages.json";
import { useAssets } from "../../../../hooks";
import { useEffect } from "react";

const HomeContainer = styled.div`
  height: 100vh;
  color: white;
  overflow-y: hidden;

  background: url("assets/retrospaceadventure/images/backgroundprimary.png");
  background-size: contain;
  display: flex;
  justify-content: center;
  align-items: center;
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
  right: 30px;
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

const Home = () => {
  const {
    canContinue,
    parameters: { activedSound, activatedVibration, locale },
    startNewGame,
    startGame,
    switchLanguage,
    setActivatedSound,
    stopAllSound,
  } = useGameProvider();
  const { getAssetImg } = useAssets();

  useEffect(() => {
    stopAllSound();
  }, []);

  return (
    <PageComponent>
      <HomeContainer>
        <ActionsContainer>
          <img
            onClick={() => startNewGame()}
            src={getAssetImg("startbtn.png")}
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
                <img
                  src={getAssetImg(`${code}.png`)}
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
                alt="icon sound on"
                className={activedSound ? "active" : ""}
                onClick={() => setActivatedSound(true)}
              />
              <img
                src={getAssetImg("soundoff.png")}
                alt="icon sound off"
                className={activedSound ? "" : "active"}
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
      </HomeContainer>
    </PageComponent>
  );
};

export default Home;
