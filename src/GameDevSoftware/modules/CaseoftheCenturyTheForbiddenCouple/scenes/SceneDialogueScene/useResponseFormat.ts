import { useCallback, useEffect, useMemo, useState } from "react";
import { DialogueInterface, ResponseInterface } from "../../../../game-types";
import { useGameObjects } from "../../../../../hooks";
import { limiteArray, shuffleArray } from "../../utils";

const useResponseFormat = (opts: {
  dialogue: DialogueInterface;
  historiesResponses: number[];
  historiesDialogues: number[];
  defaultResponses: string[];
}) => {
  const { getGameObject } = useGameObjects();

  const { dialogue, defaultResponses, historiesResponses, historiesDialogues } =
    opts;

  /**  */
  const dialogueResponsesObject = useMemo<ResponseInterface[]>(
    () =>
      dialogue.responses?.map((response) =>
        getGameObject<ResponseInterface>(response)
      ) || [],
    [dialogue]
  );

  const defaultResponsesObject = useMemo<ResponseInterface[]>(
    () =>
      defaultResponses.map((response) =>
        getGameObject<ResponseInterface>(response)
      ),
    [defaultResponses]
  );

  const responsesHistoriesDialogue = useMemo<ResponseInterface[]>(() => {
    const dialogues: DialogueInterface[] = historiesDialogues.flatMap((d) =>
      getGameObject(d.toString())
    );

    return dialogues
      .flatMap((d) => d.responses || [])
      .map((r) => getGameObject(r))
      .filter(
        (response, index, self) =>
          index === self.findIndex((t) => t._id === response._id)
      );
  }, [historiesDialogues]);
  /** */

  const [responsesObject, setResponsesObject] = useState<ResponseInterface[]>(
    []
  );
  const [dontHaveResponses, setDontHaveResponses] = useState<boolean>(false);

  /** */
  const filterReponsesByHistories = useCallback(
    (
      prevDialogueResponses: ResponseInterface[],
      historiesResponses: number[]
    ) => {
      const responses = prevDialogueResponses.filter(
        (response) =>
          // Filtré si déjà répondu
          !historiesResponses.includes(response._id) &&
          // 'dontShowIf' Prendre en compte la key “dontShowIf” si la valeur est remplie il faut condition l’affichage de la réponse par rapport aux autres réponses
          !(
            response.dontShowIf &&
            !historiesResponses.includes(Number(response.dontShowIf))
          )
      );

      return responses;
    },
    []
  );
  /** */

  useEffect(() => {
    Promise.all([
      // _dialogueResponsesFilterByHistories
      new Promise<ResponseInterface[]>((resolve) => {
        resolve(
          dialogueResponsesObject.filter(
            (response) => !historiesResponses.includes(response._id)
          )
        );
      }),
      // _responsesFilterHistoriesDialogues
      new Promise<ResponseInterface[]>((resolve) => {
        const responsesFilterHistoriesDialogues = filterReponsesByHistories(
          responsesHistoriesDialogue,
          historiesResponses
        ).filter(
          (response) =>
            !dialogueResponsesObject.find((d) => d._id === response._id)
        );
        if (responsesFilterHistoriesDialogues.length !== 0) {
          resolve(shuffleArray(responsesFilterHistoriesDialogues));
        } else {
          resolve([]);
        }
      }),
    ]).then(
      ([
        _dialogueResponsesFilterByHistories,
        _responsesFilterHistoriesDialogues,
      ]) => {
        /**
         * Scénario classique
         * Afficher les réponses possible dans SceneDialogue, ne pas afficher les réponses déjà répondu auparavant
         */
        if (
          !!_dialogueResponsesFilterByHistories.length &&
          !dialogue.canShowHistoryResponses
        ) {
          setResponsesObject(_dialogueResponsesFilterByHistories);
        } else if (
          /**
           * Si l'option canShowHistoryResponses est coché, afficher les réponses par défaut et celle débloqué dans l'historique
           */
          !!_dialogueResponsesFilterByHistories.length &&
          dialogue.canShowHistoryResponses
        ) {
          setResponsesObject([
            ..._dialogueResponsesFilterByHistories,
            ...shuffleArray(_responsesFilterHistoriesDialogues),
          ]);
        } else if (!!_responsesFilterHistoriesDialogues.length) {
          /**
           * Si l’embranchement pris a été exploité jusqu’au bout
           * Afficher les réponses non répondu mais débloqué précédemment mélangé
           */
          setResponsesObject(shuffleArray(_responsesFilterHistoriesDialogues));
        } else {
          /**
           * Si les réponses par “défaut” ont toutes étaient répondu et que l’embranchement a été exploité jusqu’au bout
           * Dans ce cas afficher les réponses defaultResponses non filtré et mélangé en plus
           */
          setResponsesObject(shuffleArray(defaultResponsesObject));
          setDontHaveResponses(true);
        }
      }
    );
  }, [dialogueResponsesObject]);

  const finalResponsesObject = useMemo<ResponseInterface[]>(
    () => limiteArray(responsesObject, 4),
    [responsesObject]
  );

  return { responsesObject: finalResponsesObject, dontHaveResponses };
};

export default useResponseFormat;
