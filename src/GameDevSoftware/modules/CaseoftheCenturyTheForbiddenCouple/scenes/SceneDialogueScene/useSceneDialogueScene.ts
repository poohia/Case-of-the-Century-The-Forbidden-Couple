import {
  useButtonHandleClick,
  useGameObjects,
  useScene,
} from "../../../../../hooks";
import { useGameProvider } from "../../../../../gameProvider";
import {
  Character,
  Dialogue,
  Response as ResponseType,
  SceneDialogueProps,
} from "../../../../game-types";
import { useCallback, useEffect, useMemo, useState } from "react";
import useMultipleTextsOneByOneOnScene from "../../hooks/useMultipleTextsOneByOneOnScene";
import useHistorySaveSceneDialogueScene from "./useHistorySaveSceneDialogueScene";

const useSceneDialogueScene = (props: SceneDialogueProps) => {
  const { _id, firstDialogue, characterResponse } = props;

  const {
    historiesResponses,
    lastDialogue,
    handleResponse,
    handleSetDialogue,
  } = useHistorySaveSceneDialogueScene(_id);

  const { playSoundEffect } = useGameProvider();
  const { getGameObject } = useGameObjects();

  const [dialogue, setDialogue] = useState<Dialogue>(
    getGameObject(lastDialogue?.toString() || firstDialogue)
  );

  const [showResponse, setShowResponse] = useState<boolean>(false);

  const characterObject = useMemo<Character>(
    () => getGameObject(dialogue.character),
    [dialogue]
  );
  const texts = useMemo(() => dialogue.texts, [dialogue]);

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

  const characterResponseObject = useMemo<Character>(
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
    openParameters,
    showContinueArrow,
    showBubble,
    nextAction,
    handleParamsOpened,
    handleParamsClosed,
  } = useMultipleTextsOneByOneOnScene(dialogue.texts, {
    nextScene: () => {
      setShowResponse(true);
    },
  });

  const click = useButtonHandleClick();

  const handleClickResponse = useCallback(
    (event: React.MouseEvent<any, MouseEvent>, response: ResponseType) => {
      click(event, {
        callback: () => {
          handleResponse(response);
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
    if (i < texts.length - 1) {
      nextAction();
    } else {
      setShowResponse(true);
    }
  }, [i, texts, nextAction]);

  return {
    showContinueArrow,
    showResponse,
    characterResponseObject,
    showBubble,
    responsesObject,
    imageAnimation,
    characterObject,
    text,
    openParameters,
    click,
    handleClickResponse,
    handleParamsOpened,
    handleClickManually,
    handleParamsClosed,
  };
};

export default useSceneDialogueScene;
