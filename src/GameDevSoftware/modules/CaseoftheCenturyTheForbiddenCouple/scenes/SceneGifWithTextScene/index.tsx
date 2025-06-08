import { ThemeProvider } from "styled-components";
import { Textfit } from "react-textfit";
import { SceneComponentProps } from "../../../../../types";
import { Character, SceneGifWithTextProps } from "../../../../type";
import {
  SceneGifWithTextContainer,
  SceneGifWithTextTextContainer,
} from "./styles";
import {
  ImgComponent,
  PageComponent,
  TranslationComponent,
} from "../../../../../components";
import { globalTheme } from "../../theme";
import { useGameObjects, useScene } from "../../../../../hooks";
import { useGameProvider } from "../../../../../gameProvider";
import { useEffect, useMemo, useState } from "react";
import ButtonNextSceneComponent from "../../components/ButtonNextSceneComponent";
import ButtonMenuPauseSceneComponent from "../../components/ButtonMenuPauseSceneComponent";
import ModalParametersGameComponent from "../../modals/ModalParametersGameComponent";

export type ChapterTitleComponentProps = SceneComponentProps<
  {},
  SceneGifWithTextProps
>;

const SceneGifWithText: ChapterTitleComponentProps = (props) => {
  const {
    data: { backgroundImage, texts, character },
  } = props;

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

  const characterObject = useMemo(
    () => getGameObject<Character>(character),
    [character]
  );

  const [i, setI] = useState<number>(0);
  const [openParameters, setOpenParemeters] = useState<boolean>(false);

  const showBubble = useMemo(() => {
    return !!getEnvVar("SHOW_BUBBLE");
  }, [getEnvVar]);
  const text = useMemo(() => {
    return texts[i].content;
  }, [i]);
  const canNextScene = useMemo(() => i >= texts.length - 1, [i]);

  useEffect(() => {
    setTimeout(() => {
      if (i >= texts.length - 1) {
        // nextScene();
      } else {
        setI(i + 1);
      }
    }, 5000);
  }, [i]);

  return (
    <ThemeProvider theme={{ ...globalTheme }}>
      <PageComponent>
        <SceneGifWithTextContainer>
          <ButtonMenuPauseSceneComponent
            handleClick={() => {
              setOpenParemeters(true);
            }}
          />
          <ImgComponent src={backgroundImage} forceMaxSize={false} />
          <SceneGifWithTextTextContainer
            $showBuble={showBubble}
            $fontFamily={characterObject.fontFamily}
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
          </SceneGifWithTextTextContainer>
          {canNextScene && (
            <ButtonNextSceneComponent
              handleClick={() => {
                nextScene();
              }}
            />
          )}
          <ModalParametersGameComponent
            open={openParameters}
            onClose={() => {
              setOpenParemeters(false);
            }}
          />
        </SceneGifWithTextContainer>
      </PageComponent>
    </ThemeProvider>
  );
};

export default SceneGifWithText;
