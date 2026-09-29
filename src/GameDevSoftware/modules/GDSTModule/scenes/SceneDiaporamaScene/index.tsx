import {
  ImgBackgroundComponent,
  TranslationComponent,
} from "../../../../../components";
import { useButtonHandleClick } from "../../../../../hooks";
import { SceneComponentProps } from "../../../../../types";
import { SceneDiaporamaProps } from "../../../../game-types";
import { VisualNovelTextComponent } from "../../components";
import {
  ContinueArrow,
  ContinueArrowButton,
  SceneDiaporamaSceneContainer,
  TextBoxContainer,
  TextBoxFrameImg,
} from "./styles";
import useSceneDiaporamaScene from "./useSceneDiaporamaScene";

const SceneDiaporamaScene: SceneComponentProps<{}, SceneDiaporamaProps> = (
  props
) => {
  const {
    optionsLoaded,
    slide,
    slideIndex,
    text,
    characterSpeak,
    textBox,
    isTypingComplete,
    forceInstant,
    showContinueArrow,
    handleTypingDone,
    handleAdvance,
  } = useSceneDiaporamaScene(props.data);

  const click = useButtonHandleClick();

  return (
    <SceneDiaporamaSceneContainer
      $nextManually={!isTypingComplete || showContinueArrow}
      onClick={(e) => {
        click(e, { callback: handleAdvance });
      }}
    >
      <ImgBackgroundComponent
        key={slideIndex}
        className="animate__animated animate__fadeIn"
        src={slide.image}
      />
      <TranslationComponent
        id={slide.sceneDescription}
        srOnly
        aria-live="polite"
      />
      {textBox.backgroundImage && (
        <TextBoxFrameImg
          src={textBox.backgroundImage}
          $textBox={textBox}
          forceMaxSize={false}
          aria-hidden="true"
        />
      )}
      {optionsLoaded && (
        <TextBoxContainer $textBox={textBox}>
          <VisualNovelTextComponent
            text={text}
            characterName={characterSpeak}
            instant={forceInstant}
            onDone={handleTypingDone}
          />
          {showContinueArrow && isTypingComplete && (
            <ContinueArrowButton
              onClick={(e) => {
                click(e, { callback: handleAdvance, dontPlaySound: true });
              }}
            >
              <TranslationComponent
                id="diaporama_scene_continue_arrow"
                srOnly
              />
              <ContinueArrow aria-hidden="true" />
            </ContinueArrowButton>
          )}
        </TextBoxContainer>
      )}
    </SceneDiaporamaSceneContainer>
  );
};

export default SceneDiaporamaScene;
