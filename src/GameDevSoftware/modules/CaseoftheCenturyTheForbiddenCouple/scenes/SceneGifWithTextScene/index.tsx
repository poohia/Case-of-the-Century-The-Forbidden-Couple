import { ThemeProvider } from "styled-components";
import { Textfit } from "react-textfit";
import { SceneComponentProps } from "../../../../../types";
import { Character, SceneGifWithTextProps } from "../../../../game-types";
import {
  SceneGifWithTextContainer,
  SceneGifWithTextContainerCadreContainer,
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
import { useEffect, useMemo } from "react";
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
    canNextScene,
    autoNextScene,
    showBubble,
    setOpenParemeters,
    nextAction,
    handleParamsClosed,
    pause,
  } = useMultipleTextsOneByOneOnScene(texts, nextScene);

  const { oneTap } = useGameProvider();
  const { getGameObject } = useGameObjects();

  const characterObject = useMemo(
    () => getGameObject<Character>(character),
    [character]
  );

  return (
    <ThemeProvider theme={{ ...globalTheme }}>
      <PageComponent>
        <SceneGifWithTextContainer
          $nextManuelly={i < texts.length - 1 && showContinueArrow}
          onClick={() => {
            if (i < texts.length - 1 && showContinueArrow) {
              oneTap();
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
                <ContinueArrowComponent
                  handleClick={() => {
                    if (i < texts.length - 1 && showContinueArrow) {
                      nextAction();
                    }
                  }}
                />
              )}
            </Textfit>
          </SceneGifWithTextTextContainer>
          {canNextScene && !autoNextScene && (
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
            handleParamsClosed();
          }}
        />
      </PageComponent>
    </ThemeProvider>
  );
};

export default SceneGifWithText;
