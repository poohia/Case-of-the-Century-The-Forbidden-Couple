import { useCallback, useEffect, useState } from "react";

import { SceneObject } from "../../types";
import { useGameProvider } from "../../gameProvider";
import pagesConfig from "../../GameDevSoftware/pages.json";

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
    demo,
    prevScene,
    playMusic,
    releaseAllMusic,
    releaseMusic,
    releaseAllSoundEffect,
    push,
  } = useGameProvider();
  const { _id, _actions } = data;
  const [optionsLoaded, setOptionsLoaded] = useState<boolean>(false);

  const nextScene = useCallback(
    (actionId?: number) => {
      if (
        demo &&
        pagesConfig.endDemoPath.beforeSceneId &&
        _id === pagesConfig.endDemoPath.beforeSceneId
      ) {
        push("endDemo");
      } else if (!_actions || !actionId) {
        push("credits");
      } else {
        nextSceneProvider(_actions[actionId]._scene);
      }
    },
    [_id, _actions]
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
