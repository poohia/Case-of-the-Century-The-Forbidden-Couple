import { useEffect, useMemo, useState } from "react";
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
  const dialogueResponsesObject = useMemo(
    () =>
      dialogue.responses?.map((response) =>
        getGameObject<ResponseInterface>(response)
      ) || [],
    [dialogue]
  );
  const defaultResponsesObject = useMemo(
    () =>
      defaultResponses.map((response) =>
        getGameObject<ResponseInterface>(response)
      ),
    [defaultResponses]
  );

  const responsesFromHistoriesDialogues = useMemo<ResponseInterface[]>(() => {
    const dialogues: DialogueInterface[] = historiesDialogues.flatMap((d) =>
      getGameObject(d.toString())
    );

    console.log("===== responsesFromHistoriesDialogues =====");
    console.log("===== dialogues =====");
    console.log(dialogues);
    console.log("===== responses =====");
    console.log(
      dialogues
        .flatMap((d) => d.responses)
        .map((r) => getGameObject(r))
        .filter(
          (response, index, self) =>
            index === self.findIndex((t) => t._id === response._id)
        )
        .filter((response) => !historiesResponses.includes(response._id))
    );
    console.log("===== résultat final =====");
    const responses = dialogues
      .flatMap((d) => d.responses)
      .map((r) => getGameObject(r))
      .filter(
        (response, index, self) =>
          index === self.findIndex((t) => t._id === response._id)
      )
      .filter((response) => !historiesResponses.includes(response._id));

    return shuffleArray(responses);
  }, [historiesDialogues, historiesResponses]);

  const [responsesObject, setResponsesObject] = useState<ResponseInterface[]>(
    []
  );

  useEffect(() => {
    const finalResponses = dialogueResponsesObject.filter(
      (response) => !historiesResponses.includes(response._id)
    );
    let finalFinalResponses: ResponseInterface[] = [];
    if (finalResponses.length !== 0) {
      console.log("responses from finalResponses");
      finalFinalResponses = finalResponses;
    } else if (responsesFromHistoriesDialogues.length !== 0) {
      console.log("resposnes from responsesFromHistoriesDialogues");
      finalFinalResponses = responsesFromHistoriesDialogues;
    } else {
      console.log("resposnes from default dialogues", defaultResponsesObject);

      finalFinalResponses = defaultResponsesObject;
      setResponsesObject(finalFinalResponses);
      return;
      // console.log("resposnes from responses");
      // setResponsesObject(responses);
    }

    if (dialogue.canShowDefaultResponses) {
      finalFinalResponses = finalFinalResponses.concat(
        ...defaultResponsesObject
      );
    }

    setResponsesObject(finalFinalResponses);
  }, [dialogueResponsesObject]);

  return responsesObject;
};

export default useResponseFormat;
