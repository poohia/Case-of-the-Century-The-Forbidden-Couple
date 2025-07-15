import { ThemeProvider } from "styled-components";
import { Textfit } from "react-textfit";
import { SceneComponentProps } from "../../../../../types";
import { Character, SceneGifWithTextProps } from "../../../../game-types";
import {
  SceneGifWithTextContainer,
  SceneGifWithTextContainerNameCharacter,
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
import { useCallback, useMemo } from "react";
import ButtonMenuPauseSceneComponent from "../../components/ButtonMenuPauseSceneComponent";
import ModalParametersGameComponent from "../../modals/ModalParametersGameComponent";
import ContinueArrowComponent from "../../components/ContinueArrowComponent";
import useMultipleTextsOneByOneOnScene from "../../hooks/useMultipleTextsOneByOneOnScene";
import PointsGameComponent from "../../components/PointsGameComponent";
import { useGameProvider } from "../../../../../gameProvider";

export type ChapterTitleComponentProps = SceneComponentProps<
  {},
  SceneGifWithTextProps
>;

const SceneGifWithText: ChapterTitleComponentProps = (props) => {
  const {
    data: { _id, backgroundImage, texts, character },
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
    keyText,
    addPointsValue,
    openParameters,
    showContinueArrow,
    showBubble,
    points,
    nextAction,
    handleParamsOpened,
    handleParamsClosed,
    addPoints,
  } = useMultipleTextsOneByOneOnScene(_id, texts, {
    nextScene,
  });

  const { translateText } = useGameProvider();
  const { getGameObject } = useGameObjects();
  const click = useButtonHandleClick();

  const characterObject = useMemo(
    () => getGameObject<Character>(character),
    [character]
  );

  const handleClickManually = useCallback(() => {
    if (i < texts.length - 1) {
      console.log("add points", addPointsValue);
      addPoints(keyText, addPointsValue);
      nextAction();
    } else {
      addPoints(keyText, addPointsValue);
      setTimeout(() => nextScene(), 1500);
    }
  }, [i, texts, keyText, addPointsValue, nextAction, nextScene]);

  return (
    <ThemeProvider theme={{ ...globalTheme }}>
      <PageComponent maxSize={{ width: 1920, height: 1080 }}>
        <PointsGameComponent points={points} />
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
            aria-hidden="true"
          />
          <ImgComponent
            className="image-background"
            src={backgroundImage}
            forceMaxSize={false}
          />
          <SceneGifWithTextContainerNameCharacter aria-hidden="true">
            <span>
              <strong>{characterObject._title}</strong>
            </span>
          </SceneGifWithTextContainerNameCharacter>
          <SceneGifWithTextTextContainer
            $showBuble={showBubble}
            $fontFamily={characterObject.fontFamily}
            aria-label={translateText("aria_label_bubble", [
              {
                key: "character",
                value: characterObject._title,
              },
            ])}
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
