import { useCallback, useEffect, useMemo, useState } from "react";
import { useGameProvider } from "../../../../../gameProvider";
import { useTimeout } from "../../../../../hooks";
import { DelayScrollText } from "../../../../game-types";
import usePointsGame from "../usePointsGame";

const useMultipleTextsOneByOneOnScene = (
  idScene: number,
  texts: { content: string; points?: number }[],
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
  const { points, addPoints } = usePointsGame();

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

  const text = useMemo(() => {
    return texts[i]?.content;
  }, [i, texts]);

  const addPointsValue = useMemo(() => {
    return texts[i]?.points || 0;
  }, [i, texts]);

  const addPointsValuePrev = useMemo(() => {
    return texts[i - 1]?.points || 0;
  }, [i, texts]);
  const keyText = useMemo(() => `${idScene}-${i}`, [i]);
  const keyTextPrev = useMemo(() => `${idScene}-${i - 1}`, [i]);

  const textsLength = useMemo(() => texts.length, [texts]);
  const canNextScene = useMemo(() => {
    return i >= textsLength - 1;
  }, [i, textsLength, texts]);
  const autoNextScene = useMemo(
    () =>
      canNextScene &&
      typeof textScrolling !== "undefined" &&
      textScrolling !== "0",
    [canNextScene, textScrolling]
  );

  const [timeOutCalled, setTimeoutCalled] = useState<null | number>(null);

  const timerNextAction = useTimeout(
    () => {
      setTimeoutCalled(new Date().getTime());
      nextAction();
    },
    vitessScrollText,
    [i]
  );

  const handleParamsOpened = useCallback(() => {
    timerNextAction.pause();
    setOpenParemeters(true);
  }, [timerNextAction]);

  const handleParamsClosed = useCallback(() => {
    setOpenParemeters(false);
    if (typeof textScrolling === "undefined" || textScrolling === "0") {
      timerNextAction.clear();
      setTimeout(() => {
        setShowContinueArrow(true);
      }, timeoutToShowContinueArrow);
    } else {
      timerNextAction.resume();
      setShowContinueArrow(false);
    }
  }, [textScrolling, timerNextAction]);

  const nextAction = useCallback(() => {
    timerNextAction.clear();
    setShowContinueArrow(false);

    setI((_i) => {
      if (_i >= textsLength - 1) {
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
  }, [
    textScrolling,
    texts,
    vitessScrollText,
    textsLength,
    nextScene,
    handleParamsClosed,
  ]);

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
    setShowContinueArrow(false);

    if (typeof textScrolling === "undefined" || textScrolling === "0") {
      setTimeout(() => {
        setShowContinueArrow(true);
      }, timeoutToShowContinueArrow);
      timerNextAction.clear();
      return;
    }

    if (textScrolling !== "0") {
      timerNextAction.restart();
    }
  }, [texts]);

  useEffect(() => {}, [i]);

  useEffect(() => {
    if (i > 0 && textScrolling !== "0") {
      addPoints(keyTextPrev, addPointsValuePrev);
    }
  }, [i]);

  useEffect(() => {
    if (canNextScene && textScrolling !== "0") {
      setTimeout(() => {
        addPoints(keyText, addPointsValue);
      }, vitessScrollText);
    }
  }, [timeOutCalled]);

  return {
    i,
    text,
    keyText,
    addPointsValue,
    openParameters,
    showContinueArrow,
    canNextScene,
    showBubble,
    autoNextScene,
    textScrolling,
    vitessScrollText,
    points,
    nextAction,
    handleParamsOpened,
    handleParamsClosed,
    addPoints,
  };
};

export default useMultipleTextsOneByOneOnScene;
