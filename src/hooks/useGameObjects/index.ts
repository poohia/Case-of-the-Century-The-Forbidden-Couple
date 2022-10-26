import { useCallback, useEffect, useState } from "react";
import gamesobjects from "../../GameDevSoftware/gameObjects/index.json";
import { RetrospaceadventureCharacterJSON } from "../../GameDevSoftware/modules/retrospaceadventure/scenes/types";

const useGameObjects = () => {
  const [gameObjects, setGameObjects] = useState<
    RetrospaceadventureCharacterJSON[]
  >([]);

  const getGameObject = useCallback(
    <T = any>(id: number): T => {
      const gameObjectFind = gameObjects.find((go) => go._id === id);
      if (!gameObjectFind) {
        throw new Error(`Gameobject ${id} undefined`);
      }
      return JSON.parse(JSON.stringify(gameObjectFind));
    },
    [gameObjects]
  );

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

  return {
    gameObjects,
    getGameObject,
  };
};

export default useGameObjects;
