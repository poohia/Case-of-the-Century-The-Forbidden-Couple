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
import { useGameProvider } from "../../../../../gameProvider";
import { useTimeout } from "../../../../../hooks";
import { ResumedEndSceneSceneProps } from "../../../../game-types";
import { VisualNovelTextComponent } from "../../../GDSTModule/components";
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

const STAMP_DELAY = 350;
const PARAGRAPH_TEXTS = ["lorem_ipsum", "lorem_ipsum"];
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
    onFinished: () => void;
  }
> = (props) => {
  const { open, goodScenario, onFinished, ...rest } = props;
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
  const headerTitleId = useId();

  const [showStamp, setShowStamp] = useState<boolean>(false);
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

  const resultTextId =
    result === "success" ? "message_1789902485307" : "message_1789902496701";

  const translatedTitle = useMemo(
    () => `${translateText("game_title_1")} : ${translateText("game_title_2")}`,
    [translateText]
  );

  const { start: startStamp } = useTimeout(() => {
    setShowStamp(true);
    if (!screenReaderEnabled) {
      playSoundEffect({
        sound: "470710__ifekry__traditional-stamp.mp3",
        volume: 0.5,
      });
    }
  }, STAMP_DELAY);

  useEffect(() => {
    if (open) {
      startStamp();
    }
  }, [open]);

  const handleParagraphDone = useCallback((index: number) => {
    setParagraphsDone((count) => Math.max(count, index + 1));
  }, []);

  const visibleParagraphsCount = Math.min(
    paragraphsDone + 1,
    PARAGRAPH_TEXTS.length
  );
  const isFooterVisible = paragraphsDone >= PARAGRAPH_TEXTS.length;

  return (
    <>
      <ModalComponent
        open={open}
        title="lorem_ipsum"
        size="default"
        inert={isSubModalOpen}
        {...rest}
      >
        <ModalInterrogatoireResumeComponentContainer>
          <ModalInterrogatoireResumeContent>
            <ModalInterrogatoireResumeHero>
              <ModalResumedEndHeader
                role="region"
                aria-labelledby={headerTitleId}
              >
                <span id={headerTitleId} className="sr-only">
                  {translatedTitle}
                </span>
                <h3 aria-hidden="true">
                  <TranslationComponent id="game_title_1" />
                </h3>
                <h4 aria-hidden="true">
                  <TranslationComponent id="game_title_2" />
                </h4>
                <span aria-live="polite" className="sr-only">
                  {showStamp && result && (
                    <TranslationComponent id={resultTextId} textOnly />
                  )}
                </span>
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

          {showStamp && (
            <ModalResumedEndParagraphs>
              {PARAGRAPH_TEXTS.slice(0, visibleParagraphsCount).map(
                (textId, index) => (
                  <ModalResumedEndParagraph key={index}>
                    <VisualNovelTextComponent
                      text={textId}
                      paused={isSubModalOpen}
                      playSound={PARAGRAPH_SOUND}
                      onDone={() => handleParagraphDone(index)}
                    />
                  </ModalResumedEndParagraph>
                )
              )}
            </ModalResumedEndParagraphs>
          )}

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
