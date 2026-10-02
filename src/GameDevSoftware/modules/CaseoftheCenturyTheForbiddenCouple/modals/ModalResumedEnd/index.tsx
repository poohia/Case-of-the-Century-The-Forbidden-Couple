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
import ButtonClassicComponent, {
  ButtonClassicType,
} from "../../../../../components/ButtonClassicComponent";
import { TranslationComponentSpan } from "../../../../../components/TranslationComponent";
import { useGameProvider } from "../../../../../gameProvider";
import { ResumedEndSceneSceneProps } from "../../../../game-types";
import { VisualNovelTextComponent } from "../../../GDSTModule/components";
import PointsContext from "../../contexts/PointsContext";
import UnlockContext from "../../contexts/UnlockContext";
import { CulpritSelectionValue } from "../ModalCulpritSelection";
import {
  ModalCulpritSelectionActions,
  ModalCulpritSelectionFooter,
  ModalCulpritSelectionResultStamp,
} from "../ModalCulpritSelection/styled";
import ModalInterrogatoires from "../ModalInterrogatoires";
import {
  ModalInterrogatoireResumeComponentContainer,
  ModalInterrogatoireResumeContent,
  ModalInterrogatoireResumeHero,
  ModalInterrogatoireResumeLead,
  ModalInterrogatoireResumePortrait,
  ModalInterrogatoireResumeVisual,
} from "../ModalInterrogatoireResume/styled";
import ModalParametersCharacters from "../ModalParametersCharacters";
import ModalParametersNotesInspecteur from "../ModalParametersNotesInspecteur";
import ModalParametersScenarios from "../ModalParametersScenarios";
import {
  ModalResumedEndHeader,
  ModalResumedEndParagraph,
  ModalResumedEndParagraphs,
} from "./styled";

const TITLE_DELAY = 200;
const STEP_DELAY = 300;
const KEYSTROKE_SOUND = {
  sound: "TypewriterKeystroke_BW.50860.mp3",
  volume: 1,
};
const STAMP_SOUND = {
  sound: "470710__ifekry__traditional-stamp.mp3",
  volume: 0.5,
};
const PARAGRAPH_TEXTS = {
  success: ["message_1790948715846", "message_1790948722091"],
  failed: ["message_1790948763049", "message_1790948722091"],
};
const PARAGRAPH_SOUND = {
  sound: "820352__bryansaraiva__typewriter-key-press-05.mp3",
  saveSoundEffect: true,
  volume: 0.4,
};
const ACTION_BUTTONS_STYLE = {
  "--button-action-group-button-flex-basis": "auto",
} as CSSProperties;

type ModalResumedEndResult = "success" | "failed";

const ModalResumedEnd: React.FC<
  ModalChildrenParametersComponentProps & {
    goodScenario: ResumedEndSceneSceneProps["goodScenario"];
    srDescription: ResumedEndSceneSceneProps["srDescription"];
    onFinished: () => void;
  }
> = (props) => {
  const { open, goodScenario, srDescription, onFinished, ...rest } = props;
  const {
    parameters: { screenReaderEnabled },
    getData,
    translateText,
    playSoundEffect,
  } = useGameProvider();
  const {
    hasCharactersNotify,
    hasScenariosNotify,
    hasNotesInspecteurNotify,
    hasInterrogatoireNotify,
  } = useContext(UnlockContext);
  const { points } = useContext(PointsContext);
  // useId renvoie ":r1:", refusé par isValidHtmlId de TranslationComponent
  const reactId = useId();
  const descriptionId = `modalresumedend-description-${reactId.replace(/[^A-Za-z0-9]/g, "")}`;
  console.log("🚀 ~ ModalResumedEnd ~ descriptionId:", descriptionId);

  // 0: rien, 1: titre, 2: sous-titre, 3: tampon puis paragraphes
  const [step, setStep] = useState<number>(0);
  const showStamp = step >= 3;
  const [paragraphsDone, setParagraphsDone] = useState<number>(0);
  const [openCharacters, setOpenCharacters] = useState<boolean>(false);
  const [openNotes, setOpenNotes] = useState<boolean>(false);
  const [openInterrogatoires, setOpenInterrogatoires] =
    useState<boolean>(false);
  const [openScenarios, setOpenScenarios] = useState<boolean>(false);
  const isSubModalOpen =
    openCharacters || openNotes || openInterrogatoires || openScenarios;

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

  const result = useMemo<ModalResumedEndResult | null>(() => {
    const savedValue = getData<CulpritSelectionValue>("culpritSelectionScene");
    if (savedValue?.scenarioId === undefined) {
      return null;
    }
    const goodScenarioId = Number(goodScenario.replace("@go:", ""));
    return savedValue.scenarioId === goodScenarioId ? "success" : "failed";
  }, [getData, goodScenario]);

  const paragraphTexts = PARAGRAPH_TEXTS[result ?? "failed"];

  const resultTextId =
    result === "success" ? "message_1789902485307" : "message_1789902496701";

  const translatedTitle = useMemo(
    () => `${translateText("game_title_1")} : ${translateText("game_title_2")}`,
    [translateText]
  );

  const resultAnnouncement = useMemo(
    () =>
      `${translateText("modalresumedend_result_label", [], "Résultat de l'enquête")} : ${translateText(resultTextId)}`,
    [translateText, resultTextId]
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    const timers = [
      setTimeout(() => {
        setStep(1);
        playSoundEffect(KEYSTROKE_SOUND);
      }, TITLE_DELAY),
      setTimeout(() => {
        setStep(2);
        playSoundEffect(KEYSTROKE_SOUND);
      }, TITLE_DELAY + TITLE_DELAY),
      setTimeout(
        () => {
          setStep(3);
          if (result && !screenReaderEnabled) {
            playSoundEffect(STAMP_SOUND);
          }
        },
        TITLE_DELAY + STEP_DELAY * 2
      ),
    ];

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [open]);

  const handleParagraphDone = useCallback((index: number) => {
    setParagraphsDone((count) => Math.max(count, index + 1));
  }, []);

  // Lecteur d'écran: pas d'effet machine à écrire, tout arrive en une fois
  const visibleParagraphsCount = screenReaderEnabled
    ? paragraphTexts.length
    : Math.min(paragraphsDone + 1, paragraphTexts.length);
  const isFooterVisible = screenReaderEnabled
    ? showStamp
    : paragraphsDone >= paragraphTexts.length;

  return (
    <>
      <ModalComponent
        open={open}
        title="message_1790948795960"
        size="default"
        inert={isSubModalOpen}
        idDescription={descriptionId}
        {...rest}
      >
        <ModalInterrogatoireResumeComponentContainer>
          <TranslationComponent
            srOnly
            id={srDescription}
            customHtmlId={descriptionId}
          />
          <ModalInterrogatoireResumeContent>
            <ModalInterrogatoireResumeHero>
              <ModalResumedEndHeader>
                <h3 className="sr-only">{translatedTitle}</h3>
                <h3
                  aria-hidden="true"
                  style={{ visibility: step >= 1 ? "visible" : "hidden" }}
                >
                  <TranslationComponent id="game_title_1" />
                </h3>
                <h4
                  aria-hidden="true"
                  style={{ visibility: step >= 2 ? "visible" : "hidden" }}
                >
                  <TranslationComponent id="game_title_2" />
                </h4>
                <ModalInterrogatoireResumeLead
                  className={
                    showStamp ? "animate__animated animate__fadeIn" : ""
                  }
                  style={{ visibility: showStamp ? "visible" : "hidden" }}
                >
                  <TranslationComponent id="message_1790949248240" />:{" "}
                  <b>{points}</b>
                </ModalInterrogatoireResumeLead>
              </ModalResumedEndHeader>

              <ModalInterrogatoireResumeVisual>
                <ModalInterrogatoireResumePortrait>
                  <ImgComponent
                    src={"VIEUX-BUSTE-800px-COUL-128 - poids-1,7Mo.gif"}
                    aria-hidden="true"
                    forceMaxSize={false}
                  />
                  {showStamp && result && (
                    <ModalCulpritSelectionResultStamp
                      $result={result}
                      aria-hidden="true"
                      className="animate__animated animate__flipInX"
                    >
                      <TranslationComponent id={resultTextId} textOnly />
                    </ModalCulpritSelectionResultStamp>
                  )}
                </ModalInterrogatoireResumePortrait>
              </ModalInterrogatoireResumeVisual>
            </ModalInterrogatoireResumeHero>
            <ModalCulpritSelectionActions style={ACTION_BUTTONS_STYLE}>
              <ButtonClassicGroupComponent
                buttons={buttonsAction}
                show={showStamp}
                direction="row"
                size="small"
                delayBetweenButtons={0}
                onClick={handleClickButtonsAction}
              />
            </ModalCulpritSelectionActions>
          </ModalInterrogatoireResumeContent>

          {/* Toujours monté: avec le lecteur d'écran, résultat et paragraphes
              arrivent ensemble dans cette seule zone live => une seule annonce */}
          <ModalResumedEndParagraphs
            aria-live={screenReaderEnabled ? "polite" : undefined}
          >
            <span
              className="sr-only"
              aria-live={screenReaderEnabled ? undefined : "polite"}
            >
              {showStamp && result && resultAnnouncement}
            </span>
            {showStamp &&
              paragraphTexts
                .slice(0, visibleParagraphsCount)
                .map((textId, index) => (
                  <ModalResumedEndParagraph key={index}>
                    {screenReaderEnabled ? (
                      <div>
                        <TranslationComponentSpan>
                          {translateText(textId)}
                        </TranslationComponentSpan>
                      </div>
                    ) : (
                      <VisualNovelTextComponent
                        text={textId}
                        paused={isSubModalOpen}
                        playSound={PARAGRAPH_SOUND}
                        onDone={() => handleParagraphDone(index)}
                      />
                    )}
                  </ModalResumedEndParagraph>
                ))}
          </ModalResumedEndParagraphs>

          {isFooterVisible && (
            <ModalCulpritSelectionFooter className="animate__animated animate__fadeIn">
              <ButtonClassicComponent
                visible
                size="small"
                onClick={() => {
                  onFinished();
                }}
              >
                <TranslationComponent id="label_continue" />
              </ButtonClassicComponent>
            </ModalCulpritSelectionFooter>
          )}
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

export default ModalResumedEnd;
