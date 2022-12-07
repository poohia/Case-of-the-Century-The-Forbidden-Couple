import { useCallback, useEffect, useMemo, useState } from "react";
import useNativeAudio from "@awesome-cordova-library/nativeaudio/lib/react";
import useDevice from "@awesome-cordova-library/device/lib/react";
import { useAssets } from "../../../hooks";
import { GameProviderHooksDefaultInterface } from "..";

type Sound = {
  id: string;
  assetPath: string;
  volume: number;
  voices: number;
  delay: number;
  htmlAudioElement?: HTMLAudioElement;
};

export interface useSoundInterface extends GameProviderHooksDefaultInterface {
  soundsLoaded: Sound[];
  preloadSound: (
    id: string,
    sound: string,
    volume: number,
    voices: number,
    delay: number
  ) => Promise<Sound>;
  playSound: (id: string, loop?: boolean) => void;
  stopSound: (id: string) => void;
  stopAllSound: () => void;
}

const useSound = (soundActivated: boolean): useSoundInterface => {
  const { preloadComplex, play, playWeb, loop, stop, stopWeb } =
    useNativeAudio();
  const { getAssetSound } = useAssets();
  const { getPlatform } = useDevice();

  const [soundsLoaded, setSoundsLoaded] = useState<Sound[]>([]);
  const [soundsPlaying, setSoundsPlaying] = useState<string[]>([]);
  const platform = useMemo(() => getPlatform(), []);
  const preloadSound = useCallback(
    (
      id: string,
      sound: string,
      volume: number,
      voices: number,
      delay: number
    ): Promise<Sound> => {
      const soundFind = soundsLoaded.find((s) => s.id === id);
      if (soundFind) return Promise.resolve(soundFind);
      return new Promise((resolve, reject) => {
        if (soundFind) {
          resolve(soundFind);
          return;
        }
        const assetPath = getAssetSound(sound);
        const s = { id, assetPath, volume, voices, delay };
        if (platform === "browser") {
          setSoundsLoaded((_sounds) => _sounds.concat(s));
          resolve(s);
        } else {
          preloadComplex(id, assetPath, volume, voices, delay)
            .then(() => {
              setSoundsLoaded((_sounds) => _sounds.concat(s));
              resolve(s);
            })
            .catch(reject);
        }
      });
    },
    []
  );

  const playSound = useCallback(
    (id: string, loopSound?: boolean) => {
      if (!soundActivated) return;
      setSoundsPlaying((_soundsPlaygins) => {
        const soundPlayingFind = _soundsPlaygins.find((s) => s === id);
        if (soundPlayingFind) return _soundsPlaygins;
        setSoundsLoaded((_sounds) => {
          const soundFind = _sounds.find((s) => s.id === id);
          if (!soundFind) return _sounds;
          if (platform === "browser") {
            const htmlAudioElement = playWeb(
              soundFind.assetPath,
              loopSound,
              soundFind.volume
            );
            const _soundFind = _sounds.find((s) => s.id === id);
            if (_soundFind) {
              _soundFind.htmlAudioElement = htmlAudioElement;
            }
            return _sounds;
          } else if (loopSound) {
            loop(soundFind.id);
          } else {
            play(soundFind.id);
          }

          return _sounds;
        });
        return _soundsPlaygins.concat(id);
      });
    },
    [soundActivated]
  );

  const stopSound = useCallback(
    (id: string): Promise<void> => {
      const soundFind = soundsLoaded.find((s) => s.id === id);
      const soundPlayingFind = soundsPlaying.find((s) => s === id);
      if (!soundFind || !soundPlayingFind) return Promise.resolve();
      if (platform === "browser") {
        soundFind.htmlAudioElement && stopWeb(soundFind.htmlAudioElement);
        setSoundsPlaying((_sounds) => _sounds.filter((s) => s !== id));

        return Promise.resolve();
      } else {
        return new Promise((resolve, reject) =>
          stop(soundFind.id)
            .then(() => {
              setSoundsPlaying((_sounds) => _sounds.filter((s) => s !== id));
              resolve();
            })
            .catch(reject)
        );
      }
    },
    [soundsLoaded, soundsPlaying]
  );

  const stopAllSound = useCallback(() => {
    Promise.all(soundsPlaying.map((s) => stopSound(s))).then(() =>
      setSoundsPlaying([])
    );
  }, [soundsPlaying, stopSound]);

  console.log(
    "sounds charged",
    soundsLoaded.map((s) => s.id).join(","),
    "sounds playgins",
    soundsPlaying.join(",")
  );

  useEffect(() => {
    if (!soundActivated) {
      stopAllSound();
    }
  }, [soundActivated]);

  return {
    loaded: true,
    soundsLoaded,
    preloadSound,
    playSound,
    stopSound,
    stopAllSound,
  };
};

export default useSound;
