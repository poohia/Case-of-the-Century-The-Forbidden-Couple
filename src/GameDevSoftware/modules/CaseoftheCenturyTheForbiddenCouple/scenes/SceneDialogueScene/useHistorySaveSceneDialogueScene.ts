import { useCallback, useEffect, useState } from "react";
import { Response as ResponseType } from "../../../../game-types";
import { useGameProvider } from "../../../../../gameProvider";

const useHistorySaveSceneDialogueScene = (id: number) => {
  const { getData, saveData } = useGameProvider();

  const TABLE_HISTORY = `dialogue_${id}_history`;

  const [historiesResponses, setHistoriesResponses] = useState<number[]>(() => {
    return getData(TABLE_HISTORY) || [];
  });

  const handleResponse = useCallback(
    (response: ResponseType) => {
      setHistoriesResponses((h) => {
        h.push(response._id);
        saveData(TABLE_HISTORY, h);
        return h;
      });
    },
    [id]
  );

  return {
    historiesResponses,
    handleResponse,
  };
};

export default useHistorySaveSceneDialogueScene;
