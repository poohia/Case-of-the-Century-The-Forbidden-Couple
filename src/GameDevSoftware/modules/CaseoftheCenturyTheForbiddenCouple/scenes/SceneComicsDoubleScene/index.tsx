import { useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "styled-components";
import { Textfit } from "react-textfit";

import { SceneComponentProps } from "../../../../../types";
import { globalTheme } from "../../theme";
import {
  ImgComponent,
  PageComponent,
  TranslationComponent,
} from "../../../../../components";
import {
  SceneGifWithTextContainer,
  SceneGifWithTextTextContainer,
} from "../SceneGifWithTextScene/styles";
import { useGameObjects, useScene } from "../../../../../hooks";
import { useGameProvider } from "../../../../../gameProvider";
import { Character } from "../../../../type";
import { SceneComicsDoubleTextTextContainer } from "./styles";
import ButtonNextSceneComponent from "../../components/ButtonNextSceneComponent";
import ButtonMenuPauseSceneComponent from "../../components/ButtonMenuPauseSceneComponent";

const SceneComicsDouble: SceneComponentProps<{}, any> = (props) => {
  const {
    data: { image, texts, boxDialog },
  } = props;
  console.log("🚀 ~ props:", props);

  const { nextScene } = useScene(props.data, {
    musics: [
      {
        sound: "main_music.mp3",
        volume: 1,
      },
    ],
  });
  const { getEnvVar } = useGameProvider();
  const { getGameObject } = useGameObjects();

  const [i, setI] = useState<number>(0);

  const showBubble = useMemo(() => {
    return !!getEnvVar("SHOW_BUBBLE");
  }, [getEnvVar]);

  const text = useMemo(() => {
    return texts[i].content;
  }, [i]);
  const characterObject = useMemo(() => {
    return getGameObject<Character>(texts[i].character);
  }, [i]);
  const canNextScene = useMemo(() => i >= texts.length - 1, [i]);

  useEffect(() => {
    setI(0);
  }, [props]);

  useEffect(() => {
    setTimeout(() => {
      if (i >= texts.length - 1) {
        // nextScene();
        return;
      }
      setI(i + 1);
    }, 5000);
  }, [i]);

  return (
    <ThemeProvider theme={{ ...globalTheme }}>
      <PageComponent>
        <SceneGifWithTextContainer>
          <ButtonMenuPauseSceneComponent handleClick={() => {}} />
          <ImgComponent src={image} forceMaxSize={false} />
          <SceneComicsDoubleTextTextContainer
            $showBuble={showBubble}
            $fontFamily={characterObject.fontFamily}
            $boxDialog={boxDialog}
          >
            <Textfit
              mode="multi"
              max={34}
              min={8}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span>
                <strong>{characterObject._title}:</strong>{" "}
              </span>
              <TranslationComponent id={text} />
            </Textfit>
          </SceneComicsDoubleTextTextContainer>
          {canNextScene && (
            <ButtonNextSceneComponent
              handleClick={() => {
                nextScene();
              }}
            />
          )}
        </SceneGifWithTextContainer>
      </PageComponent>
    </ThemeProvider>
  );
};

export default SceneComicsDouble;
