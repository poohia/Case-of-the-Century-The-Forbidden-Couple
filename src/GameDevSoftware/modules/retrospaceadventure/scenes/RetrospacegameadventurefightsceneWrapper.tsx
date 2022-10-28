import React from "react";
import { PageComponent } from "../../../../components";
import {
  ContainerComponent,
  ContainerRowComponent,
} from "./components/RetrospacegameadventurefightsceneStyledComponents";
import RetrospacegameadventurefightsceneStatsRow from "./components/RetrospacegameadventurefightsceneStatsRow";

import { GameReducerActionData } from "./reducers/gameReducer";
import RetrospaceadventureGameContext from "./contexts/RetrospaceadventureGameContext";
import useRetrospacegameadventurefightsceneParty from "./hooks/useRetrospacegameadventurefightsceneParty";

type RetrospacegameadventurefightsceneWrapperProps = {};

const RetrospacegameadventurefightsceneWrapper: React.FC<
  RetrospacegameadventurefightsceneWrapperProps
> = () => {
  useRetrospacegameadventurefightsceneParty();

  return (
    <RetrospaceadventureGameContext.Consumer>
      {({ stateGame, Enemy, Hero, dispatchGame }) => {
        return (
          <PageComponent>
            <ContainerComponent>
              <RetrospacegameadventurefightsceneStatsRow character={Enemy} />
              <ContainerRowComponent>
                {stateGame.status === "selectionCard" &&
                  stateGame.hero.cards.map((card, i) => (
                    <div
                      key={`selection-card-${card.name}-${i}`}
                      onClick={() =>
                        dispatchGame({
                          type: "selectCard",
                          data: {
                            heroCardSelect: card.id,
                          } as GameReducerActionData,
                        })
                      }
                    >
                      {card.name}
                    </div>
                  ))}
                {stateGame.status === "selectionElement" && (
                  <div>
                    <div
                      onClick={() =>
                        dispatchGame({
                          type: "selectElement",
                          data: {
                            heroElementSelect: 1,
                          } as GameReducerActionData,
                        })
                      }
                    >
                      Electricité
                    </div>
                    <br />
                    <div
                      onClick={() =>
                        dispatchGame({
                          type: "selectElement",
                          data: {
                            heroElementSelect: 2,
                          } as GameReducerActionData,
                        })
                      }
                    >
                      Laser
                    </div>
                    <br />
                    <div
                      onClick={() =>
                        dispatchGame({
                          type: "selectElement",
                          data: {
                            heroElementSelect: 3,
                          } as GameReducerActionData,
                        })
                      }
                    >
                      Feu
                    </div>
                  </div>
                )}
              </ContainerRowComponent>
              <RetrospacegameadventurefightsceneStatsRow character={Hero} />
            </ContainerComponent>
          </PageComponent>
        );
      }}
    </RetrospaceadventureGameContext.Consumer>
  );
};

export default RetrospacegameadventurefightsceneWrapper;
