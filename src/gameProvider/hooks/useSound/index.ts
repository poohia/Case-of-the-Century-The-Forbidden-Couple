import { useCallback, useEffect, useMemo, useState } from "react";
import useNativeAudio from "@awesome-cordova-library/nativeaudio/lib/react";
import useDevice from "@awesome-cordova-library/device/lib/react";
import { useAssets } from "../../../hooks";
import { GameProviderHooksDefaultInterface } from "..";

type Sound = {
  sound: string;
  assetPath: string;
  volume: number;
  voices: number;
  delay: number;
  htmlAudioElement?: HTMLAudioElement;
};

export interface useSoundInterface extends GameProviderHooksDefaultInterface {
  playSoundWithPreload: (
    sound: string,
    volume: number,
    voices: number,
    delay: number,
    loop?: boolean
  ) => void;
  preloadSound: (
    sound: string,
    volume: number,
    voices: number,
    delay: number
  ) => Promise<Sound>;
  playSound: (sound: string, loop?: boolean) => void;
  stopSound: (sound: string) => void;
  stopAllSound: () => void;
}

const useSound = (soundActivatedFromParams: boolean): useSoundInterface => {
  const { preloadComplex, play, playWeb, loop, stop, stopWeb } =
    useNativeAudio();
  const { getAssetSound } = useAssets();
  const { getPlatform } = useDevice();

  const [soundsLoaded, setSoundsLoaded] = useState<Sound[]>([]);
  const [soundsPlaying, setSoundsPlaying] = useState<string[]>([]);
  const platform = useMemo(() => getPlatform(), []);

  const [soundActivated, setSoundActivated] = useState<boolean>(
    soundActivatedFromParams
  );

  const preloadSound = useCallback(
    (
      sound: string,
      volume: number,
      voices: number,
      delay: number
    ): Promise<Sound> => {
      const soundFind = soundsLoaded.find((s) => s.sound === sound);
      if (soundFind) return Promise.resolve(soundFind);
      return new Promise((resolve, reject) => {
        if (soundFind) {
          resolve(soundFind);
          return;
        }
        const assetPath = getAssetSound(sound);
        const s = { sound, assetPath, volume, voices, delay };
        if (platform === "browser") {
          setSoundsLoaded((_sounds) => _sounds.concat(s));
          resolve(s);
        } else {
          preloadComplex(sound, assetPath, volume, voices, delay)
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
    (sound: string, loopSound?: boolean) => {
      setSoundActivated((_soundActivated) => {
        if (!_soundActivated) return _soundActivated;
        setSoundsPlaying((_soundsPlaygins) => {
          const soundPlayingFind = _soundsPlaygins.find((s) => s === sound);
          if (soundPlayingFind) return _soundsPlaygins;
          setSoundsLoaded((_sounds) => {
            const soundFind = _sounds.find((s) => s.sound === sound);
            if (!soundFind) return _sounds;
            if (platform === "browser") {
              const htmlAudioElement = playWeb(
                soundFind.assetPath,
                loopSound,
                soundFind.volume
              );
              htmlAudioElement.addEventListener(
                "ended",
                () => {
                  setSoundsPlaying((_s) =>
                    _s.filter((s) => s !== soundFind.sound)
                  );
                },
                false
              );
              const _soundFind = _sounds.find((s) => s.sound === sound);
              if (_soundFind) {
                _soundFind.htmlAudioElement = htmlAudioElement;
              }
              return _sounds;
            } else if (loopSound) {
              loop(soundFind.sound);
            } else {
              play(soundFind.sound, () => {
                setSoundsPlaying((_s) =>
                  _s.filter((s) => s !== soundFind.sound)
                );
              });
            }

            return _sounds;
          });
          return _soundsPlaygins.concat(sound);
        });
        return _soundActivated;
      });
    },
    [soundActivated]
  );

  const stopSound = useCallback(
    (sound: string): Promise<void> => {
      const soundFind = soundsLoaded.find((s) => s.sound === sound);
      const soundPlayingFind = soundsPlaying.find((s) => s === sound);
      if (!soundFind || !soundPlayingFind) return Promise.resolve();
      if (platform === "browser") {
        soundFind.htmlAudioElement && stopWeb(soundFind.htmlAudioElement);
        setSoundsPlaying((_sounds) => _sounds.filter((s) => s !== sound));

        return Promise.resolve();
      } else {
        return new Promise((resolve, reject) =>
          stop(soundFind.sound)
            .then(() => {
              setSoundsPlaying((_sounds) => _sounds.filter((s) => s !== sound));
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

  const playSoundWithPreload = useCallback(
    (
      sound: string,
      volume: number,
      voices: number,
      delay: number,
      loop?: boolean
    ) => {
      if (!!soundsLoaded.find((s) => s.sound === sound)) {
        playSound(sound, true);
      } else {
        preloadSound(sound, volume, voices, delay).then(() =>
          playSound(sound, loop)
        );
      }
    },
    [soundsLoaded, playSound, preloadSound]
  );

  useEffect(() => {
    setSoundActivated(soundActivatedFromParams);
    if (!soundActivatedFromParams) {
      stopAllSound();
    }
  }, [soundActivatedFromParams]);

  console.log(
    "sounds charged",
    soundsLoaded.map((s) => s.sound).join(","),
    "sounds playgins",
    soundsPlaying.join(",")
  );

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
