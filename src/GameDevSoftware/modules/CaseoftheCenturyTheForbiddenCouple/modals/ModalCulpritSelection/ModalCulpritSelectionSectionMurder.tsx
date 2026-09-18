import { useMemo, useState } from "react";

import { VisualNovelTextComponent } from "../../../GDSTModule/components";
import { TranslationComponent } from "../../../../../components";
import { SectionText } from "./styled";
import { useGameObjects } from "../../../../../hooks";

type ModalCulpritSelectionSectionMurderProps = {
  textContent: string;
  textSelected: string;
  textValue0: string;
  showResult: boolean;
  isCorrect?: boolean;
  value?: number;
  onOpenCulpritSelection: () => void;
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
  onOpenCulpritSelection,
}) => {
  const { getGameObject } = useGameObjects();
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
      <SectionText $showResult={showResult} $isCorrect={isCorrect}>
        <VisualNovelTextComponent
          text={textContent}
          onDone={() => {
            setShowButton(true);
          }}
        />
        {showButton && (
          <button
            onClick={() => {
              if (showResult) {
                return;
              }
              onOpenCulpritSelection();
            }}
          >
            <TranslationComponent id={textValue} />
          </button>
        )}
      </SectionText>
    </>
  );
};

export default ModalCulpritSelectionSectionMurder;
