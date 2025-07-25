import { VisualNovelTextComponent } from "../../../../../components";
import { useGameProvider } from "../../../../../gameProvider";
import { BoxDialog, Character } from "../../../../game-types";
import ContinueArrowComponent from "../../components/ContinueArrowComponent";
import { SceneComicsDoubleTextTextContainer } from "../SceneComicsDoubleScene/styles";
import { VisualNovelTextContainer } from "./styles";

type SceneDialogueSceneTextContainerComponentProps = {
  optionsLoaded: boolean;
  showBubble?: boolean;
  characterObject: Character;
  boxDialog: BoxDialog;
  text: string;
  openParameters?: boolean;
  forceInstant?: boolean;
  showContinueArrow?: boolean;
  isTypingComplete?: boolean;
  handleTypingDone: () => void;
  handleClickManually: () => void;
};

const SceneDialogueSceneTextContainerComponent: React.FC<
  SceneDialogueSceneTextContainerComponentProps
> = (props) => {
  const {
    optionsLoaded,
    showBubble,
    characterObject,
    boxDialog,
    text,
    openParameters,
    forceInstant,
    showContinueArrow,
    isTypingComplete,
    handleTypingDone,
    handleClickManually,
  } = props;
  const { translateText } = useGameProvider();

  return (
    <SceneComicsDoubleTextTextContainer
      $showBuble={showBubble}
      $fontFamily={characterObject.fontFamily}
      $boxDialog={boxDialog}
      aria-label={translateText("aria_label_bubble", [
        {
          key: "character",
          value: characterObject._title,
        },
      ])}
    >
      {optionsLoaded && (
        <VisualNovelTextContainer $fontFamily={characterObject.fontFamily}>
          <VisualNovelTextComponent
            text={text}
            playSound={{ sound: characterObject.bleepSound }}
            paused={openParameters}
            instant={forceInstant}
            onDone={handleTypingDone}
          />
          {showContinueArrow && isTypingComplete && (
            <ContinueArrowComponent handleClick={handleClickManually} />
          )}
        </VisualNovelTextContainer>
      )}
    </SceneComicsDoubleTextTextContainer>
  );
};

export default SceneDialogueSceneTextContainerComponent;
