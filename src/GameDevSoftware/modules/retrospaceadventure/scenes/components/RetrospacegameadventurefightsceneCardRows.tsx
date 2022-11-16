import React from "react";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import { GameReducerActionData } from "../reducers/gameReducer";
import { ContainerRowFightCenter } from "./RetrospacegameadventurefightsceneStyledComponents";
import Card from "./styled/Card";

const RetrospacegameadventurefightsceneCardRows: React.FC = () => {
  return (
    <RetrospaceadventureGameContext.Consumer>
      {({ stateGame, dispatchGame }) => (
        <ContainerRowFightCenter>
          {stateGame.hero.cards.map((card, i) => (
            <React.Fragment key={`selection-card-${card.name}-${i}`}>
              <Card
                card={card}
                onClick={() =>
                  dispatchGame({
                    type: "selectCard",
                    data: {
                      heroCardSelect: card.id,
                    } as GameReducerActionData,
                  })
                }
              />
            </React.Fragment>
          ))}
        </ContainerRowFightCenter>
      )}
    </RetrospaceadventureGameContext.Consumer>
  );
};

export default RetrospacegameadventurefightsceneCardRows;
