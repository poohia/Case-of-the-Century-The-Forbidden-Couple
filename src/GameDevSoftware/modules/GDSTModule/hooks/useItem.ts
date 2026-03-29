import { useCallback } from "react";

import { useGameObjects } from "../../../../hooks";

const useItem = () => {
  const { getGameObjectsFromId, getGameObjectsFromType } = useGameObjects();

  const getItemsByUniqKey = useCallback((uniqKey: string) => {
    return getGameObjectsFromType("item").filter(
      (go) => go.uniqKey === uniqKey
    );
  }, []);

  return {
    getItemsByUniqKey,
  };
};

export default useItem;
