import { useCallback, useEffect, useMemo, useState } from "react";

import {
  DialogueInterface,
  ResponseInterface as ResponseType,
} from "../../../../game-types";
import { useGameProvider } from "../../../../../gameProvider";
import { useGameObjects } from "../../../../../hooks";

const useHistorySaveSceneDialogueScene = (
  id: number,
  firstDialogue: string
) => {
  const { getData, saveData, getEnvVar } = useGameProvider();
  const { getGameObject } = useGameObjects();

  const DISABLE_SAVE_DIALOGUE = useMemo(
    () => getEnvVar<boolean>("DISABLE_SAVE_DIALOGUE"),
    []
  );

  const TABLE_RESPONSES_HISTORY_ALL = useMemo(
    () => `dialogue_responses_history`,
    []
  );
  const TABLE_DIALOGUES_HISTORY_ALL = useMemo(
    () => `dialogue_dialogues_history`,
    []
  );

  const TABLE_RESPONSES_HISTORY = useMemo(
    () => `dialogue_${id}_responses_history`,
    []
  );
  const TABLE_DIALOGUES_HISTORY = useMemo(
    () => `dialogue_${id}_dialogues_history`,
    []
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

  const historiesResponsesAll = useMemo<number[]>(() => {
    return getData(TABLE_RESPONSES_HISTORY_ALL) || [];
  }, [historiesResponses, getData]);

  // const historiesDialoguesAll = useMemo<number[]>(() => {
  //   return getData(TABLE_DIALOGUES_HISTORY_ALL) || [];
  // }, [historiesDialogues, getData]);

  const handleResponse = useCallback(
    (response: ResponseType) => {
      setHistoriesResponses((h) => {
        h = h.filter((hh) => hh !== response._id).concat(response._id);
        saveData(TABLE_RESPONSES_HISTORY, h);
        saveData(
          TABLE_RESPONSES_HISTORY_ALL,
          (getData(TABLE_RESPONSES_HISTORY_ALL) || []).concat(response._id)
        );
        return JSON.parse(JSON.stringify(h));
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
        saveData(TABLE_DIALOGUES_HISTORY_ALL, d);
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
    }
    handleSetDialogue(getGameObject(lastDialogue?.toString() || firstDialogue));
  }, []);

  return {
    historiesResponsesAll,
    // historiesDialoguesAll,
    historiesResponses,
    historiesDialogues,
    lastDialogue,
    handleResponse,
    handleSetDialogue,
  };
};

export default useHistorySaveSceneDialogueScene;
