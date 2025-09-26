import { useCallback, useEffect, useMemo, useState } from "react";
import { DialogueInterface, ResponseInterface } from "../../../../game-types";
import { useGameObjects } from "../../../../../hooks";
import { shuffleArray } from "../../utils";

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

  /** */
  const filterReponsesByHistories = useCallback(
    (
      prevDialogueResponses: ResponseInterface[],
      historiesResponses: number[]
    ) => {
      const responses = prevDialogueResponses.filter(
        (response) =>
          !historiesResponses.includes(response._id) &&
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
      new Promise<ResponseInterface[]>((resolve) => {
        resolve(
          dialogueResponsesObject.filter(
            (response) => !historiesResponses.includes(response._id)
          )
        );
      }),
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
        _dialogueResponsesObject,
        _responsesFilterHistoriesDialogues,
        _defaultResponsesObjectFilterByHistoriesDialogues,
      ]) => {
        if (!!_dialogueResponsesObject.length) {
          console.log(
            "🚀 ~ useResponseFormat ~ _dialogueResponsesObject",
            _dialogueResponsesObject
          );
          setResponsesObject(
            _dialogueResponsesObject.concat(
              _defaultResponsesObjectFilterByHistoriesDialogues
            )
          );
        } else if (!!_responsesFilterHistoriesDialogues.length) {
          console.log(
            "🚀 ~ useResponseFormat ~ _responsesFromHistoriesDialogues",
            _responsesFilterHistoriesDialogues
          );
          setResponsesObject(
            _responsesFilterHistoriesDialogues.concat(
              _defaultResponsesObjectFilterByHistoriesDialogues
            )
          );
        } else if (!!_defaultResponsesObjectFilterByHistoriesDialogues.length) {
          console.log(
            "🚀 ~ useResponseFormat ~ _defaultResponsesObjectFilterByHistoriesDialogues",
            _defaultResponsesObjectFilterByHistoriesDialogues
          );
          setResponsesObject(_defaultResponsesObjectFilterByHistoriesDialogues);
        } else {
          console.log("🚀 ~ useResponseFormat ~ dialogueResponsesObject:");
          setResponsesObject(shuffleArray(defaultResponsesObject));
        }
      }
    );
  }, [dialogueResponsesObject]);

  return responsesObject;
};

export default useResponseFormat;
