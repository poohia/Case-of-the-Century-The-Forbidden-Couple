import { useCallback, useEffect, useState } from "react";

import { SceneObject } from "../../types";
import { useGameProvider } from "../../gameProvider";

type SceneOptions = {
  musics?: {
    sound: string;
    volume?: number;
    fadeDuration?: number;
    loop?: boolean;
    seek?: number;
  }[];
};

const useScene = (data: SceneObject, options?: SceneOptions) => {
  const {
    parameters: { activatedMusic },
    nextScene: nextSceneProvider,
    prevScene,
    playMusic,
    releaseAllMusic,
    releaseMusic,
    releaseAllSoundEffect,
  } = useGameProvider();
  const { _id, _actions } = data;
  const [optionsLoaded, setOptionsLoaded] = useState<boolean>(false);

  const nextScene = useCallback(
    (actionId = 0) => {
      if (!_actions) {
        console.warn(`Current scene ID: ${_id} dosn't have next scene`);
      } else {
        nextSceneProvider(_actions[actionId]._scene);
      }
    },
    [_actions]
  );

  useEffect(() => {
    if (!options) {
      setOptionsLoaded(true);
      return;
    }
    const { musics } = options;

    releaseAllMusic(musics?.flatMap((music) => music.sound)).then(() => {
      musics?.forEach((music) => {
        if (activatedMusic) {
          playMusic({
            sound: music.sound,
            fadeDuration: music.fadeDuration,
            volume: music.volume,
            loop: music.loop,
            seek: music.seek,
          });
        } else {
          releaseMusic(music.sound);
        }
      });
    });
    releaseAllSoundEffect();
    setOptionsLoaded(true);
  }, [activatedMusic]);

  return {
    optionsLoaded,
    nextScene,
    prevScene,
  };
};

export default useScene;
