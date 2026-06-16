import { useCallback } from "react";

import gobs from "../../GameDevSoftware/gameObjects/index.json";
import { ObjectGameTypeJSON } from "../../types";

const gamesobjects: ObjectGameTypeJSON[] = gobs as ObjectGameTypeJSON[];

const useGameObjects = () => {
  const getGameObject = useCallback(
    <T = any>(gameObjectId: string | number): T => {
      if (typeof gameObjectId === "string") {
        gameObjectId = gameObjectId.replace("@go:", "");
      }

      const gameObjectFind = gamesobjects.find(
        (go) => go.file === `${gameObjectId}.json`
      );

      if (!gameObjectFind) {
        throw new Error(`Gameobject ${gameObjectId} undefined`);
      }
      return JSON.parse(
        JSON.stringify(
          require(`../../GameDevSoftware/gameObjects/${gameObjectFind.file}`)
            .default
        )
      );
    },
    []
  );

  const getGameObjectsFromType = useCallback(<T = any>(type: string): T[] => {
    const gameObjectByType: T[] = [];
    const gameObjectsFilter = gamesobjects.filter((go) => go.type === type);

    gameObjectsFilter.forEach((go) => {
      gameObjectByType.push(
        JSON.parse(
          JSON.stringify(
            require(`../../GameDevSoftware/gameObjects/${go.file}`).default
          )
        )
      );
    });

    return gameObjectByType;
  }, []);

  return { getGameObject, getGameObjectsFromType };
};

export default useGameObjects;
