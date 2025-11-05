import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useGameProvider } from "../../../../../gameProvider";
import { useGameObjects } from "../../../../../hooks";
import { GameTextsInterface } from "../../../../game-types";
import PointsContext from "../../contexts/PointsContext";

const useNotify = () => {
  const { saveData, getData, playSoundEffect } = useGameProvider();
  const { getGameObjectsFromId } = useGameObjects();
  const { addPoints } = useContext(PointsContext);

  const [showAnimation, setShowAnimation] = useState<boolean>(false);

  useEffect(() => {
    if (showAnimation) {
      playSoundEffect({
        sound: "notify.mp3",
      });
      setTimeout(() => {
        setShowAnimation(false);
      }, 700);
    }
  }, [showAnimation]);

  /** */
  const [gameTextsNotify, setGameTextsNotify] = useState<string[]>(() => {
    return getData("gameTextsNotify") || [];
  });

  const hasGameTextsNotify = useMemo(
    () => gameTextsNotify.length > 0,
    [gameTextsNotify]
  );

  const addGameTextsNotify = useCallback((ids: string[]) => {
    setGameTextsNotify((_gameTextsNotify) => {
      if (_gameTextsNotify.find((gameTextId) => ids.includes(gameTextId))) {
        return _gameTextsNotify;
      }
      setShowAnimation(true);
      return _gameTextsNotify.concat(ids);
    });
  }, []);

  const removeGameTextsNotify = useCallback((id: string) => {
    setGameTextsNotify((_gameTextsNotify) =>
      _gameTextsNotify.filter((gameTextId) => id !== gameTextId)
    );
  }, []);

  const getGameTextsNotifyByCharacterId = useCallback(
    (characterId: string | number) => {
      const gtn = (getData<string[]>("gameTextsNotify") || [])
        .map((textNotifyId) =>
          getGameObjectsFromId<GameTextsInterface>(textNotifyId)
        )
        .filter(
          (gameText) =>
            gameText?.object.replace("@go:", "") === String(characterId)
        );
      return gtn;
    },
    [getData]
  );

  const removeGameTextsNotifyByCharacterId = useCallback(
    (characterId: string | number) => {
      const gameTextsNotify = (getData<string[]>("gameTextsNotify") || [])
        .map((textNotifyId) =>
          getGameObjectsFromId<GameTextsInterface>(textNotifyId)
        )
        .filter(
          (gameText) =>
            gameText?.object.replace("@go:", "") === String(characterId)
        );
      gameTextsNotify.forEach((text) => {
        if (text) {
          addPoints(`text-character-${text._id}`, 10);
        }
      });
      setGameTextsNotify((_gameTextsNotify) => {
        return _gameTextsNotify.filter(
          (gameTextId) =>
            !gameTextsNotify.find(
              (textNotify) => textNotify?._id === Number(gameTextId)
            )
        );
      });
    },
    [getData]
  );

  useEffect(() => {
    saveData("gameTextsNotify", gameTextsNotify);
  }, [gameTextsNotify]);
  /** */

  /** */
  const [charactersNotify, setCharacterNotify] = useState<string[]>(() => {
    return getData<string[]>("charactersNotify") || [];
  });

  const hasCharactersNotify = useMemo(
    () => charactersNotify.length > 0 || hasGameTextsNotify,
    [charactersNotify, hasGameTextsNotify]
  );

  const addCharacterNotify = useCallback((ids: string[]) => {
    setCharacterNotify((_charactersNotify) => {
      if (_charactersNotify.find((characterId) => ids.includes(characterId))) {
        return _charactersNotify;
      }
      setShowAnimation(true);
      return _charactersNotify.concat(ids);
    });
  }, []);

  const removeCharacterNotify = useCallback((id: string | number) => {
    setCharacterNotify((_charactersNotify) =>
      _charactersNotify.filter((characterId) => String(id) !== characterId)
    );
  }, []);

  const getCharacterNotifyById = useCallback(
    (id: string | number) =>
      (getData<string[]>("charactersNotify") || []).find(
        (c) => c === String(id)
      ),
    [getData]
  );

  useEffect(() => {
    saveData("charactersNotify", charactersNotify);
  }, [charactersNotify]);
  /** */

  /** */
  const [scenariosNotify, setScenariosNotify] = useState<string[]>(() => {
    return getData<string[]>("scenariosNotify") || [];
  });

  const hasScenariosNotify = useMemo(
    () => scenariosNotify.length > 0,
    [scenariosNotify]
  );

  const addScenarioNotify = useCallback((ids: string[]) => {
    setScenariosNotify((_scenariosNotify) => {
      if (_scenariosNotify.find((scenarioId) => ids.includes(scenarioId))) {
        return _scenariosNotify;
      }
      setShowAnimation(true);
      return _scenariosNotify.concat(ids);
    });
  }, []);

  const removeScenarioNotify = useCallback((id: string | number) => {
    addPoints(`scenario-${id}`, 10);
    setScenariosNotify((_scenariosNotify) =>
      _scenariosNotify.filter((scenarioId) => String(id) !== scenarioId)
    );
  }, []);

  const getScenarioNotifyById = useCallback(
    (id: string | number) =>
      (getData<string[]>("scenariosNotify") || []).find(
        (c) => c === String(id)
      ),
    [getData]
  );

  useEffect(() => {
    saveData("scenariosNotify", scenariosNotify);
  }, [scenariosNotify]);
  /** */

  /** */
  const [notesInspecteurNotify, setNotesInspecteurNotify] = useState<string[]>(
    () => {
      return getData<string[]>("notesInspecteurNotify") || [];
    }
  );

  const hasNotesInspecteurNotify = useMemo(
    () => notesInspecteurNotify.length > 0,
    [notesInspecteurNotify]
  );

  const addNotesInspecteurNotify = useCallback((ids: string[]) => {
    setNotesInspecteurNotify((_notesInspecteurNotify) => {
      if (
        _notesInspecteurNotify.find((notesInspecteurNotifyId) =>
          ids.includes(notesInspecteurNotifyId)
        )
      ) {
        return _notesInspecteurNotify;
      }
      setShowAnimation(true);
      return _notesInspecteurNotify.concat(ids);
    });
  }, []);

  const removeNotesInspecteurNotify = useCallback((id: string | number) => {
    addPoints(`notes-${id}`, 10);
    setNotesInspecteurNotify((_notesInspecteurNotify) =>
      _notesInspecteurNotify.filter(
        (notesInspecteurNotifyId) => String(id) !== notesInspecteurNotifyId
      )
    );
  }, []);

  const getNotesInspecteurNotifyById = useCallback(
    (id: string | number) =>
      (getData<string[]>("notesInspecteurNotify") || []).find(
        (c) => c === String(id)
      ),
    [getData]
  );

  useEffect(() => {
    saveData("notesInspecteurNotify", notesInspecteurNotify);
  }, [notesInspecteurNotify]);
  /** */

  const hasNotify = useMemo(
    () =>
      hasCharactersNotify ||
      hasGameTextsNotify ||
      hasScenariosNotify ||
      hasNotesInspecteurNotify,
    [
      hasCharactersNotify,
      hasGameTextsNotify,
      hasScenariosNotify,
      hasNotesInspecteurNotify,
    ]
  );

  return {
    showAnimation,
    /** */
    gameTextsNotify,
    hasGameTextsNotify,
    addGameTextsNotify,
    removeGameTextsNotify,
    getGameTextsNotifyByCharacterId,
    removeGameTextsNotifyByCharacterId,
    /** */
    charactersNotify,
    hasCharactersNotify,
    addCharacterNotify,
    removeCharacterNotify,
    getCharacterNotifyById,
    /** */
    scenariosNotify,
    hasScenariosNotify,
    addScenarioNotify,
    removeScenarioNotify,
    getScenarioNotifyById,
    /** */
    notesInspecteurNotify,
    hasNotesInspecteurNotify,
    addNotesInspecteurNotify,
    removeNotesInspecteurNotify,
    getNotesInspecteurNotifyById,
    /** */
    hasNotify,
  };
};

export default useNotify;
