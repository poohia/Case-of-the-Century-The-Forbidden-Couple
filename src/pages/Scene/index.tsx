import { useState, useEffect } from "react";

import { useGameProvider } from "../../gameProvider";
import { useScenes } from "../../hooks";
import { SceneComponentProps, SceneObject, SceneTypeJSON } from "../../types";

const Scene = () => {
  const [scene, setScene] = useState<SceneTypeJSON>();
  const [sceneData, setSceneData] = useState<SceneObject>();
  const [Component, setComponent] = useState<SceneComponentProps>();
  const [instanceKey, setInstanceKey] = useState(0);

  const { game, push } = useGameProvider();
  const { findScene } = useScenes();

  useEffect(() => {
    if (game.currentScene === 0) {
      push("home");
      return;
    }
    setInstanceKey((k) => k + 1);
    const [s, sd, C] = findScene(game.currentScene);
    setScene(s);
    setSceneData(sd);
    setComponent(C);
  }, [game, push, findScene]);

  if (scene && sceneData && Component) {
    return (
      <Component
        key={`scene-${game.currentScene}-${instanceKey}`}
        data={sceneData}
      />
    );
  }

  return <div />;
};

export default Scene;
