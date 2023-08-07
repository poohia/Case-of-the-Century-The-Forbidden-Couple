import { useCallback, useEffect, useState } from "react";
import { SceneObject } from "../../types";
import { useGameProvider } from "../../gameProvider";
import useAssets from "../useAssets";

type SceneOptions = {
  primarySoundVolume?: number;
  preloadSounds?: { sound: string; volume?: number; loop?: boolean }[];
  releaseSounds?: { sound: string; fadeDuration?: number }[];
};

const useScene = (data: SceneObject, options?: SceneOptions) => {
  const {
    setPrimaryFont,
    playSoundWithPreload,
    nextScene: nextSceneProvider,
    prevScene: prevSceneProvider,
    preloadSound,
    releaseSound,
    pauseAllSoundExcept,
    setBackgroundColor,
  } = useGameProvider();
  const {
    _id,
    _actions,
    _font,
    _background,
    _music,
    _canPrevScene = false,
  } = data;
  const [optionsLoaded, setOptionsLoaded] = useState<boolean>(false);
  const { getAssetImg } = useAssets();

  const nextScene = useCallback(() => {
    if (!_actions) {
      console.warn(`Current scene ID: ${_id} dosn't have next scene`);
    } else {
      nextSceneProvider(_actions[0]._scene);
    }
  }, [_actions]);

  const prevScene = useCallback(() => {
    if (_canPrevScene) {
      prevSceneProvider();
    }
  }, [_canPrevScene]);

  useEffect(() => {
    if (_font) {
      setPrimaryFont(_font);
    }
  }, [_font]);

  useEffect(() => {
    console.log(
      "🚀 ~ file: index.ts:56 ~ useEffect ~ _background:",
      _background
    );
    if (_background) {
      setBackgroundColor(`url('${getAssetImg(_background)}')`);
    }
  }, [_background]);

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
