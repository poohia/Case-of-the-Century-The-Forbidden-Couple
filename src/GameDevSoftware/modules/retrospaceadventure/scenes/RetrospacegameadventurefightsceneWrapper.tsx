import React, { useMemo } from "react";

import { PageComponent } from "../../../../components";
import { ContainerComponent } from "./components/RetrospacegameadventurefightsceneStyledComponents";
import RetrospacegameadventurefightsceneStatsRow from "./components/RetrospacegameadventurefightsceneStatsRow";
import RetrospaceadventureGameContext from "./contexts/RetrospaceadventureGameContext";
import useRetrospacegameadventurefightsceneParty from "./hooks/useRetrospacegameadventurefightsceneParty";
import RetrospacegameadventurefightsceneCardRows from "./components/RetrospacegameadventurefightsceneCardRows";
import RetrospacegameadventurefightsceneElementsChoiced from "./components/RetrospacegameadventurefightsceneElementsChoiced";
import RetrospacegameadventurefightMessageInfo from "./components/RetrospacegameadventurefightMessageInfo";
import RetrospaceadventureMiniGameWrapper from "./components/RetrospaceadventureMiniGameWrapper";
import RetrospaceadventureBarLifeAnimationContext, {
  useAnimationStatus,
} from "./contexts/RetrospaceadventureBarLifeAnimationContext";
import { useConstants } from "../../../../gameProvider/hooks";
import RetrospacegameadventurefightsceneTutorial from "./components/RetrospacegameadventurefightsceneTutorial";
import { useGameProvider } from "../../../../gameProvider";

type RetrospacegameadventurefightsceneWrapperProps = {};

const RetrospacegameadventurefightsceneWrapper: React.FC<
  RetrospacegameadventurefightsceneWrapperProps
> = () => {
  useRetrospacegameadventurefightsceneParty();
  const { getValueFromConstant } = useGameProvider();

  const useAnimationStatusReturn = useAnimationStatus();

  const maxSizeGameContainer = useMemo(() => {
    const [width, height] = getValueFromConstant(
      "retrospaceadventure_max_width_height_views"
    );
    return { width, height };
  }, [getValueFromConstant]);

  return (
    <RetrospaceadventureGameContext.Consumer>
      {({ stateGame, Enemy, Hero }) => {
        return (
          <RetrospaceadventureBarLifeAnimationContext.Provider
            value={useAnimationStatusReturn}
          >
            <RetrospacegameadventurefightMessageInfo />
            <PageComponent maxSize={maxSizeGameContainer} paddingRight="0px">
              <ContainerComponent>
                <RetrospacegameadventurefightsceneStatsRow character={Enemy} />
                {stateGame.status === "tutorial" && (
                  <RetrospacegameadventurefightsceneTutorial />
                )}
                {stateGame.status === "selectionCard" && (
                  <RetrospacegameadventurefightsceneCardRows />
                )}
                {stateGame.status === "startMinigame" && (
                  <RetrospaceadventureMiniGameWrapper />
                )}
                {(stateGame.status === "fightElement" ||
                  stateGame.status === "applyEffects" ||
                  stateGame.status === "applyEffectsEchec" ||
                  stateGame.status === "fight") && (
                  <RetrospacegameadventurefightsceneElementsChoiced />
                )}
                <RetrospacegameadventurefightsceneStatsRow character={Hero} />
              </ContainerComponent>
            </PageComponent>
          </RetrospaceadventureBarLifeAnimationContext.Provider>
        );
      }}
    </RetrospaceadventureGameContext.Consumer>
  );
};

export default RetrospacegameadventurefightsceneWrapper;
