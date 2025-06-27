import { useCallback, useEffect, useMemo, useState } from "react";
import { useGameProvider } from "../../../../../gameProvider";
import { useTimeout } from "../../../../../hooks";
import { DelayScrollText } from "../../../../game-types";

const useMultipleTextsOneByOneOnScene = (
  texts: { content: string }[],
  nextScene?: () => void,
  doResetScene = false
) => {
  const {
    parameters: { textScrolling },
    getEnvVar,
    getValueFromConstant,
  } = useGameProvider();

  const [i, setI] = useState<number>(0);
  const [openParameters, setOpenParemeters] = useState<boolean>(false);
  const [showContinueArrow, setShowContinueArrow] = useState<boolean>(false);

  const [low, normal, fast] =
    getValueFromConstant<DelayScrollText[]>("delayscrolltext");
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
    return texts[i]?.content || "";
  }, [i, texts]);
  const canNextScene = useMemo(() => i >= texts.length - 1, [i, texts]);
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
      if (!canNextScene) {
        setShowContinueArrow(true);
      }
    } else {
      resume();
      setShowContinueArrow(false);
    }
  }, [textScrolling, canNextScene]);

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
      if (textScrolling !== undefined && textScrolling === "0") {
        setTimeout(() => {
          setShowContinueArrow(true);
        }, timeoutToShowContinueArrow);
      }

      return _i + 1;
    });
  }, [textScrolling, texts]);

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
        if (nextScene) {
          nextScene();
        }
        setTimeout(() => {
          if (doResetScene) {
            resetScene();
          }
        });
      }, timeoutToShowContinueArrow);
    }
  }, [canNextScene, autoNextScene, timeoutToShowContinueArrow]);

  useEffect(() => {
    setI(0);
  }, [texts]);

  return {
    i,
    text,
    openParameters,
    showContinueArrow,
    canNextScene,
    showBubble,
    autoNextScene,
    textScrolling,
    vitessScrollText,
    setOpenParemeters,
    nextAction,
    resetScene,
    handleParamsClosed,
    pause,
  };
};

export default useMultipleTextsOneByOneOnScene;
