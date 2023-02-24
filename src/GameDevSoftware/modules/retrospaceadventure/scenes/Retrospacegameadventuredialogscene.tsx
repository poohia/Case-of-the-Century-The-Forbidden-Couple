// https://www.freepik.com/free-vector/different-aliens-monster-transparent-background_20829475.htm#query=alien%20drawing&position=0&from_view=search
// import AnimatedText from "react-animated-text-content";
import { PageComponent, TranslationComponent } from "../../../../components";
import { useGameProvider } from "../../../../gameProvider";
import { useAssets, useGameObjects } from "../../../../hooks";
import { ActionOfScene, SceneComponentProps } from "../../../../types";
import {
  ActionsContainer,
  CardsComponentContainer,
  CardsContainer,
  ContainerComponent,
  IconsContainer,
  ImageContainer,
  TextContainer,
} from "./components/RetrospacegameadventuredialogsceneStyledComponents";

import "animate.css";
import RetrospacegameadventureButtonComponent from "./components/RetrospacegameadventureButtonComponent";
import { Fragment, useEffect, useMemo, useState } from "react";
import { RetrospaceadventureCard, RetrospaceadventureCharacter } from "./types";
import Card from "./components/styled/Card";

export type RetrospacegameadventuredialogsceneProps = SceneComponentProps<
  {},
  {
    textContent: string;
    alien: string;
  }
>;

const RetrospacegameadventuredialogsceneTextComponent: React.FC<{
  textContent: string;
  minigames: { thumbnail: string }[];
  _actions: ActionOfScene[];
  onClickCards: () => void;
}> = ({ textContent, minigames, _actions, onClickCards }) => {
  const { translateText, nextScene } = useGameProvider();
  const { getAssetImg } = useAssets();
  return (
    <TextContainer>
      <div>
        <p>{translateText(textContent)}</p>
      </div>
      <IconsContainer>
        {minigames.map((minigame) => (
          <img
            key={`minigame-thumbnail-${minigame.thumbnail}`}
            alt=""
            src={getAssetImg(minigame.thumbnail)}
          />
        ))}
        <img
          alt=""
          src={getAssetImg("cards-preview.png")}
          onClick={onClickCards}
        />
      </IconsContainer>
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
  );
};

const RetrospacegameadventuredialogsceneCardContainer: React.FC<{
  cards: RetrospaceadventureCard[];
  onClickClose: () => void;
}> = ({ cards, onClickClose }) => {
  const { getAssetImg } = useAssets();
  return (
    <CardsComponentContainer>
      <div>
        <img
          className="animate__animated animate__bounceIn"
          src={getAssetImg("cancel.png")}
          alt=""
          onClick={onClickClose}
        />
      </div>
      <CardsContainer>
        {cards.map((card) => (
          <Fragment
            key={`retrospaceadventure-dialog-scene-cards-container-card-${card.id}`}
          >
            <Card card={card} onClick={() => {}} />
          </Fragment>
        ))}
      </CardsContainer>
    </CardsComponentContainer>
  );
};

const Retrospacegameadventuredialogscene: RetrospacegameadventuredialogsceneProps =
  (props) => {
    const {
      data: { textContent, alien, _actions },
    } = props;

    const [Enemy, setEnemy] = useState<RetrospaceadventureCharacter>();
    const [minigames, setMinigames] = useState<{ thumbnail: string }[]>([]);
    const [cards, setCards] = useState<RetrospaceadventureCard[]>([]);
    const [showCards, setShowCards] = useState<boolean>(false);

    const { getAssetImg } = useAssets();
    const { getGameObject } = useGameObjects();

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
          {!showCards && (
            <RetrospacegameadventuredialogsceneTextComponent
              _actions={_actions}
              minigames={minigames}
              textContent={textContent}
              onClickCards={() => setShowCards(true)}
            />
          )}
          {showCards && Enemy && (
            <RetrospacegameadventuredialogsceneCardContainer
              cards={cards}
              onClickClose={() => setShowCards(false)}
            />
          )}
        </ContainerComponent>
      </PageComponent>
    );
  };

export default Retrospacegameadventuredialogscene;
