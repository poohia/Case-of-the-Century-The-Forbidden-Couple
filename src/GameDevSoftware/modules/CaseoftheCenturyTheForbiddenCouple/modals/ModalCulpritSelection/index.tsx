import {
  CSSProperties,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
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
import { useGameObjects, useTimeout } from "../../../../../hooks";
import { useGameProvider } from "../../../../../gameProvider";
import ModalParametersCharacters from "../ModalParametersCharacters";
import ModalParametersNotesInspecteur from "../ModalParametersNotesInspecteur";
import ModalInterrogatoires from "../ModalInterrogatoires";
import ModalParametersScenarios from "../ModalParametersScenarios";
import UnlockContext from "../../contexts/UnlockContext";
import { ModalCulpritSelectionActions } from "./styled";
import ModalCulpritSelectionSectionMurder from "./ModalCulpritSelectionSectionMurder";
import ModalCulpritSelectionCulpritSelection from "./ModalCulpritSelectionCulpritSelection";
import ModalCulpritSelectionMotifSelection from "./ModalCulpritSelectionMotifSelection";
import ModalCulpritSelectionScenarioSelection from "./ModalCulpritSelectionScenarioSelection";
import {
  CulpritSelectionSceneProps,
  ScenarioInterface,
} from "../../../../game-types";

export type CulpritSelectionValue = Partial<{
  culpritId1: number;
  culpritId2: number;
  mobileId1: number;
  mobileId2: number;
  scenarioId: number;
  chance: number;
  isEnded: boolean;
}> & {
  chance: number;
};

const ModalCulpritSelection: React.FC<
  ModalChildrenParametersComponentProps & {
    goodCulprit: CulpritSelectionSceneProps["goodCulprit"];
    onFinished: (value: Required<CulpritSelectionValue>) => void;
  }
> = (props) => {
  const { open, goodCulprit, onFinished, ...rest } = props;
  const {
    translateText,
    playSoundEffect,
    saveData,
    getData,
    confirm,
    getValueFromConstant,
  } = useGameProvider();
  const { getGameObject } = useGameObjects();
  const modalContentRef = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState<CulpritSelectionValue>({
    chance: 1,
    isEnded: false,
  });
  const [hasLoadedSavedValue, setHasLoadedSavedValue] = useState(false);
  const [hasStartedDeduction, setHasStartedDeduction] = useState(false);
  const valueFromDatabase = useMemo<CulpritSelectionValue | undefined>(() => {
    return getData("culpritSelectionScene");
  }, [getData]);
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
  const [inert, setInert] = useState<boolean>(false);
  const maxTentativeResult = useMemo(() => {
    const maxTentative = getValueFromConstant<number>("max_tentative_result");
    return maxTentative;
  }, [getValueFromConstant]);
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
    () =>
      `${translateText("modalculpritselection_titre_4")} ${value.chance}/${maxTentativeResult}`,
    [translateText, maxTentativeResult, value.chance]
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

  const scenarioSelected = useMemo(() => {
    if (value.scenarioId !== undefined) {
      return getGameObject<ScenarioInterface>(value.scenarioId);
    }
    return null;
  }, [value]);
  const [openCulpritSelection, setOpenCulpritSelection] = useState(false);
  const [openCulpritSelection2, setOpenCulpritSelection2] = useState(false);
  const [openMotifSelection, setOpenMotifSelection] = useState(false);
  const [openMotifSelection2, setOpenMotifSelection2] = useState(false);
  const [openCulpritSelectionScenario, setOpenCulpritSelectionScenario] =
    useState(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isOnFailed, setIsOnfailed] = useState<boolean>(false);
  const [restorationStep, setRestorationStep] = useState<number | null>(null);
  const [deductionAnimationId, setDeductionAnimationId] = useState(0);
  const [textDoneAnimationId, setTextDoneAnimationId] = useState(0);
  const previousVisibleSectionsCountRef = useRef(0);
  const wasConfirmationVisibleRef = useRef(false);
  const previousTextDoneAnimationIdRef = useRef(0);

  const goodCulpritFormatted = useMemo(
    () => ({
      mobiles: goodCulprit.mobiles.map((mobile) =>
        Number(mobile.replace("@go:", ""))
      ),
      personnages: goodCulprit.personnages.map((mobile) =>
        Number(mobile.replace("@go:", ""))
      ),
      scenario: Number(goodCulprit.scenario.replace("@go:", "")),
    }),
    [goodCulprit]
  );

  const handleRestorationTextDone = useCallback(
    (completedStep: number) => {
      if (restorationStep !== completedStep) {
        return;
      }

      switch (completedStep) {
        case 1:
          setRestorationStep(
            value.culpritId1 === undefined
              ? null
              : value.culpritId1 === 0
                ? 3
                : 2
          );
          return;
        case 2:
          setRestorationStep(value.culpritId2 === undefined ? null : 3);
          return;
        case 3:
          setRestorationStep(
            value.mobileId1 === undefined || value.mobileId1 === 0 ? null : 4
          );
          return;
        case 4:
          setRestorationStep(value.mobileId2 === undefined ? null : 5);
          return;
        default:
          setRestorationStep(null);
      }
    },
    [restorationStep, value]
  );
  const handleSectionTextDone = useCallback(
    (step: number) => {
      handleRestorationTextDone(step);
      setTextDoneAnimationId((previousId) => previousId + 1);
    },
    [handleRestorationTextDone]
  );
  const isRestoringDeduction = restorationStep !== null;
  const isConfirmationVisible =
    value.scenarioId !== undefined &&
    !showResult &&
    !value.isEnded &&
    !isRestoringDeduction;
  const visibleDeductionSectionsCount = [
    hasStartedDeduction && showAll,
    value.culpritId1 !== undefined &&
      value.culpritId1 !== 0 &&
      (!isRestoringDeduction || restorationStep >= 2),
    (value.culpritId1 === 0 || value.culpritId2 !== undefined) &&
      (!isRestoringDeduction || restorationStep >= 3),
    value.mobileId1 !== undefined &&
      value.mobileId1 !== 0 &&
      (!isRestoringDeduction || restorationStep >= 4),
    value.mobileId2 !== undefined &&
      (!isRestoringDeduction || restorationStep >= 5),
  ].filter(Boolean).length;

  const handleConfirmScenario = useCallback(() => {
    if (
      value.culpritId1 === undefined ||
      value.culpritId2 === undefined ||
      value.mobileId1 === undefined ||
      value.mobileId2 === undefined ||
      value.scenarioId === undefined ||
      !scenarioSelected
    ) {
      return;
    }
    setInert(true);
    confirm({
      title: scenarioSelected._title,
      message: "message_1789742488510",
    })
      .then((confirmation) => {
        if (confirmation) {
          modalContentRef.current?.scrollTo({
            behavior: "smooth",
            top: 0,
          });
          setShowResult(true);
          if (goodCulpritFormatted.scenario !== value.scenarioId!) {
            if (value.chance + 1 <= maxTentativeResult) {
              setValue((prevValue) => ({
                ...prevValue,
                chance: prevValue.chance + 1,
              }));
            } else {
              setValue((prevValue) => ({
                ...prevValue,
                isEnded: true,
              }));
            }
            setIsOnfailed(true);
          } else {
            setValue((prevValue) => ({
              ...prevValue,
              isEnded: true,
            }));
          }
        }
      })
      .finally(() => {
        setInert(false);
      });
  }, [value, scenarioSelected, goodCulpritFormatted, maxTentativeResult]);

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

  useEffect(() => {
    saveData("culpritSelectionScene", value);
  }, [value]);

  useEffect(() => {
    if (valueFromDatabase) {
      setValue(valueFromDatabase);
      setHasStartedDeduction(true);
      setRestorationStep(1);
      if (valueFromDatabase.isEnded) {
        setShowResult(true);
      }
    }
    setHasLoadedSavedValue(true);
  }, []);

  useEffect(() => {
    if (!open) {
      previousVisibleSectionsCountRef.current = 0;
      wasConfirmationVisibleRef.current = false;
      previousTextDoneAnimationIdRef.current = textDoneAnimationId;
      return;
    }

    const hasNewSection =
      visibleDeductionSectionsCount > previousVisibleSectionsCountRef.current;
    const hasConfirmationJustAppeared =
      isConfirmationVisible && !wasConfirmationVisibleRef.current;
    const hasTextJustFinished =
      textDoneAnimationId !== previousTextDoneAnimationIdRef.current;

    previousVisibleSectionsCountRef.current = visibleDeductionSectionsCount;
    wasConfirmationVisibleRef.current = isConfirmationVisible;
    previousTextDoneAnimationIdRef.current = textDoneAnimationId;

    if (
      !hasNewSection &&
      !hasConfirmationJustAppeared &&
      !hasTextJustFinished
    ) {
      return;
    }

    const scrollTimeout = window.setTimeout(() => {
      const modalContent = modalContentRef.current;

      modalContent?.scrollTo({
        behavior: "smooth",
        top: modalContent.scrollHeight,
      });
    }, 10);

    return () => window.clearTimeout(scrollTimeout);
  }, [
    isConfirmationVisible,
    open,
    textDoneAnimationId,
    visibleDeductionSectionsCount,
  ]);

  return (
    <>
      <ModalComponent
        open={open}
        title="modalculpritselection_titre"
        size="default"
        inert={
          openCharacters ||
          openNotes ||
          openInterrogatoires ||
          openScenarios ||
          openCulpritSelection ||
          openCulpritSelection2 ||
          openMotifSelection ||
          openMotifSelection2 ||
          inert
        }
        {...rest}
        contentRef={modalContentRef}
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
                    <TranslationComponent id="modalculpritselection_titre_4" />{" "}
                    <b>
                      {value.chance}/{maxTentativeResult}
                    </b>
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
          {hasLoadedSavedValue &&
            value.culpritId1 === undefined &&
            !hasStartedDeduction &&
            !showResult &&
            !value.isEnded && (
              <ButtonClassicComponent
                visible
                onClick={() => setHasStartedDeduction(true)}
              >
                <TranslationComponent id="message_1789748527447" />
              </ButtonClassicComponent>
            )}
          {hasStartedDeduction && showAll && (
            <ModalCulpritSelectionSectionMurder
              key={deductionAnimationId}
              textContent="message_1789301365613"
              textSelected="message_1789301650227"
              textValue0="message_1789302355219"
              value={value.culpritId1}
              showResult={showResult}
              isCorrect={
                value.culpritId1
                  ? goodCulpritFormatted.personnages.includes(value.culpritId1)
                  : undefined
              }
              onOpenCulpritSelection={() => setOpenCulpritSelection(true)}
              isInteractionDisabled={isRestoringDeduction}
              onTextDone={() => handleSectionTextDone(1)}
            />
          )}
          {value.culpritId1 !== undefined &&
            value.culpritId1 !== 0 &&
            (!isRestoringDeduction || restorationStep >= 2) && (
              <ModalCulpritSelectionSectionMurder
                textContent="message_1789305688882"
                textSelected="message_1789301650227"
                textValue0="message_1789302355219"
                value={value.culpritId2}
                showResult={showResult}
                isCorrect={
                  value.culpritId2
                    ? goodCulpritFormatted.personnages.includes(
                        value.culpritId2
                      )
                    : undefined
                }
                onOpenCulpritSelection={() => setOpenCulpritSelection2(true)}
                isInteractionDisabled={isRestoringDeduction}
                onTextDone={() => handleSectionTextDone(2)}
              />
            )}
          {(value.culpritId1 === 0 || value.culpritId2 !== undefined) &&
            (!isRestoringDeduction || restorationStep >= 3) && (
              <ModalCulpritSelectionSectionMurder
                textContent="message_1789459801150"
                textSelected="message_1789459899937"
                textValue0="message_1789459931930"
                value={value.mobileId1}
                showResult={showResult}
                isCorrect={
                  value.mobileId1
                    ? goodCulpritFormatted.mobiles.includes(value.mobileId1)
                    : undefined
                }
                onOpenCulpritSelection={() => setOpenMotifSelection(true)}
                isInteractionDisabled={isRestoringDeduction}
                onTextDone={() => handleSectionTextDone(3)}
              />
            )}
          {value.mobileId1 !== undefined &&
            value.mobileId1 !== 0 &&
            (!isRestoringDeduction || restorationStep >= 4) && (
              <ModalCulpritSelectionSectionMurder
                textContent="message_1789465616132"
                textSelected="message_1789459899937"
                textValue0="message_1789459931930"
                value={value.mobileId2}
                showResult={showResult}
                isCorrect={
                  value.mobileId2
                    ? goodCulpritFormatted.mobiles.includes(value.mobileId2)
                    : undefined
                }
                onOpenCulpritSelection={() => setOpenMotifSelection2(true)}
                isInteractionDisabled={isRestoringDeduction}
                onTextDone={() => handleSectionTextDone(4)}
              />
            )}
          {value.mobileId2 !== undefined &&
            (!isRestoringDeduction || restorationStep >= 5) && (
              <ModalCulpritSelectionSectionMurder
                textContent="message_1789481672679"
                textSelected="message_1789481721253"
                textValue0="message_1789459931930"
                value={value.scenarioId}
                showResult={showResult}
                isCorrect={
                  value.scenarioId
                    ? goodCulpritFormatted.scenario === value.scenarioId
                    : undefined
                }
                onOpenCulpritSelection={() =>
                  setOpenCulpritSelectionScenario(true)
                }
                isInteractionDisabled={isRestoringDeduction}
                onTextDone={() => handleSectionTextDone(5)}
              />
            )}
          {/* Boutton confirm value */}
          {isConfirmationVisible && (
            <ButtonClassicComponent
              visible
              onClick={() => {
                handleConfirmScenario();
              }}
            >
              <TranslationComponent id="modalculpritselection_cta_confirmation" />
            </ButtonClassicComponent>
          )}
          {/* Boutton Nouvelle tentative */}
          {showResult &&
            isOnFailed &&
            !value.isEnded &&
            value.chance === maxTentativeResult && (
              <ButtonClassicComponent
                visible
                onClick={() => {
                  setShowResult(false);
                  setIsOnfailed(false);
                  setValue((prevValue) => ({
                    chance: prevValue.chance,
                    isEnded: prevValue.isEnded,
                  }));
                  setDeductionAnimationId((previousId) => previousId + 1);
                }}
              >
                <TranslationComponent id="message_1789745260921" />
              </ButtonClassicComponent>
            )}
          {/* Boutton de fin */}
          {showResult && value.isEnded && (
            <ButtonClassicComponent
              visible
              onClick={() => {
                if (
                  value.culpritId1 !== undefined &&
                  value.culpritId2 !== undefined &&
                  value.mobileId1 !== undefined &&
                  value.mobileId2 !== undefined &&
                  value.scenarioId !== undefined
                ) {
                  onFinished(value as Required<CulpritSelectionValue>);
                }
              }}
            >
              <TranslationComponent id="message_1789746504518" />
            </ButtonClassicComponent>
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
      <ModalCulpritSelectionCulpritSelection
        open={openCulpritSelection}
        value={value}
        onClose={() => {
          setOpenCulpritSelection(false);
        }}
        onCharacterSelected={(characterId) => {
          setValue((prevValue) => {
            return { ...prevValue, culpritId1: characterId };
          });
          setOpenCulpritSelection(false);
        }}
      />
      <ModalCulpritSelectionCulpritSelection
        open={openCulpritSelection2}
        value={value}
        onClose={() => {
          setOpenCulpritSelection2(false);
        }}
        onCharacterSelected={(characterId) => {
          setValue((prevValue) => {
            return { ...prevValue, culpritId2: characterId };
          });
          setOpenCulpritSelection2(false);
        }}
      />
      <ModalCulpritSelectionMotifSelection
        open={openMotifSelection}
        onClose={() => setOpenMotifSelection(false)}
        value={value}
        onMotifSelected={(motifId) => {
          setValue((prevValue) => {
            return { ...prevValue, mobileId1: motifId };
          });
          setOpenMotifSelection(false);
        }}
      />
      <ModalCulpritSelectionMotifSelection
        open={openMotifSelection2}
        onClose={() => setOpenMotifSelection2(false)}
        value={value}
        onMotifSelected={(motifId) => {
          setValue((prevValue) => {
            return { ...prevValue, mobileId2: motifId };
          });
          setOpenMotifSelection2(false);
        }}
      />
      <ModalCulpritSelectionScenarioSelection
        open={openCulpritSelectionScenario}
        onClose={() => setOpenCulpritSelectionScenario(false)}
        value={value}
        onScenarioSelected={(scenarioId) => {
          setValue((prevValue) => {
            return { ...prevValue, scenarioId };
          });
          setOpenCulpritSelectionScenario(false);
        }}
      />
    </>
  );
};

export default ModalCulpritSelection;
