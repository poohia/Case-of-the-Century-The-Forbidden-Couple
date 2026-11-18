import { useEffect, useState } from "react";

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
import {
  ButtonDoor,
  SceneComicsNarratorContainer,
  SectionObjectifs,
} from "./styles";
import { useGameProvider } from "../../../../../gameProvider";

const KNOCK_DELAY = 1800;

const ComicsArrivedCommisseriat: SceneComponentProps<
  {},
  ComicsArrivedCommisseriatProps & { knockSound?: string }
> = (props) => {
  const {
    data: {
      sceneDescription,
      sceneDescription2,
      backgroundImages,
      animationBackgroundImage,
      soundOpenDoor,
      knockSound,
      objectfsText,
    },
  } = props;

  const [step, setStep] = useState<0 | 1 | 2>(0);
  // Entre le coup frappé à la porte et son ouverture
  const [knocking, setKnocking] = useState<boolean>(false);

  const { playSoundEffect, translateText } = useGameProvider();
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

  const { nextScene } = useScene(props.data);

  const openDoor = () => {
    setKnocking(false);
    startTimeoutNextScene();
    playSoundEffect({ sound: soundOpenDoor });
    setStep(2);
  };
  const { start: startTimeoutOpenDoor } = useTimeout(openDoor, KNOCK_DELAY);

  useEffect(() => {
    startTimeoutStep1();
  }, []);

  return (
    <SceneComicsNarratorContainer
      $nextManuelly={step === 1 && !knocking}
      className="animate__animated animate__fadeIn"
      onClick={(e) => {
        if (step !== 1 || knocking) {
          return;
        }
        click(e, {
          dontPlaySound: true,
          callback: () => {
            if (!knockSound) {
              openDoor();
              return;
            }
            setKnocking(true);
            playSoundEffect({ sound: knockSound });
            startTimeoutOpenDoor();
          },
        });
      }}
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
          <ul id="objectifs">
            {objectfsText.map((objectif, i) => (
              <li key={`arrived-scene-${i}`}>
                <TranslationComponent id={objectif.content} />
              </li>
            ))}
          </ul>
        </SectionObjectifs>
        {step > 1 ? (
          <ImgComponent
            className="image-background"
            src={animationBackgroundImage}
            forceMaxSize={false}
            aria-hidden="true"
          />
        ) : (
          <>
            <AnimationImgsComponent
              imgs={backgroundImages.map((bi) => bi.image)}
              forceMaxSize={false}
              ariaHidden
              imgClassName="image-background"
              imgPerSeconde={1.5}
            />
            <ButtonDoor aria-labelledby="objectifs"></ButtonDoor>
          </>
        )}
      </section>
    </SceneComicsNarratorContainer>
  );
};

export default ComicsArrivedCommisseriat;
