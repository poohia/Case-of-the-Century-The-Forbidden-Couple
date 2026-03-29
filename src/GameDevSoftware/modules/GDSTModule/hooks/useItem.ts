import { useCallback } from "react";

import { useGameObjects } from "../../../../hooks";
import { Item } from "../types";

const useItem = () => {
  const { getGameObjectsFromId, getGameObjectsFromType } = useGameObjects();

  const getItemsByUniqueKey = useCallback((uniqKey: string) => {
    return getGameObjectsFromType<Item>("item").filter(
      (go) => go.uniqKey === uniqKey
    );
  }, []);

  return {
    getItemsByUniqueKey,
  };
};

export default useItem;
