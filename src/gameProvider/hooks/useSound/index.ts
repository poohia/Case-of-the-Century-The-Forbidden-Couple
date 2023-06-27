/// <reference types="cordova-plugin-media" />
import { useCallback, useEffect } from "react";
import { useAssets } from "../../../hooks";
import { GameProviderHooksDefaultInterface } from "..";

type Sound = {
  sound: string;
  volume: number;
  media: Media;
};

export interface useSoundInterface
  extends GameProviderHooksDefaultInterface,
    ReturnType<typeof useSound> {}

let soundsLoaded: Sound[] = [];
let soundsPlaying: string[] = [];
let soundsPaused: string[] = [];

const useSound = (soundActivatedFromParams: boolean) => {
  const { getAssetSound } = useAssets();

  const preloadSound = useCallback(
    (
      sound: string,
      volume: number = 1,
      loop: boolean = true
    ): Promise<Sound | null> =>
      new Promise((resolve) => {
        const soundFind = soundsLoaded.find((s) => s.sound === sound);
        if (soundFind) {
          resolve(soundFind);
          return;
        }
        const assetPath = getAssetSound(sound);

        const s: Sound = {
          sound,
          volume,
          media: new Media(
            assetPath,
            () => {},
            () => {},
            (status) => {
              console.log(
                "🚀 ~ file: index.ts:57 ~ newPromise ~ status:",
                sound,
                Number(status),
                Number(Media.MEDIA_STOPPED),
                Number(status) === Number(Media.MEDIA_STOPPED)
              );
              if (Number(status) === Number(Media.MEDIA_STOPPED) && loop) {
                s.media.seekTo(0);
                s.media.play();
              } else if (Number(status) === Number(Media.MEDIA_STOPPED)) {
                soundsPlaying = soundsPlaying.filter((s) => s !== sound);
                s.media.seekTo(0);
              }
            }
          ),
        };
        soundsLoaded.push(s);
        resolve(s);
      }),
    []
  );

  const playSound = useCallback(
    async (
      sound: string,
      fadeDuration: number = 200,
      volume: number | null = null
    ) => {
      const soundFind = soundsLoaded.find((s) => s.sound === sound);
      if (!soundFind) {
        return;
      }
      volume = volume || soundFind.volume;
      const soundPlayingFind = soundsPlaying.find((s) => s === sound);

      if (volume !== null) {
        soundFind.volume = volume;
      }

      if (typeof soundPlayingFind !== "undefined") {
        soundFind.media.setVolume(volume);
        return;
      }
      if (soundActivatedFromParams) {
        fadeIn(soundFind, fadeDuration);
        soundFind.media.play();
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

  const playSoundWithPreload = useCallback(
    (
      sound: string,
      volume: number = 1,
      loop: boolean = true,
      fadeDuration?: number
    ) =>
      new Promise((resolve, reject) => {
        sound = sound.replace("@a:", "");
        const soundFind = soundsLoaded.find((s) => s.sound === sound);

        if (!!soundFind) {
          playSound(sound, fadeDuration, volume).then(resolve).catch(reject);
        } else {
          preloadSound(sound, volume, loop).then(() =>
            playSound(sound, fadeDuration, volume).then(resolve).catch(reject)
          );
        }
      }),
    [playSound, preloadSound]
  );

  const stopSound = useCallback(
    async (sound: string, fadeDuration?: number, justPause: boolean = true) => {
      const soundFind = soundsLoaded.find((s) => s.sound === sound);
      const soundPlayingFind = soundsPlaying.find((s) => s === sound);
      if (!soundFind || !soundPlayingFind) {
        console.warn(`Sound ${sound} not found`);
        return;
      }
      fadeOut(soundFind, fadeDuration).then((media) => {
        soundsPlaying = soundsPlaying.filter((s) => s !== soundFind.sound);
        media.pause();
        // if (justPause) {
        //   media.pause();
        // } else {
        //   media.stop();
        //   media.release();
        //   soundsLoaded = soundsLoaded.filter(
        //     (s) => s.sound !== soundFind.sound
        //   );

        //   soundsPaused = soundsPaused.filter((s) => s !== soundFind.sound);
        // }
        // soundsPlaying = soundsPlaying.filter((s) => s !== soundFind.sound);
      });
      return;
    },
    []
  );

  const stopAllSound = useCallback(
    (fadeDuration?: number) => {
      return Promise.all(
        soundsPlaying.map((s) => stopSound(s, fadeDuration, false))
      );
    },
    [stopSound]
  );

  const stopAllSoundExceptOne = useCallback(
    (sound: string, fadeDuration?: number) => {
      return Promise.all(
        soundsPlaying
          .filter((s) => s !== sound)
          .map((s) => stopSound(s, fadeDuration, false))
      ).then(() => {
        soundsLoaded = soundsLoaded.filter((s) => s.sound === sound);
        // soundsPlaying = soundsPlaying.filter((s) => s !== exceptSound);
      });
    },
    [stopSound]
  );

  const pauseAllSound = useCallback(
    (fadeDuration?: number) => {
      soundsPaused = soundsPlaying;
      return Promise.all(soundsPlaying.map((s) => stopSound(s, fadeDuration)));
    },
    [stopSound]
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
    (sound: Sound, duration: number = 200): Promise<Media> =>
      new Promise((resolve) => {
        let volume = 0;
        sound.media.setVolume(volume);
        const timeOut = setInterval(() => {
          if (volume >= sound.volume) {
            sound.media.setVolume(sound.volume);
            clearInterval(timeOut);
            resolve(sound.media);
          } else {
            sound.media.setVolume(volume);
            volume += 0.1;
          }
        }, duration);
      }),
    []
  );

  const fadeOut = useCallback(
    (sound: Sound, duration: number = 50): Promise<Media> =>
      new Promise((resolve) => {
        let volume = sound.volume;
        sound.media.setVolume(volume);
        const timeOut = setInterval(() => {
          if (volume <= 0) {
            resolve(sound.media);
            clearInterval(timeOut);
          } else {
            sound.media.setVolume(volume);
            volume -= 0.1;
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
  }, []);

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
  }, []);

  return {
    loaded: true,
    playSoundWithPreload,
    preloadSound,
    playSound,
    stopSound,
    stopAllSound,
    pauseAllSound,
    stopAllSoundExceptOne,
  };
};

export default useSound;
