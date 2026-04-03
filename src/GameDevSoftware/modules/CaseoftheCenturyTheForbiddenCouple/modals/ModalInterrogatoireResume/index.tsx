import { useMemo } from "react";

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
} from "../../../../game-types";
import { ModalInterrogatoireResumeComponentContainer } from "./styled";
import { ButtonClassicType } from "../../../../../components/ButtonClassicComponent";

const ModalInterrogatoireResumeComponent: React.FC<
  ModalChildrenParametersComponentProps & { id: number }
> = (props) => {
  const { open, id, onClose, ...rest } = props;
  const { findScene } = useScenes();
  const { getGameObjectFromId } = useGameObjects();
  const { getData } = useGameProvider();
  const scene = useMemo<SceneDialogueProps>(() => {
    return findScene(id);
  }, [id]);
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
    let total = 0;
    dialogues.forEach((dialogue) => {
      dialogue.texts?.forEach((text) => {
        total += text.unlockScenario?.length || 0;
      });
    });
    reponses.forEach((reponse) => {
      total += reponse.unlockScenario?.length || 0;
    });
    return total;
  }, [dialogues]);
  const noteInspecteurUnlocked = useMemo(() => {
    let total = 0;
    dialogues.forEach((dialogue) => {
      dialogue.texts.forEach((text) => {
        total += text?.unlockNoteInspecteur?.length || 0;
      });
    });
    reponses.forEach((reponse) => {
      total += reponse?.unlockNoteInspecteur?.length || 0;
    });
    return total;
  }, [dialogues]);
  const charactersUnlocked = useMemo(() => {
    let total = 0;
    dialogues.forEach((dialogue) => {
      dialogue.texts?.forEach((text) => {
        // a debug; il y a possibiltié de unlock plusieurs characters de facon differente
        if (text.unlockCharacter?.length) {
          console.log("i'm here azerty!!", text);
        }
        total += text.unlockCharacter?.length || 0;
      });
    });
    return total;
  }, [dialogues]);
  const informationCharacterUnlocked = useMemo(() => {
    let total = 0;
    dialogues.forEach((dialogue) => {
      dialogue.texts?.forEach((text) => {
        total += text.unlockTexts?.length || 0;
      });
    });
    return total;
  }, [dialogues]);

  const buttonsAction = useMemo<ButtonClassicType[]>(() => {
    return [
      {
        key: "restart",
        idText: "restart",
      },
      {
        key: "continue",
        idText: "continuer",
      },
    ];
  }, []);

  if (open) {
    console.log("🚀 ~ ModalInterrogatoireResumeComponent ~ scene:", scene);
    console.log(
      "🚀 ~ ModalInterrogatoireResumeComponent ~ resumeInformation:",
      resumeInformation
    );

    console.log(
      "🚀 ~ ModalInterrogatoireResumeComponent ~ scenarioUnlocked:",
      scenarioUnlocked
    );
    console.log(
      "🚀 ~ ModalInterrogatoireResumeComponent ~ noteInspecteurUnlocked:",
      noteInspecteurUnlocked
    );
    console.log(
      "🚀 ~ ModalInterrogatoireResumeComponent ~ charactersUnlocked:",
      charactersUnlocked
    );

    console.log(
      "🚀 ~ ModalInterrogatoireResumeComponent ~ informationPersonnageUnlocked:",
      informationCharacterUnlocked
    );
  }

  return (
    <ModalComponent open={open} title="Résumé" size="default" {...rest}>
      <ModalInterrogatoireResumeComponentContainer>
        <ImgComponent
          src="VIEUX-BUSTE-800px-COUL-128 - poids-1,7Mo.gif"
          aria-hidden="true"
          forceMaxSize={false}
        />
        <section>
          <h3>
            <TranslationComponent id={resumeInformation.title} />
          </h3>
          <div>
            {resumeInformation.notesInspecteurUnlocked && (
              <div>
                <TranslationComponent id="label_notes_inspecteur" />:{" "}
                <b>
                  {noteInspecteurUnlocked}/
                  {resumeInformation.notesInspecteurUnlocked}
                </b>
              </div>
            )}
            {resumeInformation.scenariosUnlocked && (
              <div>
                <TranslationComponent id="message_1749392803196" />:{" "}
                <b>
                  {scenarioUnlocked}/{resumeInformation.scenariosUnlocked}
                </b>
              </div>
            )}
            {resumeInformation.charactersUnlocked && (
              <div>
                <TranslationComponent id="message_1749392775687" />:{" "}
                <b>
                  {charactersUnlocked}/{resumeInformation.charactersUnlocked}
                </b>
              </div>
            )}
            {resumeInformation.textsCharacterInfoUnlocked && (
              <div>
                Informations personnages débloqué:{" "}
                <b>
                  {informationCharacterUnlocked}/
                  {resumeInformation.textsCharacterInfoUnlocked}
                </b>
              </div>
            )}
          </div>
          <div>
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
          </div>
        </section>
      </ModalInterrogatoireResumeComponentContainer>
    </ModalComponent>
  );
};

export default ModalInterrogatoireResumeComponent;
