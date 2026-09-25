import { useMemo, useState } from "react";

import { VisualNovelTextComponent } from "../../../GDSTModule/components";
import { TranslationComponent } from "../../../../../components";
import { SectionText } from "./styled";
import { useButtonHandleClick, useGameObjects } from "../../../../../hooks";

type ModalCulpritSelectionSectionMurderProps = {
  textContent: string;
  textSelected: string;
  textValue0: string;
  showResult: boolean;
  isCorrect?: boolean;
  value?: number;
  hasFooterAction?: boolean;
  isInteractionDisabled?: boolean;
  pauseSection: boolean;
  onOpenCulpritSelection: () => void;
  onTextDone: () => void;
};

const ModalCulpritSelectionSectionMurder: React.FC<
  ModalCulpritSelectionSectionMurderProps
> = ({
  textContent,
  textSelected,
  textValue0,
  showResult,
  value,
  isCorrect,
  pauseSection,
  hasFooterAction = false,
  isInteractionDisabled = false,
  onOpenCulpritSelection,
  onTextDone,
}) => {
  const { getGameObject } = useGameObjects();
  const click = useButtonHandleClick();
  const [showButton, setShowButton] = useState(false);

  const textValue = useMemo(() => {
    if (value === undefined) {
      return textSelected;
    } else if (value === 0) {
      return textValue0;
    } else {
      return getGameObject(value)?._title || textSelected;
    }
  }, [value, textSelected]);

  return (
    <>
      <SectionText
        $showResult={showResult}
        $isCorrect={isCorrect}
        $hasFooterAction={hasFooterAction}
      >
        <VisualNovelTextComponent
          text={textContent}
          paused={pauseSection}
          playSound={{
            sound: "820352__bryansaraiva__typewriter-key-press-05.mp3",
            saveSoundEffect: true,
            volume: 0.4,
          }}
          onDone={() => {
            setShowButton(true);
            onTextDone();
          }}
        />
        {showButton && (
          <button
            disabled={isInteractionDisabled}
            onClick={(e) => {
              if (showResult || isInteractionDisabled) {
                return;
              }
              click(e, { callback: () => onOpenCulpritSelection() });
            }}
          >
            <TranslationComponent id={textValue} />
            {showResult && isCorrect !== undefined && (
              <TranslationComponent
                id={
                  isCorrect
                    ? "label_modalculpritselection_reponse_correcte"
                    : "label_modalculpritselection_reponse_incorrecte"
                }
                srOnly
              />
            )}
          </button>
        )}
      </SectionText>
    </>
  );
};

export default ModalCulpritSelectionSectionMurder;
