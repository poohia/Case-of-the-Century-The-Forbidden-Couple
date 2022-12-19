import { useCallback, useEffect, useState } from "react";

import { useAssets } from "../../../hooks";
import { GameProviderHooksDefaultInterface } from "..";

type Sound = {
  fileName: string;
  audioHtmlElement: HTMLAudioElement;
};

let lastMusicPlayed: HTMLAudioElement | null = null;
export interface useSoundInterface extends GameProviderHooksDefaultInterface {
  playMusic: (fileName: string, volume: number, loop?: boolean) => void;
  pauseMusic: (fileName: string) => void;
  pauseAllMusics: () => void;
  playSound: (fileName: string, volume: number) => void;
}

const useSound = (soundActivatedFromParams: boolean): useSoundInterface => {
  const { getAssetSound } = useAssets();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [soundActivated, setSoundActivated] = useState<boolean>(
    soundActivatedFromParams
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [musics, setMusics] = useState<Sound[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sounds, setSounds] = useState<Sound[]>([]);

  const pauseAllMusics = useCallback(
    () =>
      new Promise(() => {
        setMusics((_musics) => {
          _musics.forEach((music) => {
            if (!music.audioHtmlElement.paused) {
              music.audioHtmlElement.pause();
            }
          });
          return _musics;
        });
      }),
    []
  );

  const playMusic = useCallback(
    (fileName: string, volume: number) =>
      new Promise(() => {
        setSoundActivated((_soundActivated) => {
          if (!_soundActivated) return _soundActivated;
          pauseAllMusics();
          setMusics((_musics) => {
            const musicFind = _musics.find(
              (music) => music.fileName === fileName
            );
            if (musicFind) {
              musicFind.audioHtmlElement
                .play()
                .then(() => (lastMusicPlayed = musicFind.audioHtmlElement));

              return _musics;
            }
            const music = new Audio();
            music.src = getAssetSound(fileName);
            music.volume = volume;
            music.loop = true;
            music.play().then(() => (lastMusicPlayed = music));
            return _musics.concat({ fileName, audioHtmlElement: music });
          });
          return _soundActivated;
        });
      }),
    [pauseAllMusics, getAssetSound]
  );

  const playSound = useCallback(
    (fileName: string, volume: number) =>
      new Promise(() => {
        setSoundActivated((_soundActivated) => {
          if (!_soundActivated) return _soundActivated;

          setSounds((_sounds) => {
            const soundFind = _sounds.find(
              (sound) => sound.fileName === fileName
            );
            if (soundFind) {
              soundFind.audioHtmlElement.currentTime = 0;
              soundFind.audioHtmlElement.play();
              return _sounds;
            }
            const sound = new Audio();
            sound.src = getAssetSound(fileName);
            sound.volume = volume;
            sound.load();
            sound.play();
            return _sounds.concat({ fileName, audioHtmlElement: sound });
          });
          return _soundActivated;
        });
      }),

    [getAssetSound]
  );

  const pauseMusic = useCallback(
    (fileName: string) =>
      new Promise(() => {
        setMusics((_musics) => {
          const musicFind = _musics.find(
            (music) => music.fileName === fileName
          );
          if (musicFind && musicFind.audioHtmlElement.paused) {
            musicFind.audioHtmlElement.pause();
          }
          return _musics;
        });
      }),
    []
  );

  useEffect(() => {
    setSoundActivated(soundActivatedFromParams);
    if (!soundActivatedFromParams) {
      pauseAllMusics();
    }
  }, [soundActivatedFromParams, pauseAllMusics]);

  useEffect(() => {
    document.addEventListener(
      "pause",
      () => {
        pauseAllMusics();
      },
      false
    );
    document.addEventListener(
      "resume",
      () => {
        if (lastMusicPlayed) {
          lastMusicPlayed.play();
        }
      },
      false
    );
  }, []);

  return {
    loaded: true,
    playMusic,
    pauseMusic,
    pauseAllMusics,
    playSound,
  };
};

export default useSound;
