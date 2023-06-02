/// <reference types="cordova-plugin-media" />
import { useCallback, useEffect, useState } from "react";
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

const useSound = (soundActivatedFromParams: boolean) => {
  const { getAssetSound } = useAssets();

  const [soundsLoaded, setSoundsLoaded] = useState<Sound[]>([]);
  const [soundsPlaying, setSoundsPlaying] = useState<string[]>([]);
  const [soundsPaused, setSoundsPaused] = useState<Sound[]>([]);

  const [soundActivated, setSoundActivated] = useState<boolean>(
    soundActivatedFromParams
  );

  const preloadSound = useCallback(
    (
      sound: string,
      volume: number = 1,
      loop: boolean = true
    ): Promise<Sound | null> =>
      new Promise((resolve) => {
        sound = sound.replace("@a:", "");
        setSoundActivated((_soundActivated) => {
          if (!_soundActivated) {
            resolve(null);
            return _soundActivated;
          }
          setSoundsLoaded((_sounds) => {
            const soundFind = _sounds.find((s) => s.sound === sound);
            if (soundFind) {
              resolve(soundFind);
            } else {
              const assetPath = getAssetSound(sound);

              const s: Sound = {
                sound,
                volume,
                media: new Media(
                  assetPath,
                  () => {},
                  () => {},
                  (status) => {
                    if (status === Media.MEDIA_STOPPED && loop) {
                      s.media.seekTo(0);
                      s.media.play();
                    } else if (status === Media.MEDIA_STOPPED) {
                      setSoundsPlaying((_s) => _s.filter((s) => s !== sound));
                      s.media.seekTo(0);
                    }
                  }
                ),
              };
              resolve(s);
              _sounds.push(s);
            }
            return _sounds;
          });
          return _soundActivated;
        });
      }),
    []
  );

  const playSound = useCallback(
    (sound: string, fadeDuration: number = 200): Promise<Sound | null> =>
      new Promise((resolve) => {
        setSoundActivated((_soundActivated) => {
          if (!_soundActivated) {
            resolve(null);
            return _soundActivated;
          }

          setSoundsPlaying((_soundsPlaygins) => {
            const soundPlayingFind = _soundsPlaygins.find((s) => s === sound);

            if (soundPlayingFind) {
              resolve(null);
              return _soundsPlaygins;
            }
            setSoundsLoaded((_sounds) => {
              const soundFind = _sounds.find((s) => s.sound === sound);

              if (!soundFind) return _sounds;
              fadeIn(soundFind, fadeDuration);
              soundFind.media.play();
              resolve(soundFind);
              return _sounds;
            });
            return _soundsPlaygins.concat(sound);
          });
          return _soundActivated;
        });
      }),
    [soundActivated]
  );

  const stopSound = useCallback(
    (
      sound: string,
      fadeDuration?: number,
      justPause: boolean = true
    ): Promise<Sound | null> => {
      console.log(soundsLoaded);
      const soundFind = soundsLoaded.find((s) => s.sound === sound);
      const soundPlayingFind = soundsPlaying.find((s) => s === sound);
      if (!soundFind || !soundPlayingFind) {
        console.warn(`Sound ${sound} not found`);
        return Promise.resolve(null);
      }
      fadeOut(soundFind, fadeDuration).then((media) => {
        if (justPause) {
          media.pause();
          setSoundsPaused((s) => s.concat(soundFind));
        } else {
          media.stop();
          media.release();
          setSoundsLoaded((_s) =>
            _s.filter((s) => s.sound !== soundFind.sound)
          );
        }
        setSoundsPlaying((_s) => _s.filter((s) => s !== soundFind.sound));
      });

      return Promise.resolve(soundFind);
    },
    [soundsLoaded, soundsPlaying]
  );

  const resumeAllSoundPaused = useCallback(() => {
    Promise.all(soundsPaused.map((s) => playSound(s.sound)));
  }, [soundsPaused]);

  const stopAllSound = useCallback(
    (fadeDuration?: number): Promise<void> =>
      new Promise((resolve) => {
        Promise.all(
          soundsPlaying.map(
            (s) => stopSound(s, fadeDuration, false) as Promise<Sound>
          )
        ).then(() => {
          setSoundsLoaded([]);
          setSoundsPlaying([]);
          resolve();
        });
      }),

    [soundsPlaying, stopSound]
  );

  const pauseAllSound = useCallback(
    (fadeDuration?: number): Promise<Sound[]> =>
      Promise.all(
        soundsPlaying.map((s) => stopSound(s, fadeDuration) as Promise<Sound>)
      ),
    [soundsPlaying, stopSound]
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
        setSoundsLoaded((_soundsLoaded) => {
          if (!!_soundsLoaded.find((s) => s.sound === sound)) {
            playSound(sound, fadeDuration).then(resolve).catch(reject);
          } else {
            preloadSound(sound, volume, loop).then(() =>
              playSound(sound, fadeDuration).then(resolve).catch(reject)
            );
          }
          return _soundsLoaded;
        });
      }),
    [playSound, preloadSound]
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
    setSoundActivated(soundActivatedFromParams);
    if (!soundActivatedFromParams) {
      pauseAllSound();
    } else {
      resumeAllSoundPaused();
    }
  }, [soundActivatedFromParams, resumeAllSoundPaused]);

  useEffect(() => {
    const func = () => {
      // const sounds: Sound[] = [];
      // soundsPlaying.forEach((soundPlaying) => {
      //   const sound = soundsLoaded.find((s) => s.sound === soundPlaying);
      //   if (sound) {
      //     sound.media.pause();
      //     sounds.push(sound);
      //   }
      // });
      // setSoundsPaused(sounds);
      console.log("pause");
      pauseAllSound();
    };
    document.addEventListener("pause", func);
    return () => {
      console.log("end pause");
      document.removeEventListener("pause", func);
    };
  }, [pauseAllSound]);

  useEffect(() => {
    const func = () => {
      // soundsPaused.forEach((sound) => {
      //   fadeIn(sound);
      //   sound.media.play();
      // });
      console.log("resume");
      resumeAllSoundPaused();
    };
    document.addEventListener("resume", func);
    return () => {
      console.log("end resume");
      document.removeEventListener("resume", func);
    };
  }, [resumeAllSoundPaused]);

  return {
    loaded: true,
    playSoundWithPreload,
    preloadSound,
    playSound,
    stopSound,
    stopAllSound,
    pauseAllSound,
  };
};

export default useSound;
