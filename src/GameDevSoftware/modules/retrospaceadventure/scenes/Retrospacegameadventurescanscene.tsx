// https://www.freepik.com/free-vector/different-aliens-monster-transparent-background_20829475.htm#query=alien%20drawing&position=0&from_view=search
// import AnimatedText from "react-animated-text-content";
import { PageComponent, TranslationComponent } from "../../../../components";
import { useGameProvider } from "../../../../gameProvider";
import { useAssets } from "../../../../hooks";
import { SceneComponentProps } from "../../../../types";
import {
  ActionsContainer,
  ContainerComponent,
  ImageContainer,
  ScannerComponent,
  TextContainer,
} from "./components/RetrospacegameadventuredialogsceneStyledComponents";

import "animate.css";
import useRetrospacegameadventuredialogscene from "./hooks/useRetrospacegameadventuredialogscene";
import RetrospacegameadventureButtonComponent from "./components/RetrospacegameadventureButtonComponent";

export type RetrospacegameadventuredialogsceneProps = SceneComponentProps<
  {},
  {
    textDescriptionAlien: string;
    alien: string;
  }
>;

const Retrospacegameadventurescanscene: RetrospacegameadventuredialogsceneProps =
  (props) => {
    const {
      data: { textDescriptionAlien, alien, _actions },
    } = props;
    const { onScan, scannerRef, scanIsFinish, startScan } =
      useRetrospacegameadventuredialogscene();
    const { pushParameters, translateText, nextScene } = useGameProvider();
    const { getAssetImg } = useAssets();

    return (
      <PageComponent>
        {onScan && (
          <ScannerComponent ref={scannerRef}>
            <div />
          </ScannerComponent>
        )}
        <ContainerComponent>
          <ImageContainer>
            <img src={getAssetImg(alien)} alt="" />
          </ImageContainer>
          {!scanIsFinish && <div />}
          {scanIsFinish && (
            <TextContainer>
              <div>
                {/* <AnimatedText
                  type="chars"
                  interval={0.04}
                  duration={0.8}
                  animation={{
                    y: "100px",
                    ease: "ease",
                    scale: 1.49,
                  }}
                >
                  {translateText(textDescriptionAlien)}
                </AnimatedText> */}
                <p> {translateText(textDescriptionAlien)}</p>
              </div>
              <ActionsContainer>
                {!scanIsFinish && (
                  <RetrospacegameadventureButtonComponent onClick={startScan}>
                    <TranslationComponent id="retrospaceadventure_scan_alien" />
                  </RetrospacegameadventureButtonComponent>
                )}
                {_actions.map((action) => (
                  <RetrospacegameadventureButtonComponent
                    onClick={() => nextScene(action._scene)}
                  >
                    <TranslationComponent id={action._title} />
                  </RetrospacegameadventureButtonComponent>
                ))}
                <RetrospacegameadventureButtonComponent
                  animate={false}
                  onClick={() => pushParameters("scene")}
                >
                  <TranslationComponent id="parameters_title" />
                </RetrospacegameadventureButtonComponent>
              </ActionsContainer>
            </TextContainer>
          )}
        </ContainerComponent>
      </PageComponent>
    );
  };

export default Retrospacegameadventurescanscene;
