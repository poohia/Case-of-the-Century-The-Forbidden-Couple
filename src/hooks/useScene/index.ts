import { useCallback, useEffect } from "react";
import { SceneObject } from "../../types";
import { useGameProvider } from "../../gameProvider";

const useScene = (data: SceneObject) => {
  const {
    setPrimaryFont,
    playSoundWithPreload,
    nextScene: nextSceneProvider,
  } = useGameProvider();
  const { _id, _actions, _font, _music } = data;

  const nextScene = useCallback(() => {
    if (!_actions) {
      console.warn(`Current scene ID: ${_id} dosn't have next scene`);
    } else {
      nextSceneProvider(_actions[0]._scene);
    }
  }, [_actions]);

  useEffect(() => {
    if (_font) {
      setPrimaryFont(_font);
    }
  }, [_font]);

  useEffect(() => {
    if (_music) {
      playSoundWithPreload(_music);
    }
  }, [_music]);

  return {
    nextScene,
  };
};

export default useScene;
