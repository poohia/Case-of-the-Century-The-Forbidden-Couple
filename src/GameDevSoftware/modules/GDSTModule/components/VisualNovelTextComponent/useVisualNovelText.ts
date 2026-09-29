import { useCallback, useEffect, useRef, useState } from "react";

import { useGameProvider } from "../../../../../gameProvider";

type useVisualNovelTextProps = {
  text: string;
};

const FORCE_INSTANT_DELAY = 500;

const useVisualNovelText = ({ text }: useVisualNovelTextProps) => {
  const {
    parameters: { screenReaderEnabled },
  } = useGameProvider();
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);
  const [forceInstant, setForceInstant] = useState<boolean>(false);
  const [nextActionClickable, setNextActionClickable] = useState<boolean>(true);

  const forceInstantTimeoutRef = useRef<NodeJS.Timeout>();

  const clearForceInstantTimeout = useCallback(() => {
    if (forceInstantTimeoutRef.current) {
      clearTimeout(forceInstantTimeoutRef.current);
      forceInstantTimeoutRef.current = undefined;
    }
  }, []);

  const handleTypingDone = useCallback(() => {
    setIsTypingComplete(true);
  }, []);

  const handleForceInstant = useCallback(() => {
    setForceInstant(true);
    setNextActionClickable(false);

    clearForceInstantTimeout();
    forceInstantTimeoutRef.current = setTimeout(() => {
      setNextActionClickable(true);
    }, FORCE_INSTANT_DELAY);
  }, [clearForceInstantTimeout]);

  const resetTypingComplete = useCallback(() => {
    if (!screenReaderEnabled) {
      setIsTypingComplete(false);
      setForceInstant(false);
    }
    setNextActionClickable(true);
    clearForceInstantTimeout();
  }, [screenReaderEnabled, clearForceInstantTimeout]);

  useEffect(() => {
    if (!screenReaderEnabled) {
      setIsTypingComplete(false);
      setForceInstant(false);
    }
    setNextActionClickable(true);
    clearForceInstantTimeout();
  }, [text]);

  useEffect(() => {
    if (screenReaderEnabled) {
      setIsTypingComplete(true);
    } else {
      setIsTypingComplete(false);
    }
  }, [screenReaderEnabled]);

  useEffect(() => clearForceInstantTimeout, [clearForceInstantTimeout]);

  return {
    isTypingComplete,
    forceInstant,
    nextActionClickable,
    handleTypingDone,
    handleForceInstant,
    resetTypingComplete,
  };
};

export default useVisualNovelText;
