import React, { useCallback, useContext, useState } from "react";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import { GameReducerActionData } from "../reducers/gameReducer";
import RetrospacegameadventurefightsceneButtonsRow from "./RetrospacegameadventurefightsceneButtonsRow";
import { ContainerRowFightCenter } from "./RetrospacegameadventurefightsceneStyledComponents";
import Card from "./styled/Card";

const RetrospacegameadventurefightsceneCardRows: React.FC = () => {
  const { stateGame, dispatchGame } = useContext(
    RetrospaceadventureGameContext
  );
  const [cardSelected, setCardSelected] = useState<number | null>(null);

  const handleValidateCard = useCallback(
    () =>
      dispatchGame({
        type: "selectCard",
        data: {
          heroCardSelect: cardSelected,
        } as GameReducerActionData,
      }),
    [cardSelected, dispatchGame]
  );

  return (
    <ContainerRowFightCenter>
      {stateGame.hero.cards.map((card, i) => (
        <React.Fragment key={`selection-card-${card.name}-${i}`}>
          <Card
            card={card}
            active={card.id === cardSelected}
            onClick={() => setCardSelected(card.id)}
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
