import { useCallback } from "react";

import { useGameProvider } from "../../gameProvider";
import { ChoiceInterface } from "../../GameDevSoftware/game-types";

const table = "visualnovel-choices-history";

const useVisualNovelChoices = () => {
  const { saveData, getData } = useGameProvider();

  const handleClickChoice = useCallback(
    (id: number) => {
      const choices = getData<number[]>(table) ?? [];
      if (!choices.includes(id)) {
        choices.push(id);
      }
      saveData(table, choices);
    },
    [saveData, getData]
  );

  const filterChoices = useCallback(
    (choicesGo: ChoiceInterface[]) => {
      const choicesHistory = getData<number[]>(table) ?? [];
      return choicesGo.filter((choiceGo) => {
        // Si déjà fait ce choix ne pas le reproposer?
        // if (choicesHistory.includes(choiceGo._id)) {
        //   return false;
        // }

        if (
          choiceGo.dontShowIf &&
          choicesHistory.includes(
            Number(choiceGo.dontShowIf.replace("@go:", ""))
          )
        ) {
          return false;
        } else if (
          choiceGo.showIf &&
          !choicesHistory.includes(Number(choiceGo.showIf.replace("@go:", "")))
        ) {
          return false;
        }
        return true;
      });
    },
    [getData]
  );

  return { handleClickChoice, filterChoices };
};

export default useVisualNovelChoices;
