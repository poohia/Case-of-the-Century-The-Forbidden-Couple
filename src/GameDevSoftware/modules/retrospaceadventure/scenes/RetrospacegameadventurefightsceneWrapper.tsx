import React from "react";
import { PageComponent } from "../../../../components";
import { ContainerComponent } from "./components/RetrospacegameadventurefightsceneStyledComponents";
import RetrospacegameadventurefightsceneStatsRow from "./components/RetrospacegameadventurefightsceneStatsRow";

import RetrospaceadventureGameContext from "./contexts/RetrospaceadventureGameContext";
import useRetrospacegameadventurefightsceneParty from "./hooks/useRetrospacegameadventurefightsceneParty";
import RetrospacegameadventurefightsceneCardRows from "./components/RetrospacegameadventurefightsceneCardRows";
import RetrospacegameadventurefightsceneElementsChoiced from "./components/RetrospacegameadventurefightsceneElementsChoiced";
import RetrospacegameadventurefightMessageInfo from "./components/RetrospacegameadventurefightMessageInfo";
import RetrospaceadventureMiniGameWrapper from "./components/RetrospaceadventureMiniGameWrapper";

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
              <RetrospacegameadventurefightMessageInfo />
              <RetrospacegameadventurefightsceneStatsRow character={Enemy} />
              {stateGame.status === "selectionCard" && (
                <RetrospacegameadventurefightsceneCardRows />
              )}
              {stateGame.status === "startMinigame" && (
                <RetrospaceadventureMiniGameWrapper />
              )}
              {(stateGame.status === "fightElement" ||
                stateGame.status === "applyEffects" ||
                stateGame.status === "fight") && (
                <RetrospacegameadventurefightsceneElementsChoiced />
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
