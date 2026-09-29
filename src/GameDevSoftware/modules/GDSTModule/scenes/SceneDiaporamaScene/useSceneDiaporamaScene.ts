import { useCallback, useEffect, useState } from "react";

import { useScene } from "../../../../../hooks";
import { SceneObject } from "../../../../../types";
import { SceneDiaporamaProps } from "../../../../game-types";
import { useVisualNovelText } from "../../components";

const SHOW_FRAME_DELAY = 1000;
const SHOW_TEXT_AFTER_FRAME_DELAY = 500;
const SHOW_TEXT_DELAY = SHOW_FRAME_DELAY + SHOW_TEXT_AFTER_FRAME_DELAY;

const useSceneDiaporamaScene = (data: SceneObject<SceneDiaporamaProps>) => {
  const { characterSpeak, slides, textBox } = data;

  const { optionsLoaded, nextScene } = useScene(data);

  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [textIndex, setTextIndex] = useState<number>(0);

  const [showFrame, setShowFrame] = useState<boolean>(false);
  const [showText, setShowText] = useState<boolean>(false);

  const slide = slides[slideIndex];
  const text = slide.content[textIndex]?.text;

  useEffect(() => {
    setShowFrame(false);
    setShowText(false);

    const frameTimeout = setTimeout(() => {
      setShowFrame(true);
    }, SHOW_FRAME_DELAY);

    const textTimeout = setTimeout(() => {
      setShowText(true);
    }, SHOW_TEXT_DELAY);

    return () => {
      clearTimeout(frameTimeout);
      clearTimeout(textTimeout);
    };
  }, [slideIndex]);

  const isLastTextOfSlide = textIndex >= slide.content.length - 1;
  const isLastSlide = slideIndex >= slides.length - 1;

  const {
    isTypingComplete,
    forceInstant,
    nextActionClickable,
    handleTypingDone,
    handleForceInstant,
    resetTypingComplete,
  } = useVisualNovelText({ text });

  const handleAdvance = useCallback(() => {
    if (!nextActionClickable) {
      return;
    }

    if (!isTypingComplete) {
      handleForceInstant();
      return;
    }

    resetTypingComplete();

    if (!isLastTextOfSlide) {
      setTextIndex((i) => i + 1);
      return;
    }

    if (!isLastSlide) {
      setSlideIndex((s) => s + 1);
      setTextIndex(0);
      return;
    }

    nextScene();
  }, [
    nextActionClickable,
    isTypingComplete,
    isLastTextOfSlide,
    isLastSlide,
    handleForceInstant,
    resetTypingComplete,
    nextScene,
  ]);

  return {
    optionsLoaded,
    slide,
    slideIndex,
    text,
    characterSpeak,
    textBox,
    isTypingComplete,
    forceInstant,
    nextActionClickable,
    showFrame,
    showText,
    showContinueArrow: isTypingComplete && nextActionClickable,
    handleTypingDone,
    handleAdvance,
  };
};

export default useSceneDiaporamaScene;
