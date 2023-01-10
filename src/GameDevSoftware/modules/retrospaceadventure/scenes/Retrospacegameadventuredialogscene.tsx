// https://www.freepik.com/free-vector/different-aliens-monster-transparent-background_20829475.htm#query=alien%20drawing&position=0&from_view=search
// import AnimatedText from "react-animated-text-content";
import { PageComponent, TranslationComponent } from "../../../../components";
import { useGameProvider } from "../../../../gameProvider";
import { useAssets, useGameObjects } from "../../../../hooks";
import { SceneComponentProps } from "../../../../types";
import {
  ActionsContainer,
  ContainerComponent,
  ImageContainer,
  TextContainer,
} from "./components/RetrospacegameadventuredialogsceneStyledComponents";

import "animate.css";
import RetrospacegameadventureButtonComponent from "./components/RetrospacegameadventureButtonComponent";
import { useEffect, useState } from "react";
import { RetrospaceadventureCharacter } from "./types";

export type RetrospacegameadventuredialogsceneProps = SceneComponentProps<
  {},
  {
    textContent: string;
    alien: string;
  }
>;

const Retrospacegameadventuredialogscene: RetrospacegameadventuredialogsceneProps =
  (props) => {
    const {
      data: { textContent, alien, _actions },
    } = props;

    const [Enemy, setEnemy] = useState<RetrospaceadventureCharacter>();
    const [minigames, setMinigames] = useState<{ thumbnail: string }[]>([]);

    const { translateText, nextScene } = useGameProvider();
    const { getAssetImg } = useAssets();
    const getGameObject = useGameObjects();

    useEffect(() => {
      setEnemy(getGameObject<RetrospaceadventureCharacter>(alien));
    }, [alien, getGameObject]);

    useEffect(() => {
      if (Enemy && Enemy.minigames) {
        setMinigames(
          Enemy.minigames.map((minigame) =>
            getGameObject<{ thumbnail: string }>(minigame)
          )
        );
      }
    }, [Enemy, getGameObject]);

    return (
      <PageComponent>
        <ContainerComponent>
          {Enemy && (
            <ImageContainer>
              <img
                className="animate__animated animate__fadeInUp"
                src={getAssetImg(Enemy.image)}
                alt=""
              />
            </ImageContainer>
          )}
          <TextContainer>
            <div>
              <p>{translateText(textContent)}</p>
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
                {translateText(textContent)}
              </AnimatedText> */}
            </div>
            <div>
              {minigames.map((minigame) => (
                <img
                  key={`minigame-thumbnail-${minigame.thumbnail}`}
                  alt=""
                  src={getAssetImg(minigame.thumbnail)}
                />
              ))}
            </div>
            <ActionsContainer>
              {_actions.map((action) => (
                <RetrospacegameadventureButtonComponent
                  onClick={() => {
                    nextScene(action._scene);
                  }}
                >
                  <TranslationComponent id={action._title} />
                </RetrospacegameadventureButtonComponent>
              ))}
            </ActionsContainer>
          </TextContainer>
        </ContainerComponent>
      </PageComponent>
    );
  };

export default Retrospacegameadventuredialogscene;
