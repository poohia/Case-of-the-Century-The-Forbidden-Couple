/// <reference types="cordova-plugin-media" />
import { useCallback, useEffect } from "react";
import { App } from "@capacitor/app";

import { GameProviderHooksDefaultInterface } from "..";
import { Platform } from "../../../types";
import { PluginListenerHandle } from "@capacitor/core";

type Sound = {
  sound: string;
  volume: number;
  media: Media;
  released: boolean;
};

export interface useSoundInterface
  extends GameProviderHooksDefaultInterface,
    ReturnType<typeof useSound> {}

const soundsEffectPlayed = new Map<string, Sound>();
const musicsPlayed = new Map<string, Sound>();
let musicsPaused = new Set<string>();

const useSound = (
  musicActivatedFromParams: number,
  soundsEffectActivatedFromParmas: number,
  platform: Platform | null,
  getAssetSound: (name: string) => string
) => {
  const fadeIn = useCallback(
    (sound: Sound, duration = 200): Promise<Media> =>
      new Promise((resolve) => {
        let volume = 0;
        sound.media.setVolume(volume);

        const timeOut = setInterval(() => {
          try {
            volume = volume + 1;
            const finalVolume = volume / 10;

            if (volume === 1) {
              sound.media?.play({ playAudioWhenScreenIsLocked: false });
            }
            if (finalVolume >= sound.volume) {
              sound.media.setVolume(sound.volume);
              clearInterval(timeOut);
              resolve(sound.media);
            } else {
              sound.media.setVolume(finalVolume);
            }
          } catch (e) {}
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
            sound.media.pause();
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

  /**  */

  const playMusic = useCallback(
    (props: {
      sound: string;
      fadeDuration?: number;
      volume?: number;
      loop?: boolean;
      seek?: number;
    }) => {
      let {
        sound,
        fadeDuration = 200,
        volume = 1,
        loop = true,
        seek = 1,
      } = props;
      volume = volume * musicActivatedFromParams;
      const assetPath = getAssetSound(sound);
      let s: Sound;
      if (musicsPlayed.get(sound)) {
        s = musicsPlayed.get(sound)!;
        s.media.setVolume(volume);
        return 1;
      } else {
        s = {
          sound,
          volume,
          released: false,
          media: new Media(
            assetPath,
            () => {},
            (err) => {
              console.error("🚀 load error", err, sound);
            },
            (status) => {
              if (s.released) {
                return;
              }
              if (status === Media.MEDIA_STOPPED && loop) {
                s.media.seekTo(1);
                s.media.play({ playAudioWhenScreenIsLocked: false });
              } else if (status === Media.MEDIA_STOPPED) {
                musicsPlayed.delete(sound);
                s.media.seekTo(1);
              }
            }
          ),
        };
      }
      if (seek === 0) {
        seek = 1;
      }
      s.media.seekTo(seek);
      s.media.setVolume(volume);
      musicsPlayed.set(sound, s);
      if (musicActivatedFromParams && fadeDuration !== 0) {
        fadeIn(s, fadeDuration);
      } else if (musicActivatedFromParams) {
        s.media.play({ playAudioWhenScreenIsLocked: false });
      } else {
        musicsPaused.add(sound);
      }

      return 1;
    },
    [musicActivatedFromParams, platform]
  );

  const pauseMusic = useCallback((sound: string) => {
    const s = musicsPlayed.get(sound);
    if (s) {
      musicsPaused.add(sound);
      s.media.pause();
    }
  }, []);

  const resumeMusic = useCallback((sound: string) => {
    const hasSound = musicsPaused.has(sound);
    if (hasSound) {
      musicsPaused.delete(sound);
      const s = musicsPlayed.get(sound);
      s?.media.play();
    }
  }, []);

  const releaseMusic = useCallback((sound: string) => {
    const s = musicsPlayed.get(sound);
    if (s) {
      musicsPlayed.delete(sound);
      musicsPaused.delete(sound);
      fadeOut(s).then(() => {
        s.released = true;
        s.media.release();
      });
    }
  }, []);

  const releaseAllMusic = useCallback(async (expect?: string | string[]) => {
    // On construit un tableau de Promises
    const tasks: Promise<void>[] = [];

    // musicsPlayed est une Map<string, { media: … }>
    for (const [key, s] of musicsPlayed.entries()) {
      // On skip les clés dans `expect`
      if (
        (typeof expect === "string" && expect === key) ||
        (Array.isArray(expect) && expect.includes(key))
      ) {
        continue;
      }

      // On retire de nos Maps
      musicsPlayed.delete(key);
      musicsPaused.delete(key);

      // On lance le fadeOut puis le release, en pushant la Promise dans tasks
      tasks.push(
        fadeOut(s).then(() => {
          s.released = true;
          s.media.release();
        })
      );
    }

    // Promise qui ne résout que quand **toutes** les tâches sont finies
    return Promise.all(tasks);
  }, []);

  const pauseAllMusic = useCallback(() => {
    musicsPlayed.forEach((s, key) => {
      musicsPaused.add(key);
      s.media.pause();
    });
  }, []);

  const resumeAllMusic = useCallback(() => {
    musicsPaused.forEach((key) => {
      musicsPlayed.get(key)?.media.play();
    });
    musicsPaused = new Set();
  }, []);

  const playSoundEffect = useCallback(
    (props: {
      sound: string;
      volume?: number;
      seek?: number;
      saveSoundEffect?: boolean;
      loop?: boolean;
      // If this prop is provided, it will take precedence over the soundsEffectActivatedFromParmas parameter in the total volume calculation
      ratio?: number;
    }) => {
      let {
        sound,
        volume = 1,
        seek = 1,
        saveSoundEffect = false,
        loop = false,
        ratio = soundsEffectActivatedFromParmas,
      } = props;
      if (!soundsEffectActivatedFromParmas) {
        return;
      }

      volume = volume * ratio;
      const assetPath = getAssetSound(sound);
      let s: Sound;
      if ((saveSoundEffect || loop) && soundsEffectPlayed.get(sound)) {
        return;
      } else {
        s = {
          sound,
          released: false,
          volume,
          media: new Media(
            assetPath,
            () => {},
            () => {},
            (status) => {
              if (s.released) {
                return;
              }
              if (status === Media.MEDIA_STOPPED && loop) {
                s.media.seekTo(1);
                s.media.play({ playAudioWhenScreenIsLocked: false });
              } else if (status === Media.MEDIA_STOPPED) {
                s.media.release();
                if (saveSoundEffect) {
                  soundsEffectPlayed.delete(sound);
                }
              }
            }
          ),
        };
        if (saveSoundEffect || loop) {
          soundsEffectPlayed.set(sound, s);
        }
      }

      if (seek === 0) {
        seek = 1;
      }
      s.media.seekTo(seek);
      s.media.setVolume(volume);
      s.media.play({ playAudioWhenScreenIsLocked: false });

      return 1;
    },
    [soundsEffectActivatedFromParmas, platform, getAssetSound]
  );

  const playSoundEffectAtPercent = useCallback(
    (sound: string, volume = 1, percent = 0, saveSoundEffect = false) => {
      if (!soundsEffectActivatedFromParmas) {
        return;
      }
      volume = volume * soundsEffectActivatedFromParmas;
      const assetPath = getAssetSound(sound);
      let s: Sound;
      if (saveSoundEffect && soundsEffectPlayed.get(sound)) {
        s = soundsEffectPlayed.get(sound)!;
        const duration = s.media.getDuration();

        let seek = (percent / 100) * (duration * 1000);
        if (seek <= 0 || seek === 0) {
          seek = 1;
        }
        s.media.seekTo(seek);
        s.media.play({ playAudioWhenScreenIsLocked: false });
        return;
      } else {
        s = {
          sound,
          released: false,
          volume,
          media: new Media(
            assetPath,
            () => {},
            () => {},
            (status) => {
              if (s.released) {
                return;
              }
              if (status === Media.MEDIA_STOPPED) {
                s.media.seekTo(1);
                s.media.play({ playAudioWhenScreenIsLocked: false });
              } else if (status === Media.MEDIA_STOPPED) {
                s.media.release();
                if (saveSoundEffect) {
                  soundsEffectPlayed.delete(sound);
                }
              }
            }
          ),
        };
        if (saveSoundEffect) {
          soundsEffectPlayed.set(sound, s);
        }
      }

      s.media.setVolume(volume);
      s.media.play({ playAudioWhenScreenIsLocked: false });

      return 1;
    },
    [soundsEffectActivatedFromParmas, platform]
  );

  const pauseSoundEffect = useCallback((sound: string) => {
    const s = soundsEffectPlayed.get(sound);

    if (s) {
      s.media.pause();
    }
  }, []);

  const releaseSoundEffect = useCallback((sound: string) => {
    const s = soundsEffectPlayed.get(sound);
    if (s) {
      soundsEffectPlayed.delete(sound);
      s.released = true;
      s.media.pause();
      s.media.release();
    }
  }, []);

  const releaseAllSoundEffect = useCallback((expect?: string | string[]) => {
    soundsEffectPlayed.forEach((s, key) => {
      if (
        (typeof expect === "string" && expect === key) ||
        (Array.isArray(expect) && expect.includes(key))
      ) {
        return;
      }
      s.released = true;
      s.media.pause();
      s.media.release();
    });
  }, []);

  /**  */

  useEffect(() => {
    if (!musicActivatedFromParams) {
      pauseAllMusic();
      releaseAllSoundEffect();
    } else {
      resumeAllMusic();
    }
  }, [musicActivatedFromParams]);

  useEffect(() => {
    const funcPause = () => {
      console.log("pause");
      pauseAllMusic();
      releaseAllSoundEffect();
    };
    const funcResume = () => {
      console.log("resume");
      resumeAllMusic();
    };
    let pauseListener: PluginListenerHandle | undefined;
    let resumeListener: PluginListenerHandle | undefined;
    // On monte les listeners
    App.addListener("pause", funcPause).then((value) => {
      pauseListener = value;
    });
    App.addListener("resume", funcResume).then((value) => {
      resumeListener = value;
    });

    return () => {
      pauseListener?.remove();
      resumeListener?.remove();
    };
  }, [musicActivatedFromParams]);

  useEffect(() => {
    musicsPlayed.forEach((sound, key) => {
      if (musicActivatedFromParams === 0) {
        return;
      }
      sound.media.setVolume(musicActivatedFromParams);
    });
  }, [musicActivatedFromParams]);

  return {
    loaded: true,
    playSoundEffect,
    playSoundEffectAtPercent,
    pauseSoundEffect,
    releaseSoundEffect,
    releaseAllSoundEffect,
    playMusic,
    pauseMusic,
    resumeMusic,
    releaseMusic,
    releaseAllMusic,
  };
};

export default useSound;
