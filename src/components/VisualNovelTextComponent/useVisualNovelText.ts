import { useCallback, useEffect, useState } from "react";

import { useGameProvider } from "../../gameProvider";

type useVisualNovelTextProps = {
  text: string;
};

const useVisualNovelText = ({ text }: useVisualNovelTextProps) => {
  const {
    parameters: { screenReaderEnabled },
  } = useGameProvider();
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);
  const [forceInstant, setForceInstant] = useState<boolean>(false);

  const handleTypingDone = useCallback(() => {
    setIsTypingComplete(true);
  }, []);

  const handleForceInstant = useCallback(() => {
    setIsTypingComplete(true);
    setForceInstant(true);
  }, []);

  const resetTypingComplete = useCallback(() => {
    if (!screenReaderEnabled) {
      setIsTypingComplete(false);
      setForceInstant(false);
    }
  }, [screenReaderEnabled]);

  useEffect(() => {
    if (!screenReaderEnabled) {
      setIsTypingComplete(false);
      setForceInstant(false);
    }
  }, [text]);

  useEffect(() => {
    if (screenReaderEnabled) {
      setIsTypingComplete(true);
    } else {
      setIsTypingComplete(false);
    }
  }, [screenReaderEnabled]);

  return {
    isTypingComplete,
    forceInstant,
    handleTypingDone,
    handleForceInstant,
    resetTypingComplete,
  };
};

export default useVisualNovelText;
