import { useCallback } from "react";

import { useGameObjects } from "../../../../hooks";
import { Item } from "../types";
import { useGameProvider } from "../../../../gameProvider";

const useItem = () => {
  const { getValueFromConstant } = useGameProvider();
  const { getGameObjectsFromId, getGameObjectsFromType } = useGameObjects();

  const getItemsByUniqueKey = useCallback((uniqueKey: string) => {
    return getGameObjectsFromType<Item>("item").filter((go) => {
      if (go.uniqueKey.startsWith("@c:")) {
        return getValueFromConstant(uniqueKey) === uniqueKey;
      }
      return go.uniqueKey === uniqueKey;
    });
  }, []);

  return {
    getItemsByUniqueKey,
  };
};

export default useItem;
