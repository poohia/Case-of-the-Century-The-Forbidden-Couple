import { useEffect, useMemo, useState } from "react";

import {
  ButtonClassicGroupComponent,
  ImgComponent,
  ModalComponent,
  TranslationComponent,
} from "../../../../../components";
import { ModalChildrenParametersComponentProps } from "../../../../../components/ModalComponent";
import { useGameProvider } from "../../../../../gameProvider";
import { useGameObjects, useScenes } from "../../../../../hooks";
import {
  DialogueInterface,
  ResponseInterface,
  SceneDialogueProps,
  CharacterInterface,
} from "../../../../game-types";
import { ButtonClassicType } from "../../../../../components/ButtonClassicComponent";
import {
  ModalInterrogatoireResumeActions,
  ModalInterrogatoireResumeComponentContainer,
  ModalInterrogatoireResumeContent,
  ModalInterrogatoireResumeEyebrow,
  ModalInterrogatoireResumeHeader,
  ModalInterrogatoireResumeLead,
  ModalInterrogatoireResumePortrait,
  ModalInterrogatoireResumeProgress,
  ModalInterrogatoireResumeStatCaption,
  ModalInterrogatoireResumeStatCard,
  ModalInterrogatoireResumeStatHead,
  ModalInterrogatoireResumeStatLabel,
  ModalInterrogatoireResumeStatsGrid,
  ModalInterrogatoireResumeStatValue,
  ModalInterrogatoireResumeVisual,
} from "./styled";

import "animate.css";

const ModalInterrogatoireResumeComponent: React.FC<
  ModalChildrenParametersComponentProps & { id: number }
> = (props) => {
  const { open, id, onClose, ...rest } = props;
  const { findScene } = useScenes();
  const { getGameObjectFromId } = useGameObjects();
  const { getData } = useGameProvider();
  const [showAll, setShowAll] = useState<boolean>(false);
  const scene = useMemo<SceneDialogueProps>(() => {
    return findScene(id);
  }, [id]);
  const interrogatedCharacter = useMemo<CharacterInterface | null>(() => {
    return getGameObjectFromId<CharacterInterface>(
      scene.characterResponse.replace("@go:", "")
    );
  }, [scene]);
  const resumeInformation = useMemo(() => {
    return scene.resumeInformation;
  }, [scene]);
  const dialogues = useMemo<DialogueInterface[]>(() => {
    if (!open) {
      return [];
    }
    return (getData<number[]>(`dialogue_${id}_dialogues_history`) || []).map(
      (dialogueId) =>
        getGameObjectFromId<DialogueInterface>(dialogueId) as DialogueInterface
    );
  }, [id, open, getData]);
  const reponses = useMemo<ResponseInterface[]>(() => {
    if (!open) {
      return [];
    }
    return (getData<number[]>(`dialogue_${id}_responses_history`) || []).map(
      (reponseId) =>
        getGameObjectFromId<ResponseInterface>(reponseId) as ResponseInterface
    );
  }, [id, open, getData]);

  const scenarioUnlocked = useMemo(() => {
    const total = new Set<string>();

    dialogues.forEach((dialogue) => {
      dialogue.texts?.forEach((text) => {
        text.unlockScenario?.forEach((scenario) => {
          total.add(scenario.scenario);
        });
      });
    });

    reponses.forEach((reponse) => {
      reponse.unlockScenario?.forEach((scenario) => {
        total.add(scenario.scenario);
      });
    });

    return total.size;
  }, [dialogues, reponses]);

  const noteInspecteurUnlocked = useMemo(() => {
    const total = new Set<string>();

    dialogues.forEach((dialogue) => {
      dialogue.texts?.forEach((text) => {
        text.unlockNoteInspecteur?.forEach((note) => {
          total.add(note.noteInspecteur);
        });
      });
    });

    reponses.forEach((reponse) => {
      reponse.unlockNoteInspecteur?.forEach((note) => {
        total.add(note.noteInspecteur);
      });
    });

    return total.size;
  }, [dialogues, reponses]);

  const charactersUnlocked = useMemo(() => {
    const total = new Set<string>();

    dialogues.forEach((dialogue) => {
      dialogue.texts?.forEach((text) => {
        text.unlockCharacter?.forEach((c) => {
          total.add(c.character);
        });
      });
    });

    return total.size;
  }, [dialogues]);

  const informationCharacterUnlocked = useMemo(() => {
    const total = new Set<string>();

    dialogues.forEach((dialogue) => {
      dialogue.texts?.forEach((text) => {
        text.unlockTexts?.forEach((info) => {
          total.add(info.text);
        });
      });
    });

    return total.size;
  }, [dialogues]);

  const buttonsAction = useMemo<ButtonClassicType[]>(() => {
    return [
      {
        key: "restart",
        idText: "interrogatoire_resume_restart",
      },
      {
        key: "continue",
        idText: "label_continue",
      },
    ];
  }, []);

  const stats = useMemo(
    () =>
      [
        resumeInformation.notesInspecteurUnlocked
          ? {
              key: "notes",
              label: "label_notes_inspecteur",
              value: noteInspecteurUnlocked,
              total: resumeInformation.notesInspecteurUnlocked,
            }
          : null,
        resumeInformation.scenariosUnlocked
          ? {
              key: "scenarios",
              label: "message_1749392803196",
              value: scenarioUnlocked,
              total: resumeInformation.scenariosUnlocked,
            }
          : null,
        resumeInformation.charactersUnlocked
          ? {
              key: "characters",
              label: "message_1749392775687",
              value: charactersUnlocked,
              total: resumeInformation.charactersUnlocked,
            }
          : null,
        resumeInformation.textsCharacterInfoUnlocked
          ? {
              key: "characterInfos",
              label: "interrogatoire_resume_character_information",
              value: informationCharacterUnlocked,
              total: resumeInformation.textsCharacterInfoUnlocked,
            }
          : null,
      ].filter(Boolean) as {
        key: string;
        label: string;
        value: number;
        total: number;
      }[],
    [
      resumeInformation,
      noteInspecteurUnlocked,
      scenarioUnlocked,
      charactersUnlocked,
      informationCharacterUnlocked,
    ]
  );

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setShowAll(true);
      }, 1500);
    }
  }, [open]);

  return (
    <ModalComponent
      open={open}
      title="interrogatoire_resume_title"
      size="default"
      {...rest}
    >
      <ModalInterrogatoireResumeComponentContainer>
        <ModalInterrogatoireResumeVisual>
          <ModalInterrogatoireResumePortrait>
            <ImgComponent
              src={interrogatedCharacter!.idleImage!}
              aria-hidden="true"
              forceMaxSize={false}
            />
          </ModalInterrogatoireResumePortrait>
        </ModalInterrogatoireResumeVisual>

        <ModalInterrogatoireResumeContent>
          <ModalInterrogatoireResumeHeader>
            <ModalInterrogatoireResumeEyebrow>
              <TranslationComponent id="interrogatoire_resume_eyebrow" />
            </ModalInterrogatoireResumeEyebrow>
            <h3>
              <TranslationComponent id={resumeInformation.title} />
            </h3>
            {showAll && (
              <ModalInterrogatoireResumeLead className="animate__animated animate__fadeIn">
                <TranslationComponent id="interrogatoire_resume_subtitle" />
              </ModalInterrogatoireResumeLead>
            )}
          </ModalInterrogatoireResumeHeader>

          {showAll && (
            <ModalInterrogatoireResumeStatsGrid className="animate__animated animate__fadeIn">
              {stats.map((stat) => {
                const progress =
                  stat.total > 0 ? (stat.value / stat.total) * 100 : 0;

                return (
                  <ModalInterrogatoireResumeStatCard key={stat.key}>
                    <ModalInterrogatoireResumeStatHead>
                      <ModalInterrogatoireResumeStatLabel>
                        <TranslationComponent id={stat.label} />
                      </ModalInterrogatoireResumeStatLabel>
                      <ModalInterrogatoireResumeStatValue>
                        {stat.value}/{stat.total}
                      </ModalInterrogatoireResumeStatValue>
                    </ModalInterrogatoireResumeStatHead>
                    <ModalInterrogatoireResumeProgress>
                      <span style={{ width: `${progress}%` }} />
                    </ModalInterrogatoireResumeProgress>
                    <ModalInterrogatoireResumeStatCaption>
                      {Math.round(progress)}%
                    </ModalInterrogatoireResumeStatCaption>
                  </ModalInterrogatoireResumeStatCard>
                );
              })}
            </ModalInterrogatoireResumeStatsGrid>
          )}

          {showAll && (
            <ModalInterrogatoireResumeActions className="animate__animated animate__fadeIn">
              <ButtonClassicGroupComponent
                buttons={buttonsAction}
                show
                direction="row"
                onClick={(key) => {
                  if (key === "continue") {
                    onClose?.();
                  }
                }}
              />
            </ModalInterrogatoireResumeActions>
          )}
        </ModalInterrogatoireResumeContent>
      </ModalInterrogatoireResumeComponentContainer>
    </ModalComponent>
  );
};

export default ModalInterrogatoireResumeComponent;
