import { useCallback, useEffect, useMemo, useState } from "react";
import { Dialogue, Response as ResponseType } from "../../../../game-types";
import { useGameProvider } from "../../../../../gameProvider";

const useHistorySaveSceneDialogueScene = (id: number) => {
  const { getData, saveData, getEnvVar } = useGameProvider();

  const disableSaveLastDialogue = useMemo(
    () => getEnvVar<boolean>("DISABLE_SAVE_DIALOGUE"),
    []
  );

  const TABLE_HISTORY = useMemo(() => `dialogue_${id}_history`, [id]);
  const TABLE_LAST_DIALOGUE = useMemo(() => `dialogue_${id}_dialogue`, [id]);

  const [historiesResponses, setHistoriesResponses] = useState<number[]>(() => {
    return getData(TABLE_HISTORY) || [];
  });

  const [lastDialogue, setLastDialogue] = useState<number | null>(() => {
    return getData(TABLE_LAST_DIALOGUE) || null;
  });

  const handleResponse = useCallback(
    (response: ResponseType) => {
      if (disableSaveLastDialogue) {
        return;
      }
      setHistoriesResponses((h) => {
        h = h.filter((hh) => hh !== response._id).concat(response._id);
        saveData(TABLE_HISTORY, h);
        return h;
      });
    },
    [id]
  );

  const handleSetDialogue = useCallback(
    (dialogue: Dialogue) => {
      if (disableSaveLastDialogue) {
        return;
      }
      setLastDialogue(dialogue._id);
      saveData(TABLE_LAST_DIALOGUE, dialogue._id);
    },
    [id]
  );

  useEffect(() => {
    if (disableSaveLastDialogue) {
      setHistoriesResponses([]);
      saveData(TABLE_HISTORY, []);
      saveData(TABLE_LAST_DIALOGUE, null);
      setLastDialogue(null);
      return;
    }
  }, []);

  return {
    historiesResponses,
    lastDialogue,
    handleResponse,
    handleSetDialogue,
  };
};

export default useHistorySaveSceneDialogueScene;
