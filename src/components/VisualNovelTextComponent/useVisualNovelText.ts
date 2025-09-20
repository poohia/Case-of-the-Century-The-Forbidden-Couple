import { useCallback, useEffect, useState } from "react";
import { useGameProvider } from "../../gameProvider";

type useVisualNovelTextProps = {
  text: string;
};

const useVisualNovelText = ({ text }: useVisualNovelTextProps) => {
  const {
    parameters: { instantTextReveal },
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
    if (!instantTextReveal) {
      setIsTypingComplete(false);
      setForceInstant(false);
    }
  }, [instantTextReveal]);

  useEffect(() => {
    if (!instantTextReveal) {
      setIsTypingComplete(false);
      setForceInstant(false);
    }
  }, [text]);

  useEffect(() => {
    if (instantTextReveal) {
      setIsTypingComplete(true);
    } else {
      setIsTypingComplete(false);
    }
  }, [instantTextReveal]);

  return {
    isTypingComplete,
    forceInstant,
    handleTypingDone,
    handleForceInstant,
    resetTypingComplete,
  };
};

export default useVisualNovelText;
