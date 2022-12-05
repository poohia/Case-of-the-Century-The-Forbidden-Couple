import styled from "styled-components";
import { useGameProvider } from "../../../../gameProvider";
import { PageComponent, TranslationComponent } from "../../../../components";
import languages from "../../../languages.json";
import { useAssets } from "../../../../hooks";

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
  bottom: 20px;
  right: 60px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ParamsContainerRow = styled.div`
  display: flex;
  div {
    margin-right: 10px;
    span {
      margin: 2px;
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
  } = useGameProvider();
  const { getAssetImg } = useAssets();

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
            <div>
              <TranslationComponent id="parameters_activate_sound" />:
            </div>
            <div>
              <TranslationComponent id="label_yes" />
              <TranslationComponent id="label_no" />
            </div>
          </ParamsContainerRow>
          <ParamsContainerRow>
            <div>
              <TranslationComponent id="parameters_activate_vibration" />:
            </div>
            <div>
              <TranslationComponent id="label_yes" />
              <TranslationComponent id="label_no" />
            </div>
          </ParamsContainerRow>
          <ParamsContainerRow>
            <div>
              <TranslationComponent id="parameters_activate_languages" />:
            </div>
            <div>
              {languages.map(({ code }) => (
                <label key={code}>
                  {code}
                  <input
                    type="radio"
                    name="locale"
                    checked={locale === code}
                    onClick={() => switchLanguage(code)}
                  />
                </label>
              ))}
            </div>
          </ParamsContainerRow>
        </ParamsContainer>
      </HomeContainer>
    </PageComponent>
  );
};

export default Home;
