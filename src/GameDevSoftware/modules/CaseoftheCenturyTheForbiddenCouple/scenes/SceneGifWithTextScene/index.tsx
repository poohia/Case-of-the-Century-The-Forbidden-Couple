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
import { useGameObjects, useScene, useTimeout } from "../../../../../hooks";
import { useGameProvider } from "../../../../../gameProvider";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  const {
    parameters: { textScrolling },
    getEnvVar,
    getValueFromConstant,
  } = useGameProvider();
  const { getGameObject } = useGameObjects();

  const characterObject = useMemo(
    () => getGameObject<Character>(character),
    [character]
  );

  const [i, setI] = useState<number>(0);
  const [openParameters, setOpenParemeters] = useState<boolean>(false);
  const [low, normal, fast] = getValueFromConstant<number[]>("delayscrolltext");
  const vitessScrollText = useMemo(() => {
    switch (textScrolling) {
      case "1":
        return low;
      case "3":
        return fast;
      case "2":
      default:
        return normal;
    }
  }, [textScrolling]);
  console.log("🚀 ~ low, normal, speed:", low, normal, fast);

  const { start, restart, pause, resume, clear } = useTimeout(() => {
    nextAction();
  }, vitessScrollText);

  const showBubble = useMemo(() => {
    return !!getEnvVar("SHOW_BUBBLE");
  }, [getEnvVar]);

  const text = useMemo(() => {
    return texts[i].content;
  }, [i]);
  const canNextScene = useMemo(() => i >= texts.length - 1, [i]);

  const nextAction = useCallback(() => {
    clear();
    setI((_i) => {
      console.log("nextAction", textScrolling, texts);
      if (_i >= texts.length - 1) {
        return _i;
      }

      if (textScrolling !== undefined && textScrolling !== "0") {
        setTimeout(() => {
          restart();
        });
      }
      return _i + 1;
    });
  }, [textScrolling, texts]);

  // // use Effect au démarrage
  useEffect(() => {
    if (textScrolling === "undefined" || textScrolling === "0") {
      return;
    }
    start();
  }, []);

  return (
    <ThemeProvider theme={{ ...globalTheme }}>
      <PageComponent>
        <SceneGifWithTextContainer
          $nextManuelly={i < texts.length - 1}
          onClick={() => {
            if (i < texts.length - 1) {
              console.log("i'm here 2");
              // setCanNext(false);
              // clear();
              nextAction();
            }
          }}
        >
          <ButtonMenuPauseSceneComponent
            handleClick={() => {
              pause();
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
        </SceneGifWithTextContainer>
        <ModalParametersGameComponent
          open={openParameters}
          onClose={() => {
            setOpenParemeters(false);
            if (textScrolling === "undefined" || textScrolling === "0") {
              clear();
            } else {
              resume();
            }
          }}
        />
      </PageComponent>
    </ThemeProvider>
  );
};

export default SceneGifWithText;
