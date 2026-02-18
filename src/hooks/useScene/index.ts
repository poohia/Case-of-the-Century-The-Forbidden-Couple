import { useCallback, useEffect, useState } from "react";

import { SceneObject } from "../../types";
import { useGameProvider } from "../../gameProvider";
import pagesConfig from "../../GameDevSoftware/pages.json";
import useCache from "../useCache";

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
  const { fetchCachesBySceneIds } = useCache();

  const { _id, _actions } = data;
  const [optionsLoaded, setOptionsLoaded] = useState<boolean>(false);

  const nextScene = useCallback(
    (actionId = 0) => {
      if (
        demo &&
        pagesConfig.endDemoPath.beforeSceneId &&
        _id === pagesConfig.endDemoPath.beforeSceneId
      ) {
        push("endDemo");
      } else if (!_actions?.length) {
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

  useEffect(() => {
    fetchCachesBySceneIds([
      _id,
      ..._actions.map((a) => a._scene.replace("@s:", "")).map(Number),
    ]);
  }, []);

  return {
    optionsLoaded,
    nextScene,
    prevScene,
  };
};

export default useScene;
