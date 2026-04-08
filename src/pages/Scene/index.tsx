import { useState, useEffect } from "react";

import { useGameProvider } from "../../gameProvider";
import { useScenes } from "../../hooks";
import { SceneComponentProps, SceneObject, SceneTypeJSON } from "../../types";

const Scene = () => {
  const [scene, setScene] = useState<SceneTypeJSON>();
  const [sceneData, setSceneData] = useState<SceneObject>();
  const [Component, setComponent] = useState<SceneComponentProps>();

  const { game, push } = useGameProvider();
  const { findSceneComponent } = useScenes();

  useEffect(() => {
    if (game.currentScene === 0) {
      push("home");
      return;
    }
    const [s, sd, C] = findSceneComponent(game.currentScene);
    setScene(s);
    setSceneData(sd);
    setComponent(C);
  }, [game, push, findSceneComponent]);

  if (scene && sceneData && Component) {
    return <Component data={sceneData} />;
  }

  return <div />;
};

export default Scene;
