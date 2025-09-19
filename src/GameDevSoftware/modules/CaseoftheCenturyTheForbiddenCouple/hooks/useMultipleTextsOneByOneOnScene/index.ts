import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useGameProvider } from "../../../../../gameProvider";
import { useTimeout } from "../../../../../hooks";
import { DelayScrollText } from "../../../../game-types";
import { useVisualNovelText } from "../../../../../components";
import PointsContext from "../../contexts/PointsContext";

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
  const { points, addPoints } = useContext(PointsContext);

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

  const textScrollingRef = useRef(textScrolling);
  useEffect(() => {
    textScrollingRef.current = textScrolling;
  }, [textScrolling]);

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
  console.log("🚀 ~ useMultipleTextsOneByOneOnScene ~ text:", texts, i, text);

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

  const {
    isTypingComplete,
    forceInstant,
    handleTypingDone,
    handleForceInstant,
    resetTypingComplete,
  } = useVisualNovelText({ text });

  const canAutoNextActionRef = useRef(isTypingComplete);
  useEffect(() => {
    canAutoNextActionRef.current = isTypingComplete;
  }, [isTypingComplete]);

  const handleParamsOpened = useCallback(() => {
    timerNextAction.pause();
    setOpenParemeters(true);
  }, [timerNextAction]);

  const handleParamsClosed = useCallback(() => {
    setOpenParemeters(false);
    if (
      typeof textScrollingRef.current === "undefined" ||
      textScrollingRef.current === "0"
    ) {
      timerNextAction.clear();
      setTimeout(() => {
        setShowContinueArrow(true);
      }, timeoutToShowContinueArrow);
    } else if (canAutoNextActionRef.current) {
      timerNextAction.resume();
      setShowContinueArrow(false);
    }
  }, [timerNextAction, isTypingComplete]);

  const nextAction = useCallback(() => {
    timerNextAction.clear();
    setShowContinueArrow(false);

    setI((_i) => {
      if (_i >= textsLength - 1) {
        if (
          textScrollingRef.current !== undefined &&
          textScrollingRef.current !== "0"
        ) {
          nextScene?.();
        }
        return _i;
      }

      // if (
      //   textScrollingRef.current !== undefined &&
      //   textScrollingRef.current !== "0"
      // ) {
      //   setTimeout(() => {
      //     setShowContinueArrow(false);
      //     // timerNextAction.restart();
      //   });
      // }

      // if (
      //   textScrollingRef.current !== undefined &&
      //   textScrollingRef.current === "0"
      // ) {
      //   setTimeout(() => {
      //     setShowContinueArrow(true);
      //   }, timeoutToShowContinueArrow);
      // }
      return _i + 1;
    });
    resetTypingComplete();
  }, [texts, textsLength, nextScene, handleParamsClosed]);

  useEffect(() => {
    // if (!canAutoNextActionRef.current) {
    //   return;
    // }
    // if (textScrolling === "undefined" || textScrolling === "0") {
    //   setTimeout(() => {
    //     setShowContinueArrow(true);
    //   }, timeoutToShowContinueArrow);
    //   return;
    // }
    // timerNextAction.start();
  }, []);

  useEffect(() => {
    console.log("restart texts", texts, canAutoNextActionRef);
    setI(0);
    setShowContinueArrow(false);

    if (!canAutoNextActionRef.current) {
      return;
    }
    console.log("restart textScrolling", textScrolling);

    if (typeof textScrolling === "undefined" || textScrolling === "0") {
      // setTimeout(() => {
      //   setShowContinueArrow(true);
      // }, timeoutToShowContinueArrow);
      timerNextAction.clear();
      return;
    }

    if (textScrolling !== "0") {
      // timerNextAction.restart();
    }
  }, [texts]);

  useEffect(() => {
    console.log("restart 2", isTypingComplete, canAutoNextActionRef);
    if (!canAutoNextActionRef.current) {
      timerNextAction.clear();
      return;
    }
    if (textScrolling !== "0") {
      timerNextAction.restart();
    } else if (typeof textScrolling === "undefined" || textScrolling === "0") {
      setTimeout(() => {
        console.log("i'm here!!");
        setShowContinueArrow(true);
      }, timeoutToShowContinueArrow);
      timerNextAction.clear();
      return;
    }
  }, [i, isTypingComplete]);

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
    /** */
    isTypingComplete,
    forceInstant,
    handleTypingDone,
    handleForceInstant,
  };
};

export default useMultipleTextsOneByOneOnScene;
