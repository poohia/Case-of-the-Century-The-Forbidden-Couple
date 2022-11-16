import React, { useContext, useEffect, useMemo } from "react";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import { ContainerRowFightCenter } from "./RetrospacegameadventurefightsceneStyledComponents";
import CardElement from "./styled/CardElement";
import { defineHeroWinElementChoice } from "../utils";

const RetrospacegameadventurefightsceneElementsChoiced: React.FC = () => {
  const {
    stateGame: {
      hero: { elementChoice: elementChoiceHero },
      enemy: { elementChoice: elementChoiceEnemy },
    },
    dispatchGame,
  } = useContext(RetrospaceadventureGameContext);

  const elementChoiceHeroFinalValue = useMemo(
    () => elementChoiceHero || 1,
    [elementChoiceHero]
  );
  const elementChoiceEnemyFinalValue = useMemo(
    () => elementChoiceEnemy || 1,
    [elementChoiceEnemy]
  );

  const howWin = useMemo(
    () =>
      defineHeroWinElementChoice(
        elementChoiceHeroFinalValue,
        elementChoiceEnemyFinalValue
      ),

    [elementChoiceHeroFinalValue, elementChoiceEnemyFinalValue]
  );

  useEffect(() => {
    setTimeout(() => {
      dispatchGame({ type: "fight" });
    }, 3000);
  }, [dispatchGame]);

  return (
    <ContainerRowFightCenter>
      <p>
        <b>
          {howWin === "win" && "Héro à gagné"}
          {howWin === "loose" && "Alien à gagné"}
          {howWin === "draw" && "Égalité"}
        </b>
      </p>
      <CardElement element={elementChoiceEnemyFinalValue} onClick={() => {}} />
      <CardElement element={elementChoiceHeroFinalValue} onClick={() => {}} />
    </ContainerRowFightCenter>
  );
};

export default RetrospacegameadventurefightsceneElementsChoiced;
