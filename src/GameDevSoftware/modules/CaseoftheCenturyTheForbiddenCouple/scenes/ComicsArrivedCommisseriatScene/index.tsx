import { useEffect } from "react";

import { SceneComponentProps } from "../../../../../types";
import { ImgComponent } from "../../../../../components";
import { useScene, useTimeout } from "../../../../../hooks";
import { ComicsNarratorProps } from "../../../../game-types";
import { SceneComicsNarratorContainer } from "./styles";
import { useGameProvider } from "../../../../../gameProvider";

const ComicsArrivedCommisseriat: SceneComponentProps<
  {},
  ComicsNarratorProps
> = (props) => {
  const {
    data: { backgroundImage, soundOpenDoor },
  } = props;

  const { playSoundEffect } = useGameProvider();
  const { start: startTimeoutSound } = useTimeout(() => {
    playSoundEffect({ sound: soundOpenDoor });
  }, 1000);
  const { start: startTimeoutNextScene } = useTimeout(
    () => {
      nextScene();
    },
    1000 + 3000 + 500
  );

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
    startTimeoutSound();
    startTimeoutNextScene();
  }, []);

  return (
    <>
      <SceneComicsNarratorContainer
        $nextManuelly={false}
        className="animate__animated animate__fadeIn"
      >
        <ImgComponent
          className="image-background"
          src={backgroundImage}
          forceMaxSize={false}
        />
      </SceneComicsNarratorContainer>
    </>
  );
};

export default ComicsArrivedCommisseriat;
