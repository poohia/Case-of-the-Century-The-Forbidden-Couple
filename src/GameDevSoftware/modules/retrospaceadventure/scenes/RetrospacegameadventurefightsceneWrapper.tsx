import React from "react";
import { PageComponent } from "../../../../components";
import { ContainerComponent } from "./components/RetrospacegameadventurefightsceneStyledComponents";
import RetrospacegameadventurefightsceneStatsRow from "./components/RetrospacegameadventurefightsceneStatsRow";

import RetrospaceadventureGameContext from "./contexts/RetrospaceadventureGameContext";
import useRetrospacegameadventurefightsceneParty from "./hooks/useRetrospacegameadventurefightsceneParty";
import RetrospacegameadventurefightsceneCardRows from "./components/RetrospacegameadventurefightsceneCardRows";
import RetrospacegameadventurefightsceneCardElementRows from "./components/RetrospacegameadventurefightsceneCardElementRows";
import RetrospacegameadventurefightsceneResume from "./components/RetrospacegameadventurefightsceneResume";
import RetrospacegameadventurefightsceneElementsChoiced from "./components/RetrospacegameadventurefightsceneElementsChoiced";

type RetrospacegameadventurefightsceneWrapperProps = {};

const RetrospacegameadventurefightsceneWrapper: React.FC<
  RetrospacegameadventurefightsceneWrapperProps
> = () => {
  useRetrospacegameadventurefightsceneParty();

  return (
    <RetrospaceadventureGameContext.Consumer>
      {({ stateGame, Enemy, Hero }) => {
        return (
          <PageComponent>
            <ContainerComponent>
              <RetrospacegameadventurefightsceneStatsRow character={Enemy} />
              {stateGame.status === "selectionCard" && (
                <RetrospacegameadventurefightsceneCardRows />
              )}
              {stateGame.status === "selectionElement" && (
                <RetrospacegameadventurefightsceneCardElementRows />
              )}
              {stateGame.status === "fightElement" && (
                <RetrospacegameadventurefightsceneElementsChoiced />
              )}
              {stateGame.status === "fight" && (
                <RetrospacegameadventurefightsceneResume />
              )}
              <RetrospacegameadventurefightsceneStatsRow character={Hero} />
            </ContainerComponent>
          </PageComponent>
        );
      }}
    </RetrospaceadventureGameContext.Consumer>
  );
};

export default RetrospacegameadventurefightsceneWrapper;
