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
  VisualNovelTextComponent,
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
    /** */
    isTypingComplete,
    forceInstant,
    handleTypingDone,
    handleForceInstant,
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
    if (!isTypingComplete) {
      handleForceInstant();
      handleTypingDone();
      return;
    }

    if (!showContinueArrow) {
      return;
    }

    if (i < texts.length - 1) {
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
          $nextManuelly={showContinueArrow || !isTypingComplete}
          onClick={(e) => {
            click(e, {
              callback: handleClickManually,
              playSound: true,
            });
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
              {showContinueArrow ? "true" : "false"}
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
            <VisualNovelTextComponent
              text={text}
              playSound={{ sound: "bleep020.mp3" }}
              paused={openParameters}
              instant={forceInstant}
              onDone={handleTypingDone}
            />

            {showContinueArrow && isTypingComplete && (
              <ContinueArrowComponent handleClick={handleClickManually} />
            )}
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
