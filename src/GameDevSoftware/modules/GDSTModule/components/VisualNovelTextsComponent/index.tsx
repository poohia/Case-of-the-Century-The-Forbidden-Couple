import { ReactNode } from "react";

import TranslationComponent from "../../../../../components/TranslationComponent";
import { useButtonHandleClick } from "../../../../../hooks";
import VisualNovelTextComponent, {
  VisualNovelTextComponentProps,
} from "../VisualNovelTextComponent";
import {
  ContinueArrow,
  ContinueArrowButton,
  TextBoxContainer,
  TextBoxFrameImg,
  VisualNovelTextsContainer,
  VisualNovelTextsTextBox,
} from "./styles";
import useVisualNovelTextsComponent from "./useVisualNovelTextsComponent";

export type { VisualNovelTextsTextBox };

export type VisualNovelTextsComponentProps = {
  texts: string[];
  textBox: VisualNovelTextsTextBox;
  characterName?: string;
  playSound?: VisualNovelTextComponentProps["playSound"];
  onDone?: () => void;
  children?: ReactNode;
  /** Changing this resets textIndex/showFrame/showText without remounting
   * the component, so aria-live regions inside stay mounted and their
   * content mutations keep getting announced (e.g. pass the slide index). */
  resetKey?: string | number;
};

const VisualNovelTextsComponent: React.FC<VisualNovelTextsComponentProps> = ({
  texts,
  textBox,
  characterName,
  playSound,
  onDone,
  children,
  resetKey,
}) => {
  const {
    text,
    showFrame,
    showText,
    forceInstant,
    nextManually,
    showContinueArrow,
    handleTypingDone,
    handleAdvance,
  } = useVisualNovelTextsComponent({ texts, onDone, resetKey });

  const click = useButtonHandleClick();

  return (
    <VisualNovelTextsContainer
      $nextManually={nextManually}
      onClick={(e) => {
        click(e, { callback: handleAdvance });
      }}
    >
      {children}
      {textBox.backgroundImage && showFrame && (
        <TextBoxFrameImg
          src={textBox.backgroundImage}
          $textBox={textBox}
          forceMaxSize={false}
          aria-hidden="true"
          className="animate__animated animate__bounceIn"
        />
      )}
      <TextBoxContainer $textBox={textBox} $visible={showText}>
        <VisualNovelTextComponent
          text={text}
          characterName={characterName}
          playSound={playSound}
          instant={forceInstant}
          paused={!showText}
          onDone={handleTypingDone}
        />
        {showContinueArrow && (
          <ContinueArrowButton
            onClick={(e) => {
              click(e, { callback: handleAdvance, dontPlaySound: true });
            }}
          >
            <TranslationComponent id="diaporama_scene_continue_arrow" srOnly />
            <ContinueArrow aria-hidden="true" />
          </ContinueArrowButton>
        )}
      </TextBoxContainer>
    </VisualNovelTextsContainer>
  );
};

export default VisualNovelTextsComponent;
