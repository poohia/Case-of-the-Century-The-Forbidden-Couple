import {
  ImgBackgroundComponent,
  PageComponent,
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
    forceInstant,
    nextActionClickable,
    showFrame,
    showText,
    showContinueArrow,
    handleTypingDone,
    handleAdvance,
  } = useSceneDiaporamaScene(props.data);

  const click = useButtonHandleClick();

  return (
    <PageComponent>
      <SceneDiaporamaSceneContainer
        $nextManually={nextActionClickable}
        onClick={(e) => {
          click(e, { callback: handleAdvance });
        }}
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
        {textBox.backgroundImage && showFrame && (
          <TextBoxFrameImg
            src={textBox.backgroundImage}
            $textBox={textBox}
            forceMaxSize={false}
            aria-hidden="true"
            className="animate__animated animate__bounceIn"
          />
        )}
        {optionsLoaded && showText && (
          <TextBoxContainer $textBox={textBox}>
            <VisualNovelTextComponent
              text={text}
              characterName={characterSpeak}
              instant={forceInstant}
              onDone={handleTypingDone}
            />
            {showContinueArrow && (
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
    </PageComponent>
  );
};

export default SceneDiaporamaScene;
