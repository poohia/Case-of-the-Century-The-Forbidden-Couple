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

  useEffect(() => {
    setIsTypingComplete(false);
    setForceInstant(false);
  }, [text]);

  return {
    isTypingComplete,
    forceInstant,
    handleTypingDone,
    handleForceInstant,
  };
};

export default useVisualNovelText;
