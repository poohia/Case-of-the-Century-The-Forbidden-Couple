import { useCallback, useEffect, useMemo, useState } from "react";
import { useGameProvider } from "../../../../../gameProvider";
import { useTimeout } from "../../../../../hooks";

const useMultipleTextsOneByOneOnScene = (
  texts: { content: string }[],
  nextScene: () => void
) => {
  const {
    parameters: { textScrolling },
    getEnvVar,
    getValueFromConstant,
    oneTap,
  } = useGameProvider();

  const [i, setI] = useState<number>(0);
  const [openParameters, setOpenParemeters] = useState<boolean>(false);
  const [showContinueArrow, setShowContinueArrow] = useState<boolean>(false);

  const [low, normal, fast] = getValueFromConstant<number[]>("delayscrolltext");
  const timeoutToShowContinueArrow = getValueFromConstant<number>(
    "timeout_to_show_continue_arrow"
  );

  const showBubble = useMemo(() => {
    return !!getEnvVar("SHOW_BUBBLE");
  }, [getEnvVar]);

  const vitessScrollText = useMemo(() => {
    switch (textScrolling) {
      case "1":
        return low;
      case "3":
        return fast;
      case "2":
      default:
        return normal;
    }
  }, [textScrolling]);

  const { start, restart, pause, resume, clear } = useTimeout(() => {
    nextAction();
  }, vitessScrollText);

  const text = useMemo(() => {
    return texts[i].content;
  }, [i, texts]);
  const canNextScene = useMemo(() => i >= texts.length - 1, [i]);
  const autoNextScene = useMemo(
    () =>
      canNextScene &&
      typeof textScrolling !== "undefined" &&
      textScrolling !== "0",
    [canNextScene, textScrolling]
  );

  const handleParamsClosed = useCallback(() => {
    setOpenParemeters(false);
    if (typeof textScrolling === "undefined" || textScrolling === "0") {
      clear();
      setShowContinueArrow(true);
    } else {
      resume();
      setShowContinueArrow(false);
    }
  }, [textScrolling]);

  const resetScene = useCallback(() => {
    setI(0);
    if (textScrolling === "undefined" || textScrolling === "0") {
      setTimeout(() => {
        setShowContinueArrow(true);
      }, timeoutToShowContinueArrow);
      return;
    }
    start();
  }, [textScrolling]);

  const nextAction = useCallback(() => {
    clear();
    setShowContinueArrow(false);
    setI((_i) => {
      if (_i >= texts.length - 1) {
        return _i;
      }

      if (textScrolling !== undefined && textScrolling !== "0") {
        setTimeout(() => {
          setShowContinueArrow(false);
          restart();
        });
      }
      if (
        textScrolling !== undefined &&
        textScrolling === "0" &&
        _i + 1 < texts.length - 1
      ) {
        setTimeout(() => {
          setShowContinueArrow(true);
        }, timeoutToShowContinueArrow);
      }

      return _i + 1;
    });
  }, [textScrolling, texts]);

  //  use Effect au démarrage
  useEffect(() => {
    if (textScrolling === "undefined" || textScrolling === "0") {
      setTimeout(() => {
        setShowContinueArrow(true);
      }, timeoutToShowContinueArrow);
      return;
    }
    start();
  }, []);

  useEffect(() => {
    if (canNextScene && autoNextScene) {
      setTimeout(() => {
        nextScene();
        setTimeout(() => {
          resetScene();
        });
      }, timeoutToShowContinueArrow);
    }
  }, [canNextScene, autoNextScene, timeoutToShowContinueArrow]);

  return {
    i,
    text,
    openParameters,
    showContinueArrow,
    canNextScene,
    showBubble,
    autoNextScene,
    setOpenParemeters,
    nextAction,
    resetScene,
    handleParamsClosed,
    pause,
  };
};

export default useMultipleTextsOneByOneOnScene;
