import { ThemeProvider } from "styled-components";
import { Textfit } from "react-textfit";
import { SceneComponentProps } from "../../../../../types";
import { Character, SceneGifWithTextProps } from "../../../../game-types";
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
import {
  useButtonHandleClick,
  useGameObjects,
  useScene,
} from "../../../../../hooks";
import { useGameProvider } from "../../../../../gameProvider";
import { useCallback, useMemo } from "react";
import ButtonNextSceneComponent from "../../components/ButtonNextSceneComponent";
import ButtonMenuPauseSceneComponent from "../../components/ButtonMenuPauseSceneComponent";
import ModalParametersGameComponent from "../../modals/ModalParametersGameComponent";
import ContinueArrowComponent from "../../components/ContinueArrowComponent";
import useMultipleTextsOneByOneOnScene from "../../hooks/useMultipleTextsOneByOneOnScene";

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
    i,
    text,
    openParameters,
    showContinueArrow,
    showBubble,
    nextAction,
    handleParamsOpened,
    handleParamsClosed,
  } = useMultipleTextsOneByOneOnScene(texts, {
    nextScene,
  });

  const { getGameObject } = useGameObjects();
  const click = useButtonHandleClick();

  const characterObject = useMemo(
    () => getGameObject<Character>(character),
    [character]
  );

  const handleClickManually = useCallback(() => {
    if (i < texts.length - 1) {
      nextAction();
    } else {
      nextScene();
    }
  }, [i, texts]);

  return (
    <ThemeProvider theme={{ ...globalTheme }}>
      <PageComponent>
        <SceneGifWithTextContainer
          $nextManuelly={showContinueArrow}
          onClick={(e) => {
            if (showContinueArrow) {
              click(e, {
                callback: handleClickManually,
                playSound: true,
              });
            }
          }}
        >
          <ButtonMenuPauseSceneComponent handleClick={handleParamsOpened} />
          <ImgComponent
            src="CADRE 2.png"
            forceMaxSize={false}
            className="image-box-buble-gif-scene"
          />
          <ImgComponent
            className="image-background"
            src={backgroundImage}
            forceMaxSize={false}
          />
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
              {showContinueArrow && (
                <ContinueArrowComponent handleClick={handleClickManually} />
              )}
            </Textfit>
          </SceneGifWithTextTextContainer>
        </SceneGifWithTextContainer>
        <ModalParametersGameComponent
          open={openParameters}
          onClose={() => {
            handleParamsClosed();
          }}
        />
      </PageComponent>
    </ThemeProvider>
  );
};

export default SceneGifWithText;
