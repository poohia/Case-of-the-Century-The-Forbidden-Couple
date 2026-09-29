import { useCallback, useState } from "react";

import { useScene } from "../../../../../hooks";
import { SceneObject } from "../../../../../types";
import { SceneDiaporamaProps } from "../../../../game-types";
import { useVisualNovelText } from "../../components";

const useSceneDiaporamaScene = (data: SceneObject<SceneDiaporamaProps>) => {
  const { characterSpeak, slides, textBox } = data;

  const { optionsLoaded, nextScene } = useScene(data);

  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [textIndex, setTextIndex] = useState<number>(0);

  const slide = slides[slideIndex];
  const text = slide.content[textIndex]?.text;

  const isLastTextOfSlide = textIndex >= slide.content.length - 1;
  const isLastSlide = slideIndex >= slides.length - 1;

  const {
    isTypingComplete,
    forceInstant,
    handleTypingDone,
    handleForceInstant,
    resetTypingComplete,
  } = useVisualNovelText({ text });

  const handleAdvance = useCallback(() => {
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
    showContinueArrow: isTypingComplete,
    handleTypingDone,
    handleAdvance,
  };
};

export default useSceneDiaporamaScene;
