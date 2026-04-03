import { useMemo } from "react";

import { ModalComponent } from "../../../../../components";
import { ModalChildrenParametersComponentProps } from "../../../../../components/ModalComponent";
import { useGameProvider } from "../../../../../gameProvider";
import { useGameObjects, useScenes } from "../../../../../hooks";
import { DialogueInterface, ResponseInterface } from "../../../../game-types";

const ModalInterrogatoireResumeComponent: React.FC<
  ModalChildrenParametersComponentProps & { id: number }
> = (props) => {
  const { open, id, ...rest } = props;
  const { findScene } = useScenes();
  const { getGameObjectFromId } = useGameObjects();
  const { getData } = useGameProvider();
  const scene = useMemo(() => {
    return findScene(id);
  }, [id, open]);
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
  const noteInspecteurUnlockedObj = useMemo(() => {
    const total: any = [];
    dialogues.forEach((dialogue) => {
      dialogue.texts?.forEach((text) => {
        if (text.unlockNoteInspecteur && text.unlockNoteInspecteur.length > 0) {
          total.concat(text.unlockNoteInspecteur);
        }
      });
    });
    return total;
  }, [dialogues]);
  const informationPersonnageUnlocked = useMemo(() => {
    let total = 0;
    dialogues.forEach((dialogue) => {
      dialogue.texts?.forEach((text) => {
        total += text.unlockTexts?.length || 0;
      });
    });
    return total;
  }, [dialogues]);

  if (open) {
    console.log(
      "🚀 ~ ModalInterrogatoireResumeComponent ~ scenarioUnlocked:",
      scenarioUnlocked
    );
    console.log(
      "🚀 ~ ModalInterrogatoireResumeComponent ~ noteInspecteurUnlocked:",
      noteInspecteurUnlocked
    );
    console.log(
      "🚀 ~ ModalInterrogatoireResumeComponent ~ informationPersonnageUnlocked:",
      informationPersonnageUnlocked
    );
    console.log(
      "🚀 ~ ModalInterrogatoireResumeComponent ~ noteInspecteurUnlockedObj:",
      noteInspecteurUnlockedObj
    );
  }

  return (
    <ModalComponent open={open} title="Résumé" size="default" {...rest}>
      imh
    </ModalComponent>
  );
};

export default ModalInterrogatoireResumeComponent;
