/// <reference types="cordova-plugin-media" />
import { useCallback, useEffect } from "react";

import { useAssets } from "../../../hooks";
import { GameProviderHooksDefaultInterface } from "..";
import { Platform } from "../../../types";

type Sound = {
  sound: string;
  volume: number;
  media: Media;
  released: boolean;
};

export interface useSoundInterface
  extends GameProviderHooksDefaultInterface,
    ReturnType<typeof useSound> {}

let soundsLoaded: Sound[] = [];
let soundsPlaying: string[] = [];
let soundsPaused: string[] = [];

const useSound = (
  soundActivatedFromParams: boolean,
  platform: Platform | null
) => {
  const { getAssetSound } = useAssets();

  const preloadSound = useCallback(
    async (sound: string, volume = 1, loop = true) => {
      sound = sound.replace("@a:", "");
      console.log("🚀 preloadSound", sound);
      const soundFind = soundsLoaded.find((s) => s.sound === sound);
      if (soundFind) {
        return null;
      }
      const assetPath = getAssetSound(sound, platform);
      console.log("🚀 ~ assetPath:", assetPath);

      const s: Sound = {
        sound,
        volume,
        released: false,
        media: new Media(
          assetPath,
          () => {
            console.log("🚀 load success", sound);
          },
          (err) => {
            console.log("🚀 load error", err, sound);
          },
          (status) => {
            console.log("🚀 ~ status:", status, sound);
            if (s.released) {
              return;
            }
            if (status === Media.MEDIA_STOPPED && loop) {
              s.media.seekTo(1);
              s.media.play({ playAudioWhenScreenIsLocked: false });
            } else if (status === Media.MEDIA_STOPPED) {
              soundsPlaying = soundsPlaying.filter((s) => s !== sound);
              s.media.seekTo(1);
            }
          }
        ),
      };
      soundsLoaded.push(s);
      return s;
    },
    [platform]
  );

  const playSound = useCallback(
    async (
      sound: string,
      fadeDuration = 200,
      volume: number | null = null,
      seek?: number
    ) => {
      sound = sound.replace("@a:", "");
      const soundFind = soundsLoaded.find((s) => s.sound === sound);
      if (!soundFind) {
        console.warn(`Sound ${sound} not found`);
        return;
      }
      // volume = volume || soundFind.volume;
      const soundPlayingFind = soundsPlaying.find((s) => s === sound);

      if (volume !== null) {
        soundFind.volume = volume;
      }

      soundFind.media.setVolume(soundFind.volume);

      if (typeof seek !== "undefined") {
        soundFind.media.seekTo(seek === 0 ? 1 : seek);
      }

      if (typeof soundPlayingFind !== "undefined" && volume !== null) {
        return;
      }
      if (soundActivatedFromParams) {
        if (fadeDuration !== 0) {
          fadeIn(soundFind, fadeDuration);
        } else {
          soundFind.media.play({ playAudioWhenScreenIsLocked: false });
        }
        soundsPlaying = soundsPlaying
          .filter((s) => s !== sound)
          .concat(soundFind.sound);
      } else {
        soundsPaused = soundsPaused
          .filter((s) => s !== sound)
          .concat(soundFind.sound);
      }
      return;
    },
    [soundActivatedFromParams]
  );

  const playSoundAtPercent = useCallback(
    (
      sound: string,
      fadeDuration = 200,
      percent: number,
      volume: number | null = null
    ) => {
      sound = sound.replace("@a:", "");
      const soundFind = soundsLoaded.find((s) => s.sound === sound);
      if (!soundFind) {
        console.warn(`Sound ${sound} not found`);
        return;
      }
      if (percent < 0) {
        percent = 0;
      }
      if (percent >= 99) {
        percent = 98;
      }
      const { media } = soundFind;

      const duration = media.getDuration();
      const seek = (percent / 100) * (duration * 1000);
      playSound(sound, fadeDuration, volume, seek);
    },
    [playSound]
  );

  const playSoundWithPreload = useCallback(
    (sound: string, volume = 1, loop = true, fadeDuration?: number) =>
      new Promise((resolve, reject) => {
        sound = sound.replace("@a:", "");
        const soundFind = soundsLoaded.find((s) => s.sound === sound);

        if (soundFind) {
          playSound(sound, fadeDuration, volume).then(resolve).catch(reject);
        } else {
          preloadSound(sound, volume, loop).then(() =>
            playSound(sound, fadeDuration, volume).then(resolve).catch(reject)
          );
        }
      }),
    [playSound, preloadSound]
  );

  const playSoundEffect = useCallback(
    async (sound: string, volume = 1) => {
      if (!soundActivatedFromParams) {
        return;
      }
      const assetPath = getAssetSound(sound, platform);
      const media = new Media(
        assetPath,
        () => {},
        () => {},
        (status) => {
          if (status === Media.MEDIA_STOPPED) {
            media.release();
          }
        }
      );
      media.setVolume(volume);
      media.play({ playAudioWhenScreenIsLocked: false });

      return 1;
    },
    [soundActivatedFromParams, platform]
  );

  const pauseSound = useCallback(
    async (sound: string, fadeDuration?: number) => {
      sound = sound.replace("@a:", "");
      const soundFind = soundsLoaded.find((s) => s.sound === sound);
      const soundPlayingFind = soundsPlaying.find((s) => s === sound);
      if (!soundFind || !soundPlayingFind) {
        console.warn(`Sound ${sound} not found`);
        return;
      }
      fadeOut(soundFind, fadeDuration).then((media) => {
        soundsPlaying = soundsPlaying.filter((s) => s !== soundFind.sound);
        media.pause();
      });
      return;
    },
    []
  );

  const pauseSounds = useCallback(
    async (sounds: string[], fadeDuration?: number) => {
      sounds.forEach((sound) => pauseSound(sound, fadeDuration));
    },
    []
  );

  const releaseSound = useCallback(
    async (sound: string, fadeDuration?: number) => {
      sound = sound.replace("@a:", "");
      const soundFind = soundsLoaded.find((s) => s.sound === sound);
      const soundPlayingFind = soundsPlaying.find((s) => s === sound);
      if (!soundFind) {
        return;
      }
      soundFind.released = true;
      if (soundPlayingFind) {
        await fadeOut(soundFind, fadeDuration);
      }
      soundsPlaying = soundsPlaying.filter((s) => s !== soundFind.sound);
      soundsLoaded = soundsLoaded.filter((s) => s.sound !== soundFind.sound);
      soundsPaused = soundsPaused.filter((s) => s !== soundFind.sound);
      soundFind.media.release();
      return;
    },
    []
  );

  const pauseAllSoundExcept = useCallback(
    (sounds: string | string[], fadeDuration?: number) => {
      return Promise.all(
        soundsPlaying
          .filter((s) => {
            if (typeof sounds === "string") {
              return s !== sounds.replace("@a:", "");
            }
            return sounds.map((s) => s.replace("@a:", "")).includes(s);
          })
          .map((s) => pauseSound(s, fadeDuration))
      );
      // .then(() => {
      //   soundsLoaded = soundsLoaded.filter((s) => {
      //     if (typeof sounds === "string") {
      //       return s.sound === sounds.replace("@a:", "");
      //     }
      //     return sounds.map((s) => s.replace("@a:", "")).includes(s.sound);
      //   });
      // });
    },
    [pauseSound]
  );

  const pauseAllSound = useCallback(
    (fadeDuration?: number) => {
      soundsPaused = soundsPlaying;
      return Promise.all(soundsPlaying.map((s) => pauseSound(s, fadeDuration)));
    },
    [pauseSound]
  );

  const resumeAllSoundPaused = useCallback(
    (fadeDuration?: number) => {
      return Promise.all(
        soundsPaused.map((s) => playSound(s, fadeDuration))
      ).then(() => {
        soundsPaused = [];
      });
    },
    [playSound]
  );

  const fadeIn = useCallback(
    (sound: Sound, duration = 200): Promise<Media> =>
      new Promise((resolve) => {
        let volume = 0;
        sound.media.setVolume(volume);

        const timeOut = setInterval(() => {
          volume = volume + 1;
          const finalVolume = volume / 10;

          if (volume === 1) {
            sound.media.play({ playAudioWhenScreenIsLocked: false });
          }
          if (finalVolume >= sound.volume) {
            sound.media.setVolume(sound.volume);
            clearInterval(timeOut);
            resolve(sound.media);
          } else {
            sound.media.setVolume(finalVolume);
          }
        }, duration);
      }),
    []
  );

  const fadeOut = useCallback(
    (sound: Sound, duration = 150): Promise<Media> =>
      new Promise((resolve) => {
        // Convertir le volume en "pas" entiers (ex: 1 => 10, 0.8 => 8)
        let volumeStep = Math.round(sound.volume * 10);
        // On force le volume courant
        sound.media.setVolume(volumeStep / 10);

        const timeOut = setInterval(() => {
          volumeStep--;
          const finalVolume = volumeStep / 10;

          if (finalVolume <= 0) {
            // On arrête tout à 0
            sound.media.setVolume(0);
            clearInterval(timeOut);
            resolve(sound.media);
          } else {
            // On applique le nouveau volume
            sound.media.setVolume(finalVolume);
          }
        }, duration);
      }),
    []
  );

  useEffect(() => {
    if (!soundActivatedFromParams) {
      pauseAllSound(0);
    } else {
      resumeAllSoundPaused(0);
    }
  }, [soundActivatedFromParams]);

  useEffect(() => {
    const func = () => {
      console.log("pause");
      pauseAllSound(0);
    };
    document.addEventListener("pause", func);
    return () => {
      console.log("end pause");
      document.removeEventListener("pause", func);
    };
  }, [soundActivatedFromParams]);

  useEffect(() => {
    const func = () => {
      console.log("resume");
      resumeAllSoundPaused(0);
    };
    document.addEventListener("resume", func);
    return () => {
      console.log("end resume");
      document.removeEventListener("resume", func);
    };
  }, [soundActivatedFromParams]);

  return {
    loaded: true,
    playSoundWithPreload,
    preloadSound,
    playSound,
    pauseSound,
    pauseSounds,
    pauseAllSound,
    pauseAllSoundExcept,
    releaseSound,
    playSoundEffect,
    playSoundAtPercent,
  };
};

export default useSound;
