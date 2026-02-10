import { useCallback, useContext, useEffect, useMemo, useState } from "react";

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
import useMultipleTextsOneByOneOnScene from "../../hooks/useMultipleTextsOneByOneOnScene";
import useHistorySaveSceneDialogueScene from "./useHistorySaveSceneDialogueScene";
import usePercentAngry from "./usePercentAngry";
import UnlockContext from "../../contexts/UnlockContext";
import useResponseFormat from "./useResponseFormat";

const useSceneDialogueScene = (
  props: SceneDialogueProps & { nextScene: () => void }
) => {
  const {
    _id,
    firstDialogue,
    characterResponse,
    lastWords,
    tutorialId,
    defaultResponses,
    nextScene,
  } = props;

  const {
    historiesResponses,
    historiesDialogues,
    lastDialogue,
    handleResponse,
    handleSetDialogue,
  } = useHistorySaveSceneDialogueScene(_id, firstDialogue);

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

  const { responsesObject, dontHaveResponses } = useResponseFormat({
    dialogue,
    historiesResponses,
    historiesDialogues,
    defaultResponses,
  });

  const [showResponse, setShowResponse] = useState<boolean>(false);

  const characterObject = useMemo<CharacterInterface>(
    () => getGameObject(dialogue.character),
    [dialogue]
  );
  const texts = useMemo(() => {
    if (showEnd || dontHaveResponses) {
      return [...dialogue.texts, { content: lastWords }];
    }
    return dialogue.texts;
  }, [dialogue, showEnd, dontHaveResponses, lastWords]);

  const [imageAnimation, setImageAnimation] = useState<string>(() => {
    switch (dialogue.animation) {
      case "angry":
        return characterObject.angryImage;
      case "laught":
        return characterObject.laughtImage;
      case "idle":
      default:
        return characterObject.idleImage;
    }
  });

  useEffect(() => {
    if (showEnd || dontHaveResponses) {
      setImageAnimation(characterObject.idleImage);
      return;
    }
    switch (dialogue.animation) {
      case "idle":
        setImageAnimation(characterObject.idleImage);
        break;
      case "angry":
        setImageAnimation(characterObject.angryImage);
        break;
      case "laught":
        setImageAnimation(characterObject.laughtImage);
        break;
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

  const {
    i,
    setI,
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
    resetTypingComplete,
    /** */
    responseIfInstantTextReveal,
  } = useMultipleTextsOneByOneOnScene(_id, texts, {
    nextScene: () => {
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
          const dialogue = getGameObject(response.dialogue);
          setI(0);
          resetTypingComplete();
          responseIfInstantTextReveal();
          handleResponse(response);
          addPoints(`${_id}-${response._id}`, response.points || 0);
          addPercent(response.percentAngry);
          setShowResponse(false);
          handleSetDialogue(dialogue);
          unLock({
            unlockNoteInspecteur: response.unlockNoteInspecteur,
            unlockScenario: response.unlockScenario,
          });

          setDialogue(dialogue);
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
    } else if (showEnd || dontHaveResponses) {
      nextScene();
      return;
    } else {
      setShowResponse(true);
    }
  }, [
    i,
    texts,
    showEnd,
    dontHaveResponses,
    isTypingComplete,
    showContinueArrow,
    nextAction,
  ]);

  return {
    showContinueArrow,
    showResponse,
    characterResponseObject,
    showBubble,
    responsesObject,
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
