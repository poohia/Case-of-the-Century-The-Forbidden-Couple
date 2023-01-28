import { useCallback } from "react";
import gamesobjects from "../../GameDevSoftware/gameObjects/index.json";

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
      )
    );
  }, []);

  return getGameObject;
};

export default useGameObjects;
