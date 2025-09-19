import { useCallback, useEffect, useState } from "react";

type useVisualNovelTextProps = {
  text: string;
};

const useVisualNovelText = ({ text }: useVisualNovelTextProps) => {
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
    setIsTypingComplete(false);
    setForceInstant(false);
  }, []);

  useEffect(() => {
    setIsTypingComplete(false);
    setForceInstant(false);
  }, [text]);

  return {
    isTypingComplete,
    forceInstant,
    handleTypingDone,
    handleForceInstant,
    resetTypingComplete,
  };
};

export default useVisualNovelText;
