import { useCallback, useContext, useEffect, useMemo, useState } from "react";

import { useGameObjects, useScene, useTimeout } from "../../../../../hooks";
import { SceneComponentProps } from "../../../../../types";
import {
  CulpritSelectionSceneProps,
  NoteInspecteurInterface,
} from "../../../../game-types";
import PointsGameComponent from "../../components/PointsGameComponent";
import PointsContext from "../../contexts/PointsContext";
import { ImgBackgroundComponent } from "../../../../../components";
import ModalCulpritSelection, {
  CulpritSelectionValue,
} from "../../modals/ModalCulpritSelection";
import { useGameProvider } from "../../../../../gameProvider";
import UnlockContext from "../../contexts/UnlockContext";
import ModalParametersNotesNoteComponent from "../../modals/ModalParametersNotesInspecteur/ModalParametersNotesNoteComponent";

const CulpritSelectionScene: SceneComponentProps<
  {},
  CulpritSelectionSceneProps
> = (props) => {
  const { nextScene: nextSceneUseScene } = useScene(props.data);
  const { points, addPoints } = useContext(PointsContext);
  const { unLock } = useContext(UnlockContext);
  const { getGameObject } = useGameObjects();
  const {
    backgroundImage,
    unlockNoteInspecteur,
    noteTutorial: tutorialId,
    goodCulprit,
  } = props.data;
  const [openTutorial, setOpenTutorial] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { push, saveData, getData } = useGameProvider();
  const { start } = useTimeout(() => {
    if (getData("culpritSelectionSceneTutorialShown")) {
      setOpenDialog(true);
    } else {
      setOpenTutorial(true);
      saveData("culpritSelectionSceneTutorialShown", true);
    }
  }, 1700);

  const noteTutorial = useMemo(() => {
    if (tutorialId) {
      return getGameObject<NoteInspecteurInterface>(tutorialId);
    }
    return null;
  }, [tutorialId]);

  const goodCulpritFormatted = useMemo(
    () => ({
      mobiles: goodCulprit.mobiles.map((mobile) =>
        Number(mobile.replace("@go:", ""))
      ),
      personnages: goodCulprit.personnages.map((mobile) =>
        Number(mobile.replace("@go:", ""))
      ),
      scenario: Number(goodCulprit.scenario.replace("@go:", "")),
    }),
    [goodCulprit]
  );

  const handleFinished = useCallback(
    (value: Required<CulpritSelectionValue>) => {
      let points = 0;
      let isGood = false;
      if (goodCulpritFormatted.personnages.includes(value.culpritId1)) {
        points += 20;
      }
      if (goodCulpritFormatted.personnages.includes(value.culpritId2)) {
        points += 20;
      }
      if (goodCulpritFormatted.mobiles.includes(value.mobileId1)) {
        points += 20;
      }
      if (goodCulpritFormatted.mobiles.includes(value.mobileId2)) {
        points += 20;
      }
      if (goodCulpritFormatted.scenario === value.scenarioId) {
        points += 20;
        isGood = true;
      }
      if (value.chance !== 1) {
        points = points / 2;
      }
      addPoints("final-points", points);

      setTimeout(() => {}, 500);
    },
    [goodCulpritFormatted]
  );

  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    unLock({
      unlockNoteInspecteur: unlockNoteInspecteur,
    });
  }, []);

  return (
    <>
      <PointsGameComponent points={points} />
      <ImgBackgroundComponent
        src={backgroundImage}
        className="animate__animated animate__fadeIn"
      />
      <ModalParametersNotesNoteComponent
        open={openTutorial}
        isChildren
        note={noteTutorial}
        onClose={() => {
          setOpenTutorial(false);
          setOpenDialog(true);
        }}
      />
      <ModalCulpritSelection
        open={openDialog}
        goodCulprit={goodCulprit}
        onFinished={handleFinished}
        onClose={() => {
          push("home");
        }}
      />
    </>
  );
};

export default CulpritSelectionScene;
