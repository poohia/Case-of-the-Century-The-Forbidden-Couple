import { useEffect, useId, useState } from "react";

import { ImgComponent, TranslationComponent } from "../../../../../components";
import ModalComponent, {
  ModalChildrenParametersComponentProps,
} from "../../../../../components/ModalComponent";
import {
  ModalInterrogatoireResumeComponentContainer,
  ModalInterrogatoireResumeContent,
  ModalInterrogatoireResumeEyebrow,
  ModalInterrogatoireResumeHeader,
  ModalInterrogatoireResumeHero,
  ModalInterrogatoireResumeLead,
  ModalInterrogatoireResumePortrait,
  ModalInterrogatoireResumeVisual,
} from "../ModalInterrogatoireResume/styled";
import { useTimeout } from "../../../../../hooks";

const ModalCulpritSelection: React.FC<ModalChildrenParametersComponentProps> = (
  props
) => {
  const { open, onClose, ...rest } = props;
  const [showAll, setShowAll] = useState<boolean>(false);
  const headerTitleId = useId();
  const headerDescriptionId = useId();
  const { start } = useTimeout(() => {
    setShowAll(true);
  }, 1000);

  useEffect(() => {
    if (open) {
      start();
    }
  }, [open]);

  return (
    <ModalComponent
      open={open}
      title="modalculpritselection_titre"
      size="default"
      {...rest}
    >
      <ModalInterrogatoireResumeComponentContainer>
        <ModalInterrogatoireResumeContent>
          <ModalInterrogatoireResumeHero>
            <ModalInterrogatoireResumeHeader
              role="region"
              aria-labelledby={headerTitleId}
              aria-describedby={headerDescriptionId}
            >
              <ModalInterrogatoireResumeEyebrow aria-hidden="true">
                <TranslationComponent id="modalculpritselection_titre_2" />
              </ModalInterrogatoireResumeEyebrow>
              <span id={headerTitleId} className="sr-only">
                {`lorem: Ipsum`}
              </span>
              <h3 aria-hidden="true">
                <TranslationComponent id="modalculpritselection_titre_3" />
              </h3>
              <span id={headerDescriptionId} className="sr-only">
                {"ipsum"}
              </span>
              {showAll && (
                <ModalInterrogatoireResumeLead
                  aria-hidden="true"
                  className="animate__animated animate__fadeIn"
                >
                  <TranslationComponent id="modalculpritselection_titre_4" />
                </ModalInterrogatoireResumeLead>
              )}
            </ModalInterrogatoireResumeHeader>

            <ModalInterrogatoireResumeVisual>
              <ModalInterrogatoireResumePortrait>
                <ImgComponent
                  src={"VIEUX-BUSTE-800px-COUL-128 - poids-1,7Mo.gif"}
                  aria-hidden="true"
                  forceMaxSize={false}
                />
              </ModalInterrogatoireResumePortrait>
            </ModalInterrogatoireResumeVisual>
          </ModalInterrogatoireResumeHero>
        </ModalInterrogatoireResumeContent>
      </ModalInterrogatoireResumeComponentContainer>
    </ModalComponent>
  );
};

export default ModalCulpritSelection;
