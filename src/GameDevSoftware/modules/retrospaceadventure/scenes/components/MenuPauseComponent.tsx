import styled from "styled-components";
import { ImgComponent, TranslationComponent } from "../../../../../components";
import ComputerModalComponent from "./ComputerModalComponent";
import { useGameProvider } from "../../../../../gameProvider";
import { ParamsContainerRow, ParamsIconsContainer } from "../../pages/Home";
import RetrospaceadventureButtonImgComponent from "./styled/RetrospaceadventureButtonImgComponent";
import { useVibrate } from "../../../../../hooks";
import languages from "../../../../languages.json";

const MenuPauseComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Audiowide;

  > div {
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    &:nth-child(1) {
      margin-top: 0;
      align-items: flex-end;
      flex-direction: row;
      img {
        margin-right: 10px;
        margin-left: 0 !important;
      }
      span {
        margin: 0;
      }
    }
    span {
      margin-bottom: 10px;
    }
    img {
      width: 24px;
      height: 24px;
      &:first-child {
        margin-left: 20px;
      }
    }
  }
`;

const MenuPauseFooterComponentContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  font-family: Audiowide;
  div {
    cursor: pointer;
  }
`;

type MenuPauseComponentProps = {
  open?: boolean;
  onContinue: () => void;
  onBackHome: () => void;
};

const MenuPauseComponent: React.FC<MenuPauseComponentProps> = ({
  open,
  onContinue,
  onBackHome,
}) => {
  const {
    parameters: { activedSound, activatedVibration, locale },
    isMobileDevice,
    switchLanguage,
    setActivatedSound,
    setActivatedVibration,
    playSoundEffect,
  } = useGameProvider();
  const { oneTap } = useVibrate();

  const MenuPauseFooterComponent: React.FC = () => (
    <MenuPauseFooterComponentContainer>
      <div
        onClick={() => {
          oneTap();
          onBackHome();
        }}
      >
        &gt; Retourner à l'écran d'accueil
      </div>
      <div
        onClick={() => {
          oneTap();
          onContinue();
        }}
      >
        &gt; Continuer
      </div>
    </MenuPauseFooterComponentContainer>
  );

  return (
    <ComputerModalComponent
      open={open}
      childrenFooter={MenuPauseFooterComponent({})}
    >
      <MenuPauseComponentContainer>
        <div>
          <ImgComponent src={"menu_icon.png"} width={32} height={32} />
          <TranslationComponent id="label_pause" />
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
                  onClick={() => {
                    playSoundEffect("buttonclick.mp3");
                    oneTap();
                    setActivatedSound(true);
                  }}
                />
                <RetrospaceadventureButtonImgComponent
                  image={"soundoff.png"}
                  className={activedSound ? "" : "active"}
                  alt="icon sound off"
                  onClick={() => {
                    playSoundEffect("buttonclick.mp3");
                    oneTap();
                    setActivatedSound(false);
                  }}
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
                  onClick={() => {
                    playSoundEffect("buttonclick.mp3");
                    oneTap();
                    setActivatedVibration(true);
                  }}
                />
                <RetrospaceadventureButtonImgComponent
                  image={"vibrationoff.png"}
                  className={activatedVibration ? "" : "active"}
                  alt="icon vibration off"
                  onClick={() => {
                    playSoundEffect("buttonclick.mp3");
                    setActivatedVibration(false);
                  }}
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
                onClick={() => {
                  playSoundEffect("buttonclick.mp3");
                  oneTap();
                  switchLanguage(code);
                }}
                key={`langauge-code-${code}`}
              />
            ))}
          </ParamsIconsContainer>
        </div>
      </MenuPauseComponentContainer>
    </ComputerModalComponent>
  );
};

export default MenuPauseComponent;
