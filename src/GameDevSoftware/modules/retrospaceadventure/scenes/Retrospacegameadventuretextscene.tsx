import { Fragment, useEffect } from "react";
// import AnimatedText from "react-animated-text-content";
import { PageComponent, TranslationComponent } from "../../../../components";
import { useGameProvider } from "../../../../gameProvider";
import { SceneComponentProps } from "../../../../types";
import {
  ActionsContainer,
  ContainerComponent,
  IconContainer,
  TextContainer,
} from "./components/RetrospacegameadventuretextsceneComponents";

import "animate.css";
import RetrospacegameadventureButtonComponent from "./components/RetrospacegameadventureButtonComponent";
import { useAssets } from "../../../../hooks";

export type RetrospacegameadventuretextsceneProps = SceneComponentProps<
  {},
  {
    textContent: string;
  }
>;

const Retrospacegameadventuretextscene: RetrospacegameadventuretextsceneProps =
  (props) => {
    const {
      data: { textContent, _actions },
    } = props;

    const { translateText, setBackgroundColor, nextScene, pushParameters } =
      useGameProvider();
    const { getAssetImg } = useAssets();

    useEffect(() => {
      setBackgroundColor("black");
    }, [setBackgroundColor]);

    return (
      <PageComponent>
        <ContainerComponent>
          <TextContainer>
            {/* <AnimatedText
              type="words"
              interval={0.04}
              duration={0.8}
              animation={{
                y: "100px",
                ease: "ease",
              }}
            >
              {i18n.t(textContent.replace("@t:", ""))}
            </AnimatedText> */}
            <p>{translateText(textContent)}</p>
            <IconContainer onClick={() => pushParameters("scene")}>
              <img
                src={getAssetImg("parameters_icon.png")}
                alt="paremeters icon"
              />
            </IconContainer>
          </TextContainer>

          <ActionsContainer>
            {_actions.map((action, i) => (
              <Fragment key={`retrospacegameadventuretextscene-${i}`}>
                <RetrospacegameadventureButtonComponent
                  onClick={() => {
                    nextScene(action._scene);
                  }}
                >
                  <TranslationComponent id={action._title} />
                </RetrospacegameadventureButtonComponent>
              </Fragment>
            ))}
          </ActionsContainer>
        </ContainerComponent>
      </PageComponent>
    );
  };

export default Retrospacegameadventuretextscene;
