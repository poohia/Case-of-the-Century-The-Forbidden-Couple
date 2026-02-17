import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";

import { SceneComponentProps } from "../../../../../types";
import {
  AnimationImgsComponent,
  ImgComponent,
  TranslationComponent,
} from "../../../../../components";
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
      sceneDescription,
      sceneDescription2,
      backgroundImages,
      animationBackgroundImage,
      soundOpenDoor,
      objectfsText,
    },
  } = props;

  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [gifLoaded, setGifLoaded] = useState<boolean>(false);

  const { playSoundEffect, getAssetImg, translateText } = useGameProvider();
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

  useEffect(() => {
    startTimeoutStep1();
  }, []);

  useEffect(() => {
    const gif = new Image();
    const onGifLoaded = () => {
      setGifLoaded(true);
    };

    gif.src = getAssetImg(animationBackgroundImage);

    if (gif.complete) {
      onGifLoaded();
      return;
    }

    gif.addEventListener("load", onGifLoaded);
    return () => {
      gif.removeEventListener("load", onGifLoaded);
    };
  }, [animationBackgroundImage, getAssetImg]);

  return (
    <ThemeProvider theme={{ ...globalTheme }}>
      <SceneComicsNarratorContainer
        $nextManuelly={step === 1}
        className="animate__animated animate__fadeIn"
        onClick={(e) => {
          if (step !== 1) {
            return;
          }
          click(e, {
            playSound: false,
            callback: () => {
              startTimeoutNextScene();
              playSoundEffect({ sound: soundOpenDoor });
              setStep(2);
            },
          });
        }}
        role={step === 1 ? "button" : undefined}
        tabIndex={step === 1 ? 0 : undefined}
      >
        <section
          aria-label={
            step <= 1
              ? translateText(sceneDescription)
              : translateText(sceneDescription2)
          }
        >
          <SectionObjectifs
            className="animate__animated animate__fadeInLeft animate__delay-2s animate__faster"
            objectifsActive={step > 1}
            aria-hidden="true"
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
          {step > 1 && gifLoaded ? (
            <ImgComponent
              className="image-background"
              src={animationBackgroundImage}
              forceMaxSize={false}
            />
          ) : (
            <AnimationImgsComponent
              imgs={backgroundImages.map((bi) => bi.image)}
              forceMaxSize={false}
              ariaHidden
              imgClassName="image-background"
              imgPerSeconde={1.5}
            />
          )}
        </section>
      </SceneComicsNarratorContainer>
    </ThemeProvider>
  );
};

export default ComicsArrivedCommisseriat;
