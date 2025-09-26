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
      .flatMap((d) => d.responses)
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

  // Afficher les réponses + defaultResponses dans Scene filtré si déjà répondu tout en évitant les doublons (.find)
  const concatWithDefaultResponsesObjectFilterByHistoriesDialogues =
    useCallback(
      (
        responses: ResponseInterface[],
        responsesObjectFilterByHistoriesDialogues: ResponseInterface[]
      ) => {
        return responses.concat(
          responsesObjectFilterByHistoriesDialogues.filter(
            (response) => !responses.find((r) => r._id === response._id)
          )
        );
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
        );
        if (responsesFilterHistoriesDialogues.length !== 0) {
          resolve(shuffleArray(responsesFilterHistoriesDialogues));
        } else {
          resolve([]);
        }
      }),
      // _defaultResponsesObjectFilterByHistoriesDialogues
      new Promise<ResponseInterface[]>((resolve) => {
        if (dialogue.canShowDefaultResponses) {
          resolve(
            shuffleArray(
              filterReponsesByHistories(
                defaultResponsesObject,
                historiesResponses
              )
            )
          );
        } else {
          resolve([]);
        }
      }),
    ]).then(
      ([
        _dialogueResponsesFilterByHistories,
        _responsesFilterHistoriesDialogues,
        _defaultResponsesObjectFilterByHistoriesDialogues,
      ]) => {
        /**
         * Scénario classique
         * Afficher les réponses possible dans SceneDialogue, ne pas afficher les réponses déjà répondu auparavant
         */
        if (!!_dialogueResponsesFilterByHistories.length) {
          setResponsesObject(
            concatWithDefaultResponsesObjectFilterByHistoriesDialogues(
              _dialogueResponsesFilterByHistories,
              _defaultResponsesObjectFilterByHistoriesDialogues
            )
          );
        } else if (!!_responsesFilterHistoriesDialogues.length) {
        /**
         * Si l’embranchement pris a été exploité jusqu’au bout
         * Afficher les réponses non répondu mais débloqué précédemment mélangé
         */
          setResponsesObject(
            concatWithDefaultResponsesObjectFilterByHistoriesDialogues(
              _responsesFilterHistoriesDialogues,
              _defaultResponsesObjectFilterByHistoriesDialogues
            )
          );
        } else if (!!_defaultResponsesObjectFilterByHistoriesDialogues.length) {
        /**
         * Afficher les réponses defaultResponses  dans Scene filtré si déjà répondu
         */
          setResponsesObject(_defaultResponsesObjectFilterByHistoriesDialogues);
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
