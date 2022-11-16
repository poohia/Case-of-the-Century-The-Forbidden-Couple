import { useCallback, useContext, useState } from "react";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import { GameReducerActionData } from "../reducers/gameReducer";
import { RetrospaceadventureElements } from "../types";
import RetrospacegameadventurefightsceneButtonsRow from "./RetrospacegameadventurefightsceneButtonsRow";
import { ContainerRowFightCenter } from "./RetrospacegameadventurefightsceneStyledComponents";
import CardElement from "./styled/CardElement";

const RetrospacegameadventurefightsceneCardElementRows: React.FC = () => {
  const { stateGame, dispatchGame } = useContext(
    RetrospaceadventureGameContext
  );
  const [cardSelected, setCardSelected] =
    useState<RetrospaceadventureElements | null>(null);

  const handleValidateCard = useCallback(
    () =>
      dispatchGame({
        type: "selectElement",
        data: {
          heroElementSelect: cardSelected,
        } as GameReducerActionData,
      }),
    [cardSelected, dispatchGame]
  );

  const handleCancel = useCallback(
    () =>
      dispatchGame({
        type: "getCard",
        data: {
          heroCards: stateGame.hero.cards,
          enemyCards: stateGame.enemy.cards,
        } as GameReducerActionData,
      }),
    [stateGame, dispatchGame]
  );

  return (
    <ContainerRowFightCenter>
      <CardElement
        element={1}
        active={cardSelected === 1}
        onClick={setCardSelected}
      />
      <CardElement
        element={2}
        active={cardSelected === 2}
        onClick={setCardSelected}
      />
      <CardElement
        element={3}
        active={cardSelected === 3}
        onClick={setCardSelected}
      />
      <RetrospacegameadventurefightsceneButtonsRow
        canValidate={!!cardSelected}
        onValidate={handleValidateCard}
        onCancel={handleCancel}
      />
    </ContainerRowFightCenter>
  );
};

export default RetrospacegameadventurefightsceneCardElementRows;
