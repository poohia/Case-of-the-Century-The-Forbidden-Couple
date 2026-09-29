import {
  ImgBackgroundComponent,
  PageComponent,
  TranslationComponent,
} from "../../../../../components";
import { SceneComponentProps } from "../../../../../types";
import {
  VisualNovelTextComponentProps,
  VisualNovelTextsComponent,
} from "../../components";
import useSceneDiaporamaScene from "./useSceneDiaporamaScene";

export interface SceneDiaporamaProps {
  _id: number;
  _title: string;
  characterSpeak: string;
  characterSpeakSound: VisualNovelTextComponentProps["playSound"];
  slides: {
    sceneDescription: string;
    image: string;
    content: { text: string }[];
  }[];
  textBox: {
    backgroundImage?: string;
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

const SceneDiaporamaScene: SceneComponentProps<{}, SceneDiaporamaProps> = (
  props
) => {
  const {
    optionsLoaded,
    slide,
    slideIndex,
    texts,
    characterSpeak,
    characterSpeakSound,
    textBox,
    handleSlideDone,
  } = useSceneDiaporamaScene(props.data);

  if (!optionsLoaded) {
    return null;
  }

  return (
    <PageComponent>
      <VisualNovelTextsComponent
        resetKey={slideIndex}
        texts={texts}
        textBox={textBox}
        characterName={characterSpeak}
        playSound={characterSpeakSound}
        onDone={handleSlideDone}
      >
        <ImgBackgroundComponent
          key={slideIndex}
          className="animate__animated animate__fadeIn"
          src={slide.image}
          forceMaxSize={false}
        />
        <TranslationComponent
          id={slide.sceneDescription}
          srOnly
          aria-live="polite"
        />
      </VisualNovelTextsComponent>
    </PageComponent>
  );
};

export default SceneDiaporamaScene;
