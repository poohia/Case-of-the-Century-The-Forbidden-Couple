import { useCallback, useEffect, useState } from "react";

import { SceneObject } from "../../types";
import { useGameProvider } from "../../gameProvider";

type SceneOptions = {
  primarySoundVolume?: number;
  preloadSounds?: { sound: string; volume?: number; loop?: boolean }[];
  releaseSounds?: { sound: string; fadeDuration?: number }[];
};

const useScene = (data: SceneObject, options?: SceneOptions) => {
  const {
    playSoundWithPreload,
    nextScene: nextSceneProvider,
    prevScene,
    preloadSound,
    releaseSound,
    pauseAllSoundExcept,
  } = useGameProvider();
  const { _id, _actions, _music } = data;
  const [optionsLoaded, setOptionsLoaded] = useState<boolean>(false);

  const nextScene = useCallback(() => {
    if (!_actions) {
      console.warn(`Current scene ID: ${_id} dosn't have next scene`);
    } else {
      nextSceneProvider(_actions[0]._scene);
    }
  }, [_actions]);

  useEffect(() => {
    if (_music) {
      pauseAllSoundExcept(_music).then(() => {
        playSoundWithPreload(_music, options?.primarySoundVolume);
      });
    }
  }, [_music]);

  useEffect(() => {
    if (!options) {
      return;
    }
    const { preloadSounds, releaseSounds } = options;
    Promise.all([
      new Promise<void>((resolve, reject) => {
        if (!preloadSounds || preloadSounds.length === 0) {
          resolve();
          return;
        }
        Promise.all(
          preloadSounds.map((pSound) =>
            preloadSound(pSound.sound, pSound.volume, pSound.loop)
          )
        )
          .then(() => resolve())
          .catch(reject);
      }),
    ]).then(() => {
      setOptionsLoaded(true);
    });
    return () => {
      Promise.all([
        new Promise<void>((resolve, reject) => {
          if (!releaseSounds || releaseSounds.length === 0) {
            resolve();
            return;
          }
          Promise.all(
            releaseSounds.map((pSound) =>
              releaseSound(pSound.sound, pSound.fadeDuration)
            )
          )
            .then(() => resolve())
            .catch(reject);
        }),
      ]);
    };
  }, []);

  return {
    optionsLoaded,
    nextScene,
    prevScene,
  };
};

export default useScene;
