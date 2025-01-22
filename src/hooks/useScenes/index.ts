import { useCallback, lazy } from "react";
import scenes from "../../GameDevSoftware/scenes/index.json";
import { useGameProvider } from "../../gameProvider";
import { SceneObject, SceneTypeJSON } from "../../types";

const useScenes = () => {
  const { push } = useGameProvider();

  const formatSceneTypeName = useCallback((sceneType: string) => {
    return sceneType
      .replaceAll("-", "")
      .replaceAll(/\p{L}+('\p{L}+)?/gu, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.slice(1);
      });
  }, []);

  const findScene = useCallback(
    (sceneId: number): [SceneTypeJSON, SceneObject, any] => {
      const scene: SceneTypeJSON | undefined = scenes.find(
        (s) => Number(s.file.replace(".json", "")) === sceneId
      );
      if (!scene) {
        push("home");
        // @ts-ignore
        return;
      }
      const sceneData: SceneObject =
        require(`../../GameDevSoftware/scenes/${scene.file}`).default;
      console.log("🚀 ~ useScenes ~ sceneData:", sceneData);

      const Component = lazy(
        () =>
          import(
            `../../GameDevSoftware/modules/${
              scene.module
            }/scenes/${formatSceneTypeName(scene.type)}.tsx`
          )
      );

      return [scene, sceneData, Component];
    },
    [push, formatSceneTypeName]
  );

  const sceneToValue = useCallback((scene: string): number => {
    return Number(scene.replace("@s:", ""));
  }, []);

  return {
    findScene,
    sceneToValue,
  };
};

export default useScenes;
