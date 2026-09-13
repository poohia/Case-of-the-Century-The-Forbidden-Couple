import { useMemo, useState } from "react";

import { VisualNovelTextComponent } from "../../../GDSTModule/components";
import { TranslationComponent } from "../../../../../components";
import { SectionText } from "./styled";
import { useGameObjects } from "../../../../../hooks";

type ModalCulpritSelectionSectionMurderProps = {
  textContent: string;
  value?: number;
  onOpenCulpritSelection: () => void;
};

const ModalCulpritSelectionSectionMurder: React.FC<
  ModalCulpritSelectionSectionMurderProps
> = ({ textContent, value, onOpenCulpritSelection }) => {
  const { getGameObject } = useGameObjects();
  const [showButton, setShowButton] = useState(false);

  const textValue = useMemo(() => {
    if (value === undefined) {
      return "message_1789301650227";
    } else if (value === 0) {
      return "message_1789302355219";
    } else {
      return getGameObject(value)?._title || "message_1789301650227";
    }
  }, [value]);

  return (
    <>
      <SectionText>
        <VisualNovelTextComponent
          text={textContent}
          onDone={() => {
            setShowButton(true);
          }}
        />
        {showButton && (
          <button
            onClick={() => {
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
