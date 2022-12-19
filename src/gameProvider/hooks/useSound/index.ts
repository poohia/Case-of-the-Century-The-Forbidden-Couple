/// <reference types="cordova-plugin-media" />
import { useCallback, useEffect, useState } from "react";
import { useAssets } from "../../../hooks";
import { GameProviderHooksDefaultInterface } from "..";

type Sound = {
  sound: string;
  volume: number;
  media: Media;
};

export interface useSoundInterface extends GameProviderHooksDefaultInterface {
  playSoundWithPreload: (
    sound: string,
    volume: number,
    loop?: boolean,
    fadeDuration?: number
  ) => void;
  preloadSound: (
    sound: string,
    volume: number,
    loop?: boolean
  ) => Promise<Sound | null>;
  playSound: (sound: string, fadeDuration?: number) => Promise<Sound | null>;
  stopSound: (sound: string, fadeDuration?: number) => Promise<Sound | null>;
  stopAllSound: (fadeDuration?: number) => void;
}

const useSound = (soundActivatedFromParams: boolean): useSoundInterface => {
  const { getAssetSound } = useAssets();

  const [soundsLoaded, setSoundsLoaded] = useState<Sound[]>([]);
  const [soundsPlaying, setSoundsPlaying] = useState<string[]>([]);

  const [soundActivated, setSoundActivated] = useState<boolean>(
    soundActivatedFromParams
  );

  const preloadSound = useCallback(
    (sound: string, volume: number, loop: boolean = false): Promise<Sound> =>
      new Promise((resolve, reject) => {
        setSoundActivated((_soundActivated) => {
          if (!_soundActivated) {
            reject();
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
                  function (status) {
                    if (status === Media.MEDIA_STOPPED && loop) {
                      // @ts-ignore
                      this.seekTo(0);
                      // @ts-ignore
                      this.play();
                    } else if (status === Media.MEDIA_STOPPED) {
                      setSoundsPlaying((_s) => _s.filter((s) => s !== sound));
                    }
                  }
                ),
              };
              _sounds.push(s);
              resolve(s);
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
    (sound: string, fadeDuration?: number): Promise<Sound | null> => {
      const soundFind = soundsLoaded.find((s) => s.sound === sound);
      const soundPlayingFind = soundsPlaying.find((s) => s === sound);
      if (!soundFind || !soundPlayingFind) return Promise.resolve(null);
      fadeOut(soundFind, fadeDuration);

      return Promise.resolve(soundFind);
    },
    [soundsLoaded, soundsPlaying]
  );

  const stopAllSound = useCallback(
    (fadeDuration?: number) => {
      Promise.all(soundsPlaying.map((s) => stopSound(s, fadeDuration))).then(
        () => setSoundsPlaying([])
      );
    },
    [soundsPlaying, stopSound]
  );

  const playSoundWithPreload = useCallback(
    (sound: string, volume: number, loop?: boolean, fadeDuration?: number) => {
      if (!!soundsLoaded.find((s) => s.sound === sound)) {
        return playSound(sound, fadeDuration);
      } else {
        return new Promise((resolve, reject) =>
          preloadSound(sound, volume, loop).finally(() =>
            playSound(sound, fadeDuration).then(resolve).catch(reject)
          )
        );
      }
    },
    [soundsLoaded, playSound, preloadSound]
  );

  const fadeIn = useCallback((sound: Sound, duration: number = 2000) => {
    let volume = 0;
    sound.media.setVolume(volume);
    sound.media.play();
    const timeOut = setInterval(() => {
      if (volume >= sound.volume) {
        sound.media.setVolume(sound.volume);
        clearInterval(timeOut);
      } else {
        sound.media.setVolume(volume);
        volume += 0.1;
      }
    }, duration);
  }, []);

  const fadeOut = useCallback((sound: Sound, duration: number = 50) => {
    let volume = sound.volume;
    sound.media.setVolume(volume);
    const timeOut = setInterval(() => {
      if (volume <= 0) {
        sound.media.pause();
        clearInterval(timeOut);
      } else {
        sound.media.setVolume(volume);
        volume -= 0.1;
      }
    }, duration);
  }, []);

  useEffect(() => {
    setSoundActivated(soundActivatedFromParams);
    if (!soundActivatedFromParams) {
      stopAllSound();
    }
  }, [soundActivatedFromParams]);

  return {
    loaded: true,
    playSoundWithPreload,
    preloadSound,
    playSound,
    stopSound,
    stopAllSound,
  };
};

export default useSound;
