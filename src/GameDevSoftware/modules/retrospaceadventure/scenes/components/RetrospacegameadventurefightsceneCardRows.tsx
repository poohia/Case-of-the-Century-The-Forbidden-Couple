import React, { useCallback, useContext, useState } from "react";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import { GameReducerActionData } from "../reducers/gameReducer";
import RetrospacegameadventurefightsceneButtonsRow from "./RetrospacegameadventurefightsceneButtonsRow";
import { ContainerRowFightCenter } from "./RetrospacegameadventurefightsceneStyledComponents";
import Card from "./styled/Card";
import { useGameProvider } from "../../../../../gameProvider";

const RetrospacegameadventurefightsceneCardRows: React.FC = () => {
  const { stateGame, dispatchGame } = useContext(
    RetrospaceadventureGameContext
  );
  const [cardSelected, setCardSelected] = useState<number | null>(null);
  const { playSoundEffect } = useGameProvider();

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
