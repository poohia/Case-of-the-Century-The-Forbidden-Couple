// https://www.freepik.com/free-vector/different-aliens-monster-transparent-background_20829475.htm#query=alien%20drawing&position=0&from_view=search
// import AnimatedText from "react-animated-text-content";
import { ThemeProvider } from "styled-components";
import { ImgComponent, PageComponent } from "../../../../components";
import { useAssets, useGameObjects } from "../../../../hooks";
import { SceneComponentProps } from "../../../../types";
import {
  ContainerComponent,
  ImageContainer,
} from "./components/RetrospacegameadventuredialogsceneStyledComponents";

import "animate.css";
import { useEffect, useState } from "react";
import {
  MiniGameType,
  RetrospaceadventureCard,
  RetrospaceadventureCharacter,
} from "./types";
import RetrospacegameadventuredialogsceneTextComponent from "./components/RetrospacegameadventuredialogsceneTextComponent";
import RetrospacegameadventuredialogsceneCardContainer from "./components/RetrospacegameadventuredialogsceneCardContainer";
import RetrospacegameadventuredialogsceneMiniGameContainer from "./components/RetrospacegameadventuredialogsceneMiniGameContainer";
import { fightTheme, globalTheme } from "./themes";

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
    const [minigames, setMinigames] = useState<MiniGameType[]>([]);
    const [cards, setCards] = useState<RetrospaceadventureCard[]>([]);
    const [showCards, setShowCards] = useState<boolean>(false);
    const [showMiniGame, setShowMiniGame] = useState<MiniGameType | null>(null);

    const { getAssetImg } = useAssets();
    const { getGameObject } = useGameObjects();

    useEffect(() => {
      setEnemy(getGameObject<RetrospaceadventureCharacter>(alien));
    }, [alien, getGameObject]);

    useEffect(() => {
      if (Enemy && Enemy.minigames) {
        setMinigames(
          Enemy.minigames.map((minigame) =>
            getGameObject<MiniGameType>(minigame)
          )
        );
      }
    }, [Enemy, getGameObject]);

    useEffect(() => {
      if (Enemy && Enemy.cards) {
        setCards(
          Enemy.cards
            .map((card) =>
              // @ts-ignore
              getGameObject<RetrospaceadventureCard>(card)
            )
            .map((card) => ({
              ...card,
              // @ts-ignore
              id: card._id,
              image: getAssetImg(card.image),
              // @ts-ignore
              critical_effect: getGameObject(card.critical_effect),
              // @ts-ignore
              echec_effect: getGameObject(card.echec_effect),
            }))
        );
      }
    }, [Enemy, getGameObject]);

    return (
      <ThemeProvider theme={{ ...globalTheme, ...fightTheme }}>
        <PageComponent>
          <ContainerComponent>
            {Enemy && (
              <ImageContainer>
                <ImgComponent
                  className="animate__animated animate__fadeInUp"
                  src={getAssetImg(Enemy.image)}
                  alt=""
                />
              </ImageContainer>
            )}
            <RetrospacegameadventuredialogsceneTextComponent
              _actions={_actions}
              minigames={minigames}
              textContent={textContent}
              onClickCards={() => setShowCards(true)}
              onClickMinigame={(minigame) => setShowMiniGame(minigame)}
            />
            {showCards && Enemy && (
              <RetrospacegameadventuredialogsceneCardContainer
                cards={cards}
                onClickClose={() => setShowCards(false)}
              />
            )}
            {showMiniGame && (
              <RetrospacegameadventuredialogsceneMiniGameContainer
                minigame={showMiniGame}
                onClickClose={() => setShowMiniGame(null)}
              />
            )}
          </ContainerComponent>
        </PageComponent>
      </ThemeProvider>
    );
  };

export default Retrospacegameadventuredialogscene;
