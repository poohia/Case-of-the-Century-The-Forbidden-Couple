import React, { useContext, useEffect, useMemo } from "react";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import { ContainerRowFightCenter } from "./RetrospacegameadventurefightsceneStyledComponents";
import Card from "./styled/Card";

const RetrospacegameadventurefightsceneElementsChoiced: React.FC = () => {
  const {
    stateGame: {
      hero: { cards: cardsHero, cardChoice: cardChoiceHero },
      enemy: { cards: cardsEnemy, cardChoice: cardChoiceEnemy },
      howWin,
    },
    dispatchGame,
  } = useContext(RetrospaceadventureGameContext);

  const cardHero = useMemo(
    () => cardsHero.find((card) => card.id === cardChoiceHero),
    [cardsHero, cardChoiceHero]
  );
  const cardEnemy = useMemo(
    () => cardsEnemy.find((card) => card.id === cardChoiceEnemy),
    [cardsEnemy, cardChoiceEnemy]
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
        </b>
      </p>
      <Card active={howWin === "loose"} card={cardEnemy} onClick={() => {}} />
      <Card active={howWin === "win"} card={cardHero} onClick={() => {}} />
    </ContainerRowFightCenter>
  );
};

export default RetrospacegameadventurefightsceneElementsChoiced;
