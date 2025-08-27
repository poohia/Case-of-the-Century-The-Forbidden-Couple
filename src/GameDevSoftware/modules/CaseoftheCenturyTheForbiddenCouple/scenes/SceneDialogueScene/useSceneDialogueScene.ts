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
import { useCallback, useEffect, useMemo, useState } from "react";
import useMultipleTextsOneByOneOnScene from "../../hooks/useMultipleTextsOneByOneOnScene";
import useHistorySaveSceneDialogueScene from "./useHistorySaveSceneDialogueScene";
import usePercentAngry from "./usePercentAngry";

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

  const responsesObject = useMemo<ResponseType[]>(() => {
    const responses: ResponseType[] =
      dialogue.responses?.map((response: any) => getGameObject(response)) || [];
    const finalResponses = responses.filter(
      (response) => !historiesResponses.includes(response._id)
    );
    if (finalResponses.length !== 0) {
      return finalResponses;
    }
    return responses;
  }, [characterObject]);

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
      if (showEnd) {
        nextScene();
      } else {
        setShowResponse(true);
      }
    },
  });

  const click = useButtonHandleClick();

  const handleClickResponse = useCallback(
    (event: React.MouseEvent<any, MouseEvent>, response: ResponseType) => {
      click(event, {
        callback: () => {
          handleResponse(response);
          addPoints(`${_id}-${response._id}`, response.points || 0);
          addPercent(response.percentAngry);
          const dialogue = getGameObject(response.dialogue);
          setDialogue(dialogue);
          handleSetDialogue(dialogue);
          setTimeout(() => {
            setShowResponse(false);
          });
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
