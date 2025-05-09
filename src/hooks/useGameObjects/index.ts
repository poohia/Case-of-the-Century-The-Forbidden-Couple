import { useCallback } from "react";

import gobs from "../../GameDevSoftware/gameObjects/index.json";
import { ObjectGameTypeJSON } from "../../types";

const gamesobjects: ObjectGameTypeJSON[] = gobs as ObjectGameTypeJSON[];

const useGameObjects = () => {
  const getGameObject = useCallback(<T = any>(gameObject: string): T => {
    const gameObjectFind = gamesobjects.find(
      (go) =>
        Number(go.file.replace(".json", "")) ===
        Number(gameObject.replace("@go:", ""))
    );
    if (!gameObjectFind) {
      throw new Error(`Gameobject ${gameObject} undefined`);
    }
    return JSON.parse(
      JSON.stringify(
        require(`../../GameDevSoftware/gameObjects/${gameObjectFind.file}`)
          .default
      )
    );
  }, []);

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
