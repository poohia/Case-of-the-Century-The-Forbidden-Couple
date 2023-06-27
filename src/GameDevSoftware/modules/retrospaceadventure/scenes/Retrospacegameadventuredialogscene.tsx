// https://www.freepik.com/free-vector/different-aliens-monster-transparent-background_20829475.htm#query=alien%20drawing&position=0&from_view=search
// import AnimatedText from "react-animated-text-content";
import { ThemeProvider } from "styled-components";
import {
  AnimationComponent,
  ImgFromSpriteComponent,
  PageComponent,
} from "../../../../components";
import { useAssets, useGameObjects } from "../../../../hooks";
import { SceneComponentProps } from "../../../../types";
import {
  ContainerComponent,
  ImageContainer,
} from "./components/RetrospacegameadventuredialogsceneStyledComponents";

import "animate.css";
import { useEffect, useMemo, useState } from "react";
import {
  MiniGameType,
  RetrospaceadventureCard,
  RetrospaceadventureCharacter,
} from "./types";
import RetrospacegameadventuredialogsceneTextComponent from "./components/RetrospacegameadventuredialogsceneTextComponent";
import RetrospacegameadventuredialogsceneCardContainer from "./components/RetrospacegameadventuredialogsceneCardContainer";
import RetrospacegameadventuredialogsceneMiniGameContainer from "./components/RetrospacegameadventuredialogsceneMiniGameContainer";
import { fightTheme, globalTheme } from "./themes";
import { useGameProvider } from "../../../../gameProvider";
import { useConstants } from "../../../../gameProvider/hooks";

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
    const [showDialogAnimation, setShowDialogAnimation] =
      useState<boolean>(false);

    const { getAssetImg } = useAssets();
    const { getGameObject } = useGameObjects();
    const { setBackgroundColor, setPrimaryFont, playSoundWithPreload } =
      useGameProvider();
    const { getValueFromConstant } = useConstants();

    const maxSizeGameContainer = useMemo(() => {
      const [width, height] = getValueFromConstant(
        "retrospaceadventure_max_width_height_views"
      );
      return { width, height };
    }, [getValueFromConstant]);

    useEffect(() => {
      setPrimaryFont("ihtacs");
      playSoundWithPreload("LaserGroove.mp3");
    }, []);

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

    useEffect(() => {
      setBackgroundColor(
        `url("${getAssetImg(
          "backgroundprimary.png"
        )}") black no-repeat center center / cover`
      );
    }, [setBackgroundColor, getAssetImg]);

    useEffect(() => {
      setTimeout(() => setShowDialogAnimation(true), 1000);
    }, []);

    return (
      <ThemeProvider theme={{ ...globalTheme, ...fightTheme }}>
        <PageComponent maxSize={maxSizeGameContainer}>
          <ContainerComponent>
            {Enemy && (
              <ImageContainer>
                {!showDialogAnimation && (
                  <ImgFromSpriteComponent
                    className="animate__animated animate__fadeInUp animate__fast"
                    atlasFile={Enemy.atlasFile}
                    imageFile={Enemy.image}
                    frameName="idle_sprite_3"
                    center
                    responsive
                    blockAtMaxSize
                  />
                )}

                <AnimationComponent
                  animationFile={Enemy.animationFile}
                  animationName="dialog_animation"
                  atlasFile={Enemy.atlasFile}
                  imageFile={Enemy.image}
                  style={{
                    visibility: showDialogAnimation ? "visible" : "hidden",
                  }}
                  center
                  responsive
                  blockAtMaxSize
                />
              </ImageContainer>
            )}
            {/* {showDialogAnimation && ( */}
            <RetrospacegameadventuredialogsceneTextComponent
              _actions={_actions}
              minigames={minigames}
              textContent={textContent}
              onClickCards={() => setShowCards(true)}
              onClickMinigame={(minigame) => setShowMiniGame(minigame)}
            />
            {/* )} */}
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
