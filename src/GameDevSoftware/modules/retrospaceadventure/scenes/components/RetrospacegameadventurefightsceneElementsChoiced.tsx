import React, { useContext, useEffect, useMemo } from "react";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import { ContainerRowFightCenter } from "./RetrospacegameadventurefightsceneStyledComponents";
import { defineHeroWinElementChoice } from "../utils";
import Card from "./styled/Card";

const RetrospacegameadventurefightsceneElementsChoiced: React.FC = () => {
  const {
    stateGame: {
      hero: {
        cards: cardsHero,
        elementChoice: elementChoiceHero,
        cardChoice: cardChoiceHero,
      },
      enemy: {
        cards: cardsEnemy,
        elementChoice: elementChoiceEnemy,
        cardChoice: cardChoiceEnemy,
      },
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

  const cardHero = useMemo(
    () => cardsHero.find((card) => card.id === cardChoiceHero),
    [cardsHero, cardChoiceHero]
  );
  const cardEnemy = useMemo(
    () => cardsEnemy.find((card) => card.id === cardChoiceEnemy),
    [cardsEnemy, cardChoiceEnemy]
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
    }, 7000);
  }, [dispatchGame]);

  if (!cardHero || !cardEnemy) return <div />;

  return (
    <ContainerRowFightCenter>
      <p>
        <b>
          {howWin === "win" && "Héro à gagné"}
          {howWin === "loose" && "Alien à gagné"}
          {howWin === "draw" && "Égalité"}
        </b>
      </p>
      <Card
        active={howWin === "loose" || howWin === "draw"}
        card={cardEnemy}
        onClick={() => {}}
      />
      <Card
        active={howWin === "win" || howWin === "draw"}
        card={cardHero}
        onClick={() => {}}
      />
    </ContainerRowFightCenter>
  );
};

export default RetrospacegameadventurefightsceneElementsChoiced;
