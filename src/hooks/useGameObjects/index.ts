import { useCallback, useEffect, useState } from "react";
import gamesobjects from "../../GameDevSoftware/gameObjects/index.json";
import { RetrospaceadventureCharacterJSON } from "../../GameDevSoftware/modules/retrospaceadventure/scenes/types";

const useGameObjects = () => {
  const [gameObjects, setGameObjects] = useState<
    RetrospaceadventureCharacterJSON[]
  >([]);

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
      )
    );
  }, []);

  useEffect(() => {
    setGameObjects((_) => {
      const _gameObjects: RetrospaceadventureCharacterJSON[] = [];
      gamesobjects.forEach((go) => {
        const values = require(`../../GameDevSoftware/gameObjects/${go.file}`);
        _gameObjects.push(values);
      });
      return _gameObjects;
    });
  }, []);

  return getGameObject;
};

export default useGameObjects;
