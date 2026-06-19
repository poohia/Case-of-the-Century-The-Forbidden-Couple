import { useCallback, useEffect, useMemo, useState } from "react";

import {
  ChoiceInterface,
  DialogueInterface,
  NpcInterface,
} from "../../GameDevSoftware/game-types";
import useVisualNovelText from "./useVisualNovelText";
import { useGameObjects } from "../../hooks";
import { useGameProvider } from "../../gameProvider";
import { DialoguePlayback } from "../../types";
import useVisualNovelChoices from "./useVisualNovelChoices";
import useLastDialog from "./useLastDialog";
import { useItems } from "../../GameDevSoftware/modules/GDSTModule/itemsUtilities";

const [low, normal, fast] = [4500, 2700, 1500];

const useVisualNovelDialog = (opts: {
  characterGO: NpcInterface;
  handleActionUniqKey?: (actionUniqKey: string) => void;
}) => {
  const { characterGO, handleActionUniqKey } = opts;

  const { getGameObject } = useGameObjects();
  const {
    parameters: { dialogueSpeed },
  } = useGameProvider();
  const { lastDialogId, handleNextDialog, clearLastDialog } = useLastDialog();
  const { filterChoices, handleClickChoice: handleClickChoiceHook } =
    useVisualNovelChoices();
  const { unLockItem } = useItems();

  /** */
  const [dialogGo, setDialogGo] = useState<DialogueInterface>(
    getGameObject<DialogueInterface>(
      lastDialogId?.toString() ?? characterGO.dialogueEnter
    )
  );
  const [choicesGo, setChoicesGo] = useState<ChoiceInterface[]>([]);
  /** */
  const [textIndex, setTextIndex] = useState<number>(0);
  const text = useMemo(
    () => dialogGo.texts[textIndex].text,
    [dialogGo, textIndex]
  );
  /** */
  const [currentDialogIsLeaveDialog, setCurrentDialogIsLeaveDialog] =
    useState<boolean>(false);
  const [dialogIsEnded, setDialogIsEnded] = useState<boolean>(false);

  const nextDialogTimeout = useMemo(() => {
    switch (dialogueSpeed) {
      case DialoguePlayback.Slow:
        return low;
      case DialoguePlayback.Fast:
        return fast;
      case DialoguePlayback.Normal:
      default:
        return normal;
    }
  }, [dialogueSpeed]);

  const {
    isTypingComplete,
    forceInstant,
    handleTypingDone,
    handleForceInstant,
    resetTypingComplete,
  } = useVisualNovelText({ text });

  /** */
  const canManualNext = useMemo<boolean>(
    () =>
      (isTypingComplete && dialogueSpeed === DialoguePlayback.Manual) ||
      !isTypingComplete,
    [isTypingComplete, dialogueSpeed]
  );

  const handleLeave = useCallback(() => {
    setTextIndex(0);
    setDialogGo(getGameObject<DialogueInterface>(characterGO.dialogueLeave));
    setCurrentDialogIsLeaveDialog(true);
    handleNextDialog(characterGO.dialogueLeave);
  }, [handleNextDialog]);

  // Soit afficher les choix, soit afficher dialogLeave, soit set dialogIsEnded à true
  const nextAction = useCallback(
    (force = false) => {
      const nextDialogue = () => {
        const choicesGo = filterChoices(
          (dialogGo.choices ?? []).map(
            (choice) => getGameObject<ChoiceInterface>(choice)!
          )
        );
        if (textIndex + 1 < dialogGo.texts.length) {
          setTextIndex(textIndex + 1);
        } else if (dialogGo.choices) {
          setChoicesGo(choicesGo);
        } else if (currentDialogIsLeaveDialog) {
          setDialogIsEnded(true);
        } else if (!dialogGo.choices) {
          handleLeave();
        }
      };
      if (dialogueSpeed === DialoguePlayback.Manual && !force) {
        return;
      } else if (dialogueSpeed === DialoguePlayback.Manual && force) {
        nextDialogue();
      } else {
        setTimeout(() => {
          nextDialogue();
        }, nextDialogTimeout);
      }
    },
    [
      currentDialogIsLeaveDialog,
      textIndex,
      dialogGo,
      dialogueSpeed,
      filterChoices,
    ]
  );

  const handleClickManually = useCallback(() => {
    if (!isTypingComplete) {
      handleForceInstant();
      handleTypingDone();
      return;
    }

    // if (!showContinueArrow) {
    //   return;
    // }

    nextAction(true);
  }, [isTypingComplete, nextAction]);

  const handleClickChoice = useCallback(
    (choiceGo: ChoiceInterface) => {
      handleClickChoiceHook(choiceGo._id);
      setChoicesGo([]);
      if (choiceGo.dialogue) {
        setTextIndex(0);
        setDialogGo(getGameObject<DialogueInterface>(choiceGo.dialogue)!);
        handleNextDialog(choiceGo.dialogue);
      } else {
        handleLeave();
      }
      if (choiceGo.actionUniqKey && handleActionUniqKey) {
        handleActionUniqKey(choiceGo.actionUniqKey);
      }
      if (choiceGo.unLockItem) {
        unLockItem(choiceGo.unLockItem);
      }
    },
    [handleClickChoiceHook, handleNextDialog]
  );

  useEffect(() => {
    if (isTypingComplete) {
      nextAction();
    }
  }, [dialogueSpeed, isTypingComplete]);

  useEffect(() => {
    if (
      dialogGo._id === Number(characterGO.dialogueLeave.replace("@go:", ""))
    ) {
      setCurrentDialogIsLeaveDialog(true);
    }
  }, [dialogGo]);

  useEffect(() => {
    if (dialogIsEnded) {
      clearLastDialog();
    }
  }, [dialogIsEnded]);

  return {
    text,
    choicesGo,
    dialogIsEnded,
    canManualNext,
    handleClickManually,
    handleClickChoice,
    /** */
    isTypingComplete,
    forceInstant,
    handleTypingDone,
    handleForceInstant,
    resetTypingComplete,
  };
};

export default useVisualNovelDialog;
