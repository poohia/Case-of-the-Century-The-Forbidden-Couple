import {
  useButtonHandleClick,
  useGameObjects,
  useToturial,
} from "../../../../../hooks";
import { useGameProvider } from "../../../../../gameProvider";
import {
  CharacterInterface,
  DialogueInterface,
  NoteInspecteurInterface,
  ResponseInterface as ResponseType,
  SceneDialogueProps,
} from "../../../../game-types";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import useMultipleTextsOneByOneOnScene from "../../hooks/useMultipleTextsOneByOneOnScene";
import useHistorySaveSceneDialogueScene from "./useHistorySaveSceneDialogueScene";
import usePercentAngry from "./usePercentAngry";
import UnlockContext from "../../contexts/UnlockContext";
import { limiteArray, shuffleArray } from "../../utils";

const useSceneDialogueScene = (
  props: SceneDialogueProps & { nextScene: () => void }
) => {
  const {
    _id,
    firstDialogue,
    characterResponse,
    lastWords,
    tutorialId,
    nextScene,
  } = props;

  const {
    historiesResponses,
    historiesDialogues,
    lastDialogue,
    handleResponse,
    handleSetDialogue,
  } = useHistorySaveSceneDialogueScene(_id);

  const { playSoundEffect } = useGameProvider();
  const { getGameObject } = useGameObjects();

  const { show: showTutorial, onClose: onCloseTutorial } = useToturial(
    tutorialId?.replace("@go:", "")
  );
  const noteTutorial = useMemo(() => {
    if (tutorialId) {
      return getGameObject<NoteInspecteurInterface>(tutorialId);
    }
    return null;
  }, [tutorialId]);

  const { percentAngry, previousPercentAngry, showEnd, addPercent } =
    usePercentAngry();

  const [dialogue, setDialogue] = useState<DialogueInterface>(
    getGameObject(lastDialogue?.toString() || firstDialogue)
  );

  const [showResponse, setShowResponse] = useState<boolean>(false);

  const characterObject = useMemo<CharacterInterface>(
    () => getGameObject(dialogue.character),
    [dialogue]
  );
  const texts = useMemo(() => {
    if (showEnd) {
      return [...dialogue.texts, { content: lastWords }];
    }
    return dialogue.texts;
  }, [dialogue, showEnd, lastWords]);

  const [imageAnimation, setImageAnimation] = useState<string>(() => {
    switch (dialogue.animation) {
      case "angry":
        return characterObject.angryImage;
      case "idle":
      default:
        return characterObject.idleImage;
    }
  });

  useEffect(() => {
    if (showEnd) {
      setImageAnimation(characterObject.idleImage);
      return;
    }
    switch (dialogue.animation) {
      case "idle":
        setImageAnimation(characterObject.idleImage);
        break;
      case "angry":
        setImageAnimation(characterObject.angryImage);
    }
  }, [dialogue, characterObject]);

  useEffect(() => {
    if (dialogue.animation !== "idle") {
      setTimeout(() => {
        setImageAnimation(characterObject.idleImage);
      }, 1700);
    }
  }, [dialogue, characterObject.idleImage]);

  const characterResponseObject = useMemo<CharacterInterface>(
    () => getGameObject(characterResponse),
    []
  );

  const responsesFromHistoriesDialogues = useMemo<ResponseType[]>(() => {
    const dialogues: DialogueInterface[] = historiesDialogues.flatMap((d) =>
      getGameObject(d.toString())
    );

    console.log("===== responsesFromHistoriesDialogues =====");
    console.log("===== dialogues =====");
    console.log(dialogues);
    console.log("===== responses =====");
    console.log(
      dialogues
        .flatMap((d) => d.responses)
        .map((r) => getGameObject(r))
        .filter(
          (response, index, self) =>
            index === self.findIndex((t) => t._id === response._id)
        )
        .filter((response) => !historiesResponses.includes(response._id))
    );
    console.log("===== résultat final =====");
    const responses = dialogues
      .flatMap((d) => d.responses)
      .map((r) => getGameObject(r))
      .filter(
        (response, index, self) =>
          index === self.findIndex((t) => t._id === response._id)
      )
      .filter((response) => !historiesResponses.includes(response._id));

    console.log(shuffleArray(responses));
    return shuffleArray(responses);
  }, [historiesDialogues, historiesResponses]);

  const responsesObject = useMemo<ResponseType[]>(() => {
    const responses: ResponseType[] =
      dialogue.responses?.map((response: any) => getGameObject(response)) || [];
    const finalResponses = responses.filter(
      (response) => !historiesResponses.includes(response._id)
    );
    if (finalResponses.length !== 0) {
      console.log("responses from finalResponses");
      return finalResponses;
    }
    if (responsesFromHistoriesDialogues.length !== 0) {
      console.log("resposnes from responsesFromHistoriesDialogues");
      return responsesFromHistoriesDialogues;
    }
    console.log("resposnes from responses");
    return responses;
    // return [];
  }, [
    historiesResponses,
    dialogue,
    characterObject,
    responsesFromHistoriesDialogues,
  ]);

  const finalResponsesObject = useMemo<ResponseType[]>(
    () => limiteArray(responsesObject, 4),
    [responsesObject]
  );

  const {
    i,
    text,
    points,
    openParameters,
    showContinueArrow,
    showBubble,
    nextAction,
    handleParamsOpened,
    handleParamsClosed,
    addPoints,
    /** */
    /** */
    isTypingComplete,
    forceInstant,
    handleTypingDone,
    handleForceInstant,
  } = useMultipleTextsOneByOneOnScene(_id, texts, {
    nextScene: () => {
      console.log("i'm here!! timeout");
      if (showEnd) {
        nextScene();
      } else {
        setShowResponse(true);
      }
    },
  });

  const click = useButtonHandleClick();
  const { unLock } = useContext(UnlockContext);

  const handleClickResponse = useCallback(
    (event: React.MouseEvent<any, MouseEvent>, response: ResponseType) => {
      click(event, {
        callback: () => {
          handleResponse(response);
          addPoints(`${_id}-${response._id}`, response.points || 0);
          addPercent(response.percentAngry);
          const dialogue = getGameObject(response.dialogue);
          setShowResponse(false);
          setDialogue(dialogue);
          handleSetDialogue(dialogue);
          unLock({
            unlockNoteInspecteur: response.unlockNoteInspecteur,
            unlockScenario: response.unlockScenario,
          });
          // setTimeout(() => {
          //   setShowResponse(false);
          // });
        },
        playSound: true,
      });
    },
    [texts, handleResponse, nextAction]
  );

  useEffect(() => {
    if (dialogue.sound) {
      playSoundEffect({
        sound: dialogue.sound,
        volume: 0.7,
      });
    }
  }, [dialogue]);

  const handleClickManually = useCallback(() => {
    if (!isTypingComplete) {
      handleForceInstant();
      handleTypingDone();
      return;
    }

    if (!showContinueArrow) {
      return;
    }
    if (i < texts.length - 1) {
      nextAction();
    } else if (showEnd) {
      nextScene();
      return;
    } else {
      setShowResponse(true);
    }
  }, [i, texts, showEnd, isTypingComplete, showContinueArrow, nextAction]);

  return {
    showContinueArrow,
    showResponse,
    characterResponseObject,
    showBubble,
    responsesObject: finalResponsesObject,
    imageAnimation,
    characterObject,
    text,
    points,
    openParameters,
    percentAngry,
    previousPercentAngry,
    showEnd,
    lastWords,
    click,
    handleClickResponse,
    handleParamsOpened,
    handleClickManually,
    handleParamsClosed,
    /** */
    isTypingComplete,
    forceInstant,
    handleTypingDone,
    /** */
    showTutorial,
    noteTutorial,
    onCloseTutorial,
  };
};

export default useSceneDialogueScene;
