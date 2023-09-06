import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import { GameReducerActionData } from "../reducers/gameReducer";
import RetrospacegameadventurefightsceneButtonsRow from "./RetrospacegameadventurefightsceneButtonsRow";
import { ContainerRowFightCenter } from "./RetrospacegameadventurefightsceneStyledComponents";
import Card from "./styled/Card";
import { useGameProvider } from "../../../../../gameProvider";
import { Container } from "./RetrospacegameadventurefightsceneTutorial";
import RetrospaceadevntureTutorialComponent from "./RetrospaceadevntureTutorialComponent";

const RetrospacegameadventurefightsceneCardRows: React.FC = () => {
  const { stateGame, dispatchGame } = useContext(
    RetrospaceadventureGameContext
  );
  const [cardSelected, setCardSelected] = useState<number | null>(null);
  const [showTutorialCannon, setShowTutorialCannon] = useState<boolean>(false);
  const { playSoundEffect, saveData } = useGameProvider();
  const refContainer = useRef<HTMLDivElement>(null);

  const handleValidateCard = useCallback(
    () =>
      setCardSelected((heroCardSelect) => {
        setTimeout(
          () =>
            dispatchGame({
              type: "selectCard",
              data: {
                heroCardSelect,
              } as GameReducerActionData,
            }),
          100
        );
        return heroCardSelect;
      }),
    [dispatchGame]
  );

  const validateTutorial = useCallback(() => {
    saveData("fight-tutorial", [...stateGame.tutorial, 4]);
    dispatchGame({
      type: "setTutorial",
      data: { tutorial: 4 } as GameReducerActionData,
    });
    setShowTutorialCannon(false);
  }, [stateGame]);

  useEffect(() => {
    if (
      stateGame.hero.cards.filter(
        (card) => card.critical_effect.effect === "use_full_laser"
      ).length > 0 &&
      !stateGame.tutorial.includes(4)
    ) {
      setShowTutorialCannon(true);
    }
  }, [stateGame]);

  if (showTutorialCannon) {
    return (
      <Container ref={refContainer}>
        <RetrospaceadevntureTutorialComponent
          lastIcon="cancel.png"
          refParentContainer={refContainer}
          views={[
            {
              title: "retrospaceadventure_tutorial_6",
              image: "comicspaceadventure-tutorial-6.png",
              text: "retrospaceadventure_tutorial_6_text",
              isVideo: false,
            },
          ]}
          onClickLastStep={validateTutorial}
        />
      </Container>
    );
  }
  return (
    <ContainerRowFightCenter>
      {stateGame.hero.cards.map((card, i) => (
        <React.Fragment key={`selection-card-${card._title}-${i}`}>
          <Card
            card={card}
            active={card.id === cardSelected}
            onClick={() => {
              if (card.id !== cardSelected) {
                playSoundEffect("mixkit-futuristic-cinematic-sweep-2635.mp3");
                setCardSelected(card.id);
              }
            }}
          />
        </React.Fragment>
      ))}
      <RetrospacegameadventurefightsceneButtonsRow
        canValidate={!!cardSelected}
        onValidate={handleValidateCard}
      />
    </ContainerRowFightCenter>
  );
};

export default RetrospacegameadventurefightsceneCardRows;
