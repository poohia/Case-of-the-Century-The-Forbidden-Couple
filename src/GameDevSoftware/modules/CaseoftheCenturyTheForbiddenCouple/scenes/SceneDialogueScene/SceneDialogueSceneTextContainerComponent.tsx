import { VisualNovelTextComponent } from "../../../../../components";
import {
  CharacterInterface,
  SceneComicsDoubleProps,
} from "../../../../game-types";
import ContinueArrowComponent from "../../components/ContinueArrowComponent";
import { SceneComicsDoubleTextTextContainer } from "../SceneComicsDoubleScene/styles";
import { VisualNovelTextContainer } from "./styles";

type SceneDialogueSceneTextContainerComponentProps = {
  optionsLoaded: boolean;
  showBubble?: boolean;
  characterObject: CharacterInterface;
  boxDialog: SceneComicsDoubleProps["boxDialog"];
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

  return (
    <SceneComicsDoubleTextTextContainer
      $showBuble={showBubble}
      $fontFamily={characterObject.fontFamily}
      $boxDialog={boxDialog}
    >
      {optionsLoaded && (
        <VisualNovelTextContainer $fontFamily={characterObject.fontFamily}>
          <VisualNovelTextComponent
            characterName={characterObject._title}
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
