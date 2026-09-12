import {
  CSSProperties,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";

import {
  ButtonClassicGroupComponent,
  ImgComponent,
  TranslationComponent,
} from "../../../../../components";
import ModalComponent, {
  ModalChildrenParametersComponentProps,
} from "../../../../../components/ModalComponent";
import { ButtonClassicType } from "../../../../../components/ButtonClassicComponent";
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
import { useGameProvider } from "../../../../../gameProvider";
import ModalParametersCharacters from "../ModalParametersCharacters";
import ModalParametersNotesInspecteur from "../ModalParametersNotesInspecteur";
import ModalInterrogatoires from "../ModalInterrogatoires";
import ModalParametersScenarios from "../ModalParametersScenarios";
import UnlockContext from "../../contexts/UnlockContext";
import { ModalCulpritSelectionActions } from "./styled";

const ModalCulpritSelection: React.FC<ModalChildrenParametersComponentProps> = (
  props
) => {
  const { open, ...rest } = props;
  const { translateText, playSoundEffect } = useGameProvider();
  const [showAll, setShowAll] = useState<boolean>(false);
  const [openCharacters, setOpenCharacters] = useState<boolean>(false);
  const [openNotes, setOpenNotes] = useState<boolean>(false);
  const [openInterrogatoires, setOpenInterrogatoires] =
    useState<boolean>(false);
  const {
    hasCharactersNotify,
    hasScenariosNotify,
    hasNotesInspecteurNotify,
    hasInterrogatoireNotify,
  } = useContext(UnlockContext);
  const [openScenarios, setOpenScenarios] = useState<boolean>(false);
  const headerTitleId = useId();
  const headerDescriptionId = useId();
  const { start } = useTimeout(() => {
    setShowAll(true);
    playSoundEffect({
      sound: "TypewriterKeystroke_BW.50860.mp3",
      volume: 1,
    });
  }, 350);
  const translatedEyebrow = useMemo(
    () => translateText("modalculpritselection_titre_2"),
    [translateText]
  );
  const translatedTitle = useMemo(
    () => translateText("modalculpritselection_titre_3"),
    [translateText]
  );
  const translatedDescription = useMemo(
    () => translateText("modalculpritselection_titre_4"),
    [translateText]
  );
  const buttonsAction = useMemo<ButtonClassicType[]>(
    () => [
      {
        key: "characters",
        idText: "message_1749392775687",
        animate: true,
        notify: hasCharactersNotify,
      },
      {
        key: "notes",
        idText: "label_notes_inspecteur",
        animate: true,
        notify: hasNotesInspecteurNotify,
      },
      {
        key: "interrogatoires",
        idText: "interrogatoires_modal_title",
        animate: true,
        notify: hasInterrogatoireNotify,
      },
      {
        key: "scenarios",
        idText: "message_1749392803196",
        animate: true,
        notify: hasScenariosNotify,
      },
    ],
    [
      hasCharactersNotify,
      hasScenariosNotify,
      hasNotesInspecteurNotify,
      hasInterrogatoireNotify,
    ]
  );
  const actionButtonsStyle = useMemo(
    () =>
      ({
        "--button-action-group-button-flex-basis": "auto",
      }) as CSSProperties,
    []
  );
  const handleClickButtonsAction = useCallback((key: string) => {
    switch (key) {
      case "characters":
        setOpenCharacters(true);
        break;
      case "notes":
        setOpenNotes(true);
        break;
      case "interrogatoires":
        setOpenInterrogatoires(true);
        break;
      case "scenarios":
        setOpenScenarios(true);
        break;
    }
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        playSoundEffect({
          sound: "TypewriterKeystroke_BW.50860.mp3",
          volume: 1,
        });
      }, 100);
      start();
    }
  }, [open]);

  return (
    <>
      <ModalComponent
        open={open}
        title="modalculpritselection_titre"
        size="default"
        inert={
          openCharacters || openNotes || openInterrogatoires || openScenarios
        }
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
                  {`${translatedEyebrow} : ${translatedTitle}`}
                </span>
                <h3 aria-hidden="true">
                  <TranslationComponent id="modalculpritselection_titre_3" />
                </h3>
                <span id={headerDescriptionId} className="sr-only">
                  {translatedDescription}
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
            <ModalCulpritSelectionActions style={actionButtonsStyle}>
              <ButtonClassicGroupComponent
                buttons={buttonsAction}
                show={showAll}
                direction="row"
                size="small"
                delayBetweenButtons={0}
                onClick={handleClickButtonsAction}
              />
            </ModalCulpritSelectionActions>
          </ModalInterrogatoireResumeContent>
        </ModalInterrogatoireResumeComponentContainer>
      </ModalComponent>
      <ModalParametersCharacters
        open={openCharacters}
        onClose={() => setOpenCharacters(false)}
      />
      <ModalParametersNotesInspecteur
        open={openNotes}
        onClose={() => setOpenNotes(false)}
      />
      <ModalInterrogatoires
        open={openInterrogatoires}
        onClose={() => setOpenInterrogatoires(false)}
      />
      <ModalParametersScenarios
        open={openScenarios}
        onClose={() => setOpenScenarios(false)}
      />
    </>
  );
};

export default ModalCulpritSelection;
