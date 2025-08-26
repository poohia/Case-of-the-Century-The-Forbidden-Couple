import { useCallback, useMemo, useState } from "react";
import { useGameProvider } from "../../../../../gameProvider";

const useNotify = () => {
  const { saveData, getData } = useGameProvider();

  const [charactersNotify, setCharacterNotify] = useState<string[]>(() => {
    return getData("charactersNotify") || [];
  });

  const hasCharactersNotify = useMemo(
    () => charactersNotify.length > 0,
    [charactersNotify]
  );

  const addCharacterNotify = useCallback(
    (ids: string[]) => {
      setCharacterNotify((_charactersNotify) =>
        charactersNotify
          .filter((characterId) => !ids.includes(characterId))
          .concat(ids)
      );
    },
    [charactersNotify]
  );

  const removeCharacterNotify = useCallback((id: string) => {
    setCharacterNotify((_charactersNotify) =>
      _charactersNotify.filter((characterId) => id !== characterId)
    );
  }, []);

  useMemo(() => {
    saveData("charactersNotify", charactersNotify);
  }, [charactersNotify]);

  return {
    charactersNotify,
    hasCharactersNotify,
    addCharacterNotify,
    removeCharacterNotify,
  };
};

export default useNotify;
