import { useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "styled-components";

import { SceneComponentProps } from "../../../../../types";
import { ImgComponent, TranslationComponent } from "../../../../../components";
import {
  useButtonHandleClick,
  useScene,
  useTimeout,
} from "../../../../../hooks";
import { ComicsArrivedCommisseriatProps } from "../../../../game-types";
import { SceneComicsNarratorContainer, SectionObjectifs } from "./styles";
import { useGameProvider } from "../../../../../gameProvider";
import { globalTheme } from "../../theme";

import "animate.css";

const ComicsArrivedCommisseriat: SceneComponentProps<
  {},
  ComicsArrivedCommisseriatProps
> = (props) => {
  const {
    data: {
      backgroundImage,
      animationBackgroundImage,
      soundOpenDoor,
      objectfsText,
    },
  } = props;

  const [step, setStep] = useState<0 | 1 | 2>(0);

  const { playSoundEffect } = useGameProvider();
  const click = useButtonHandleClick();

  const { start: startTimeoutNextScene } = useTimeout(
    () => {
      nextScene();
    },
    1000 + 3000 + 500
  );
  const { start: startTimeoutStep1 } = useTimeout(() => {
    setStep(1);
  }, 2000 + 500);

  const { nextScene } = useScene(props.data, {
    musics: [
      {
        sound: "main_music.mp3",
        volume: 0.3,
      },
      {
        sound: "ambiance_city.mp3",
        volume: 0.7,
        loop: true,
        fadeDuration: 0,
      },
    ],
  });

  const finalImage = useMemo(() => {
    if (step === 2) {
      return animationBackgroundImage;
    }
    return backgroundImage;
  }, [step]);

  useEffect(() => {
    startTimeoutStep1();
  }, []);

  return (
    <ThemeProvider theme={{ ...globalTheme }}>
      <SceneComicsNarratorContainer
        $nextManuelly={step === 1}
        className="animate__animated animate__fadeIn"
        onClick={(e) => {
          click(e, {
            playSound: false,
            callback: () => {
              startTimeoutNextScene();
              playSoundEffect({ sound: soundOpenDoor });
              setStep(2);
            },
          });
        }}
      >
        <SectionObjectifs
          className="animate__animated animate__fadeInLeft animate__delay-2s animate__faster"
          objectifsActive={step > 1}
        >
          <h2>
            <TranslationComponent id="message_1770998274384" />
          </h2>
          <ul>
            {objectfsText.map((objectif, i) => (
              <li key={`arrived-scene-${i}`}>
                <TranslationComponent id={objectif.content} />
              </li>
            ))}
          </ul>
        </SectionObjectifs>
        <ImgComponent
          className="image-background"
          src={finalImage}
          forceMaxSize={false}
        />
      </SceneComicsNarratorContainer>
    </ThemeProvider>
  );
};

export default ComicsArrivedCommisseriat;
