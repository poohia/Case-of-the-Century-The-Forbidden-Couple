import React from "react";
import { PageComponent } from "../../../../components";
import { ContainerComponent } from "./components/RetrospacegameadventurefightsceneStyledComponents";
import RetrospacegameadventurefightsceneStatsRow from "./components/RetrospacegameadventurefightsceneStatsRow";

import RetrospaceadventureGameContext from "./contexts/RetrospaceadventureGameContext";
import useRetrospacegameadventurefightsceneParty from "./hooks/useRetrospacegameadventurefightsceneParty";
import RetrospacegameadventurefightsceneCardRows from "./components/RetrospacegameadventurefightsceneCardRows";
import RetrospacegameadventurefightsceneCardElementRows from "./components/RetrospacegameadventurefightsceneCardElementRows";

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
              {stateGame.status === "selectionCard" && (
                <RetrospacegameadventurefightsceneCardRows />
              )}
              {stateGame.status === "selectionElement" && (
                <RetrospacegameadventurefightsceneCardElementRows />
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
