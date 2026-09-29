import { useCallback, useState } from "react";

import { useScene } from "../../../../../hooks";
import { SceneObject } from "../../../../../types";
import { SceneDiaporamaProps } from ".";

const useSceneDiaporamaScene = (data: SceneObject<SceneDiaporamaProps>) => {
  const { slides, textBox, ...rest } = data;

  const { optionsLoaded, nextScene } = useScene(data);

  const [slideIndex, setSlideIndex] = useState<number>(0);

  const slide = slides[slideIndex];
  const texts = slide.content.map(({ text }) => text);
  const isLastSlide = slideIndex >= slides.length - 1;

  const handleSlideDone = useCallback(() => {
    if (!isLastSlide) {
      setSlideIndex((s) => s + 1);
      return;
    }

    nextScene();
  }, [isLastSlide, nextScene]);

  return {
    optionsLoaded,
    slide,
    slideIndex,
    texts,
    textBox,
    ...rest,
    handleSlideDone,
  };
};

export default useSceneDiaporamaScene;
