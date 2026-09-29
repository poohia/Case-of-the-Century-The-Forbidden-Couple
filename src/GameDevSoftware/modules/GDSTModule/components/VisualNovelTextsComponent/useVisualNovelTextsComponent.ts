import { useCallback, useEffect, useMemo, useState } from "react";

import { useGameProvider } from "../../../../../gameProvider";
import { DialoguePlayback } from "../../../../../types";
import { DelayscrolltextConstant } from "../../../../game-types";
import useVisualNovelText from "../VisualNovelTextComponent/useVisualNovelText";

const SHOW_FRAME_DELAY = 1000;
const SHOW_TEXT_AFTER_FRAME_DELAY = 500;
const SHOW_TEXT_DELAY = SHOW_FRAME_DELAY + SHOW_TEXT_AFTER_FRAME_DELAY;

type UseVisualNovelTextsComponentProps = {
  texts: string[];
  onDone?: () => void;
};

const useVisualNovelTextsComponent = ({
  texts,
  onDone,
}: UseVisualNovelTextsComponentProps) => {
  const {
    parameters: { dialogueSpeed },
    getValueFromConstant,
  } = useGameProvider();

  const [textIndex, setTextIndex] = useState<number>(0);
  const [showFrame, setShowFrame] = useState<boolean>(false);
  const [showText, setShowText] = useState<boolean>(false);

  const text = texts[textIndex];
  const isLastText = textIndex >= texts.length - 1;

  useEffect(() => {
    setShowFrame(false);
    setShowText(false);

    const frameTimeout = setTimeout(() => {
      setShowFrame(true);
    }, SHOW_FRAME_DELAY);

    const textTimeout = setTimeout(() => {
      setShowText(true);
    }, SHOW_TEXT_DELAY);

    return () => {
      clearTimeout(frameTimeout);
      clearTimeout(textTimeout);
    };
  }, []);

  const [low, normal, fast] =
    getValueFromConstant<DelayscrolltextConstant[]>("delayscrolltext");

  const autoAdvanceDelay = useMemo(() => {
    switch (dialogueSpeed) {
      case DialoguePlayback.Slow:
        return low;
      case DialoguePlayback.Fast:
        return fast;
      case DialoguePlayback.Normal:
        return normal;
      default:
        return undefined;
    }
  }, [dialogueSpeed, low, normal, fast]);

  const isAutoMode = autoAdvanceDelay !== undefined;

  const {
    isTypingComplete,
    forceInstant,
    nextActionClickable,
    handleTypingDone,
    handleForceInstant,
    resetTypingComplete,
  } = useVisualNovelText({ text });

  const goToNext = useCallback(() => {
    resetTypingComplete();

    if (!isLastText) {
      setTextIndex((i) => i + 1);
      return;
    }

    onDone?.();
  }, [isLastText, resetTypingComplete, onDone]);

  useEffect(() => {
    if (!isAutoMode || !isTypingComplete) {
      return;
    }

    const timeout = setTimeout(() => {
      goToNext();
    }, autoAdvanceDelay);

    return () => clearTimeout(timeout);
  }, [isAutoMode, isTypingComplete, autoAdvanceDelay, goToNext]);

  const handleAdvance = useCallback(() => {
    if (!nextActionClickable) {
      return;
    }

    if (!isTypingComplete) {
      handleForceInstant();
      return;
    }

    if (isAutoMode) {
      return;
    }

    goToNext();
  }, [
    nextActionClickable,
    isTypingComplete,
    isAutoMode,
    handleForceInstant,
    goToNext,
  ]);

  const nextManually = nextActionClickable && (!isTypingComplete || !isAutoMode);
  const showContinueArrow =
    isTypingComplete && nextActionClickable && !isAutoMode;

  return {
    text,
    showFrame,
    showText,
    forceInstant,
    nextManually,
    showContinueArrow,
    handleTypingDone,
    handleAdvance,
  };
};

export default useVisualNovelTextsComponent;
