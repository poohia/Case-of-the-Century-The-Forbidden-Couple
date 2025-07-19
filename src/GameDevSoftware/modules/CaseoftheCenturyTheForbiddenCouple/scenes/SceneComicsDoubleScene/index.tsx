import { useCallback, useMemo } from "react";
import { ThemeProvider } from "styled-components";
import { Textfit } from "react-textfit";

import { SceneComponentProps } from "../../../../../types";
import { globalTheme } from "../../theme";
import {
  ImgComponent,
  PageComponent,
  TranslationComponent,
  VisualNovelTextComponent,
} from "../../../../../components";
import { SceneGifWithTextContainer } from "../SceneGifWithTextScene/styles";
import {
  useButtonHandleClick,
  useGameObjects,
  useScene,
} from "../../../../../hooks";
import {
  BoxCharacterNamePosition,
  Character,
  SceneComicsDoubleProps,
} from "../../../../game-types";
import {
  SceneComicsDoubleCharacterName,
  SceneComicsDoubleImgBoxDialog,
  SceneComicsDoubleTextTextContainer,
} from "./styles";
import ButtonMenuPauseSceneComponent from "../../components/ButtonMenuPauseSceneComponent";
import ModalParametersGameComponent from "../../modals/ModalParametersGameComponent";
import ContinueArrowComponent from "../../components/ContinueArrowComponent";
import useMultipleTextsOneByOneOnScene from "../../hooks/useMultipleTextsOneByOneOnScene";
import PointsGameComponent from "../../components/PointsGameComponent";
import { useGameProvider } from "../../../../../gameProvider";

const SceneComicsDouble: SceneComponentProps<{}, SceneComicsDoubleProps> = (
  props
) => {
  const {
    data: { _id, texts, boxDialog },
  } = props;

  const { nextScene } = useScene(props.data, {
    musics: [
      {
        sound: "main_music.mp3",
        volume: 1,
      },
    ],
  });

  const { translateText } = useGameProvider();
  const { getGameObject } = useGameObjects();
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

  const characterObject = useMemo(() => {
    return getGameObject<Character>(texts[i].character);
  }, [i]);

  const backgroundImage = useMemo(() => {
    return texts[i].backgroundImage;
  }, [i]);

  const characterNameBoxPosition = useMemo(() => {
    return texts[i].boxCharacterNamePosition as BoxCharacterNamePosition;
  }, [i]);

  const click = useButtonHandleClick();

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
          $nextManuelly={showContinueArrow}
          onClick={(e) => {
            click(e, {
              callback: handleClickManually,
              playSound: true,
            });
          }}
        >
          <ButtonMenuPauseSceneComponent handleClick={handleParamsOpened} />
          <ImgComponent
            className="image-background"
            src={backgroundImage}
            forceMaxSize={false}
          />
          <SceneComicsDoubleImgBoxDialog
            src="CADRE 1.png"
            forceMaxSize={false}
            aria-hidden="true"
            $boxDialog={boxDialog}
          />
          <SceneComicsDoubleCharacterName
            aria-hidden="true"
            $boxDialog={boxDialog}
            $position={characterNameBoxPosition}
          >
            <span>
              <strong>{characterObject._title}</strong>{" "}
            </span>
          </SceneComicsDoubleCharacterName>
          <SceneComicsDoubleTextTextContainer
            $showBuble={showBubble}
            $fontFamily={characterObject.fontFamily}
            $boxDialog={boxDialog}
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
          </SceneComicsDoubleTextTextContainer>
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

export default SceneComicsDouble;
