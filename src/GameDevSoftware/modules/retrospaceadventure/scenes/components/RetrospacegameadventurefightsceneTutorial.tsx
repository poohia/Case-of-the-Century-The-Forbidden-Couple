import { useCallback, useContext, useMemo, useReducer, useRef } from "react";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import { GameReducerActionData } from "../reducers/gameReducer";
import { useGameProvider } from "../../../../../gameProvider";
import RetrospaceadevntureTutorialComponent from "./RetrospaceadevntureTutorialComponent";
import styled from "styled-components";
import { TutorialViewType } from "../../../../../types";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: black;
  text-shadow: none;
  z-index: 9;
`;

const RetrospacegameadventurefightsceneTutorial: React.FC = () => {
  const { saveData } = useGameProvider();
  const { stateGame, dispatchGame } = useContext(
    RetrospaceadventureGameContext
  );
  const refContainer = useRef<HTMLDivElement>(null);

  const currentTutorial = useMemo(() => {
    const { nextStatus } = stateGame;
    switch (nextStatus) {
      case "selectionCard":
        return 1;
    }
  }, [stateGame]);

  const validateTutorial = useCallback(() => {
    saveData("fight-tutorial", [...stateGame.tutorial, currentTutorial]);
    dispatchGame({
      type: "setTutorial",
      data: { tutorial: currentTutorial } as GameReducerActionData,
    });
  }, [currentTutorial, stateGame]);

  const views = useMemo((): TutorialViewType[] => {
    const { nextStatus } = stateGame;
    switch (nextStatus) {
      case "selectionCard":
        return [
          {
            title: "retrospaceadventure_tutorial_2",
            image: "comicspaceadventure-tutorial-2.png",
            text: "retrospaceadventure_tutorial_2_text",
            isVideo: false,
          },
          {
            title: "retrospaceadventure_tutorial_3",
            image: "comicspaceadventure-tutorial-3.png",
            text: "retrospaceadventure_tutorial_3_text",
            isVideo: false,
          },
        ];
    }

    return [];
  }, [stateGame, validateTutorial]);

  return (
    <Container ref={refContainer}>
      <RetrospaceadevntureTutorialComponent
        lastIcon="cancel.png"
        refParentContainer={refContainer}
        views={views}
        onClickLastStep={validateTutorial}
      />
    </Container>
  );
};

export default RetrospacegameadventurefightsceneTutorial;
