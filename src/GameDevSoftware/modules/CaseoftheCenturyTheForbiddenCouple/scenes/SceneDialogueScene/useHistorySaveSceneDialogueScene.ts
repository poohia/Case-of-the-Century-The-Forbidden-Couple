import { useCallback, useEffect, useMemo, useState } from "react";
import {
  DialogueInterface,
  ResponseInterface as ResponseType,
} from "../../../../game-types";
import { useGameProvider } from "../../../../../gameProvider";

const useHistorySaveSceneDialogueScene = (id: number) => {
  const { getData, saveData, getEnvVar } = useGameProvider();

  const DISABLE_SAVE_DIALOGUE = useMemo(
    () => getEnvVar<boolean>("DISABLE_SAVE_DIALOGUE"),
    []
  );

  const TABLE_RESPONSES_HISTORY = useMemo(
    () => `dialogue_${id}_responses_history`,
    [id]
  );
  const TABLE_DIALOGUES_HISTORY = useMemo(
    () => `dialogue_${id}_dialogues_history`,
    [id]
  );
  const TABLE_LAST_DIALOGUE = useMemo(
    () => `dialogue_${id}_last_dialogue`,
    [id]
  );

  const [historiesResponses, setHistoriesResponses] = useState<number[]>(() => {
    return DISABLE_SAVE_DIALOGUE ? [] : getData(TABLE_RESPONSES_HISTORY) || [];
  });

  const [historiesDialogues, setHistoriesDialogues] = useState<number[]>(() => {
    return DISABLE_SAVE_DIALOGUE ? [] : getData(TABLE_DIALOGUES_HISTORY) || [];
  });

  const [lastDialogue, setLastDialogue] = useState<number | null>(() => {
    return DISABLE_SAVE_DIALOGUE ? null : getData(TABLE_LAST_DIALOGUE) || null;
  });

  const handleResponse = useCallback(
    (response: ResponseType) => {
      setHistoriesResponses((h) => {
        h = h.filter((hh) => hh !== response._id).concat(response._id);
        saveData(TABLE_RESPONSES_HISTORY, h);
        return h;
      });
    },
    [id]
  );

  const handleSetDialogue = useCallback(
    (dialogue: DialogueInterface) => {
      setLastDialogue(dialogue._id);
      saveData(TABLE_LAST_DIALOGUE, dialogue._id);
      setHistoriesDialogues((d) => {
        d = d.filter((dd) => dd !== dialogue._id).concat(dialogue._id);
        saveData(TABLE_DIALOGUES_HISTORY, d);
        return d;
      });
    },
    [id]
  );

  useEffect(() => {
    if (DISABLE_SAVE_DIALOGUE) {
      setHistoriesResponses([]);
      saveData(TABLE_RESPONSES_HISTORY, []);
      saveData(TABLE_DIALOGUES_HISTORY, []);
      saveData(TABLE_LAST_DIALOGUE, null);
      setLastDialogue(null);
      return;
    }
  }, []);

  return {
    historiesResponses,
    historiesDialogues,
    lastDialogue,
    handleResponse,
    handleSetDialogue,
  };
};

export default useHistorySaveSceneDialogueScene;
