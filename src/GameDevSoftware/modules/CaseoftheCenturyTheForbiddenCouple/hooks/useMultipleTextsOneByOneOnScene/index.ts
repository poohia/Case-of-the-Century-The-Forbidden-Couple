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
import {
  DelayScrollText,
  UnlockCharacter,
  UnlockNoteInspecteur,
  UnlockScenario,
  UnlockText,
} from "../../../../game-types";
import { useVisualNovelText } from "../../../../../components";
import PointsContext from "../../contexts/PointsContext";
import UnlockContext from "../../contexts/UnlockContext";
import { UnLockProps } from "../useUnlock";
import { DialoguePlayback } from "../../../../../types";

const useMultipleTextsOneByOneOnScene = (
  idScene: number,
  texts: {
    content: string;
    unlockNoteInspecteur?: UnlockNoteInspecteur[];
    unlockTexts?: UnlockText[];
    unlockCharacter?: UnlockCharacter[];
    unlockScenario?: UnlockScenario[];
    points?: number;
  }[],
  opts: {
    autoStart?: boolean;
    nextScene?: () => void;
  } = {}
) => {
  const { autoStart = true, nextScene } = opts;
  const {
    parameters: { dialogueSpeed: textScrolling, instantTextReveal },
    getEnvVar,
    getValueFromConstant,
  } = useGameProvider();
  const { points, addPoints } = useContext(PointsContext);
  const { unLock } = useContext(UnlockContext);

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
      case DialoguePlayback.Slow:
        return low;
      case DialoguePlayback.Fast:
        return fast;
      case DialoguePlayback.Normal:
      default:
        return normal;
    }
  }, [textScrolling]);

  const text = useMemo(() => {
    return texts[i]?.content;
  }, [i, texts]);

  const unlockObject = useMemo<UnLockProps>(() => {
    return {
      unlockNoteInspecteur: texts[i]?.unlockNoteInspecteur,
      unlockTexts: texts[i]?.unlockTexts,
      unlockCharacter: texts[i]?.unlockCharacter,
      unlockScenario: texts[i]?.unlockScenario,
    };
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
      textScrolling !== DialoguePlayback.Manual,
    [canNextScene, textScrolling]
  );

  const [timeOutCalled, setTimeoutCalled] = useState<null | number>(null);

  const currentTexts = useRef<any>(texts);
  useEffect(() => {
    currentTexts.current = texts;
  }, [texts]);

  const timerNextAction = useTimeout(() => {
    setTimeoutCalled(new Date().getTime());
    nextAction();
  }, vitessScrollText);

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
      textScrollingRef.current === DialoguePlayback.Manual
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
    resetTypingComplete();
    setShowContinueArrow(false);

    setI((_i) => {
      if (_i >= currentTexts.current.length - 1) {
        if (
          textScrollingRef.current !== undefined &&
          textScrollingRef.current !== DialoguePlayback.Manual
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

      if (
        textScrollingRef.current !== undefined &&
        textScrollingRef.current === DialoguePlayback.Manual &&
        instantTextReveal
      ) {
        setTimeout(() => {
          setShowContinueArrow(true);
        }, timeoutToShowContinueArrow);
      }
      return _i + 1;
    });
    resetTypingComplete();
  }, [currentTexts, nextScene, handleParamsClosed]);

  const responseIfInstantTextReveal = useCallback(() => {
    if (instantTextReveal) {
      timerNextAction.restart();
    }
  }, [timerNextAction]);

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
    if (!autoStart) {
      return;
    }
    resetTypingComplete();
    setI(0);
    setShowContinueArrow(false);

    if (!canAutoNextActionRef.current) {
      return;
    }

    if (
      typeof textScrolling === "undefined" ||
      textScrolling === DialoguePlayback.Manual
    ) {
      setTimeout(() => {
        setShowContinueArrow(true);
      }, timeoutToShowContinueArrow);
      timerNextAction.clear();
      return;
    }

    // if (textScrolling !== DialoguePlayback.Manual) {
    //   // timerNextAction.restart();
    // }
  }, [texts, autoStart]);

  useEffect(() => {
    if (!autoStart) {
      return;
    }
    if (!canAutoNextActionRef.current) {
      timerNextAction.clear();
      return;
    }
    if (textScrolling !== DialoguePlayback.Manual) {
      timerNextAction.restart();
    } else if (
      typeof textScrolling === "undefined" ||
      textScrolling === DialoguePlayback.Manual
    ) {
      setTimeout(() => {
        setShowContinueArrow(true);
      }, timeoutToShowContinueArrow);
      timerNextAction.clear();
      return;
    }
  }, [i, isTypingComplete, autoStart]);

  useEffect(() => {
    if (!autoStart) {
      return;
    }
    if (i > 0 && textScrolling !== DialoguePlayback.Manual) {
      addPoints(keyTextPrev, addPointsValuePrev);
    }
  }, [i, autoStart]);

  useEffect(() => {
    if (!autoStart) {
      return;
    }
    if (canNextScene && textScrolling !== DialoguePlayback.Manual) {
      setTimeout(() => {
        addPoints(keyText, addPointsValue);
      }, vitessScrollText);
    }
  }, [timeOutCalled, autoStart]);

  useEffect(() => {
    if (
      unlockObject.unlockNoteInspecteur?.length ||
      unlockObject.unlockTexts?.length ||
      unlockObject.unlockCharacter?.length ||
      unlockObject.unlockScenario?.length
    ) {
      unLock(unlockObject);
    }
  }, [unlockObject]);

  return {
    /** */
    i,
    setI,
    /** */
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
    resetTypingComplete,
    /** */
    responseIfInstantTextReveal,
  };
};

export default useMultipleTextsOneByOneOnScene;
