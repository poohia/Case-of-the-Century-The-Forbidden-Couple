import { useCallback, useEffect, useMemo, useState } from "react";
import { useGameProvider } from "../../../../../gameProvider";
import { useTimeout } from "../../../../../hooks";
import { DelayScrollText } from "../../../../game-types";

const useMultipleTextsOneByOneOnScene = (
  texts: { content: string }[],
  opts: {
    nextScene?: () => void;
  } = {}
) => {
  const { nextScene } = opts;
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

  const timerNextAction = useTimeout(() => {
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

  const handleParamsOpened = useCallback(() => {
    timerNextAction.pause();
    setOpenParemeters(true);
  }, [timerNextAction]);

  const handleParamsClosed = useCallback(() => {
    setOpenParemeters(false);
    if (typeof textScrolling === "undefined" || textScrolling === "0") {
      timerNextAction.clear();
      if (!canNextScene) {
        setShowContinueArrow(true);
      }
    } else {
      timerNextAction.resume();
      setShowContinueArrow(false);
    }
  }, [textScrolling, canNextScene]);

  const nextAction = useCallback(() => {
    timerNextAction.clear();
    setShowContinueArrow(false);
    setI((_i) => {
      if (_i >= texts.length - 1) {
        if (textScrolling !== undefined && textScrolling !== "0") {
          setTimeout(() => {
            if (nextScene) {
              nextScene();
            }
          }, vitessScrollText);
        }
        return _i;
      }

      if (textScrolling !== undefined && textScrolling !== "0") {
        setTimeout(() => {
          setShowContinueArrow(false);
          timerNextAction.restart();
        });
      }

      if (textScrolling !== undefined && textScrolling === "0") {
        setTimeout(() => {
          setShowContinueArrow(true);
        }, timeoutToShowContinueArrow);
      }

      return _i + 1;
    });
  }, [textScrolling, texts, vitessScrollText, nextScene]);

  const resetScene = useCallback(() => {
    setI(0);

    if (textScrolling === "undefined" || textScrolling === "0") {
      setTimeout(() => {
        setShowContinueArrow(true);
      }, timeoutToShowContinueArrow);
      return;
    }
    timerNextAction.start();
  }, [textScrolling]);

  //  use Effect au démarrage
  useEffect(() => {
    if (textScrolling === "undefined" || textScrolling === "0") {
      setTimeout(() => {
        setShowContinueArrow(true);
      }, timeoutToShowContinueArrow);
      return;
    }
    timerNextAction.start();
  }, []);

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
    nextAction,
    handleParamsOpened,
    handleParamsClosed,
    resetScene,
  };
};

export default useMultipleTextsOneByOneOnScene;
