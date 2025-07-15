import { useCallback, useMemo } from "react";
import { ThemeProvider } from "styled-components";
import { Textfit } from "react-textfit";

import { SceneComponentProps } from "../../../../../types";
import { globalTheme } from "../../theme";
import {
  ImgComponent,
  PageComponent,
  TranslationComponent,
} from "../../../../../components";
import { SceneGifWithTextContainer } from "../SceneGifWithTextScene/styles";
import {
  useButtonHandleClick,
  useGameObjects,
  useScene,
} from "../../../../../hooks";
import { Character, SceneComicsDoubleProps } from "../../../../game-types";
import { SceneComicsDoubleTextTextContainer } from "./styles";
import ButtonMenuPauseSceneComponent from "../../components/ButtonMenuPauseSceneComponent";
import ModalParametersGameComponent from "../../modals/ModalParametersGameComponent";
import ContinueArrowComponent from "../../components/ContinueArrowComponent";
import useMultipleTextsOneByOneOnScene from "../../hooks/useMultipleTextsOneByOneOnScene";
import PointsGameComponent from "../../components/PointsGameComponent";
import usePointsGame from "../../hooks/usePointsGame";
import { useGameProvider } from "../../../../../gameProvider";

const SceneComicsDouble: SceneComponentProps<{}, SceneComicsDoubleProps> = (
  props
) => {
  const {
    data: { _id, image, texts, boxDialog },
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
  } = useMultipleTextsOneByOneOnScene(_id, texts, {
    nextScene,
  });

  const characterObject = useMemo(() => {
    return getGameObject<Character>(texts[i].character);
  }, [i]);

  const backgroundImage = useMemo(() => {
    // @ts-ignore
    return texts[i].backgroundImage;
  }, [i]);

  const click = useButtonHandleClick();

  const handleClickManually = useCallback(() => {
    if (i < texts.length - 1) {
      addPoints(keyText, addPointsValue);
      nextAction();
    } else {
      addPoints(keyText, addPointsValue);
      setTimeout(() => nextScene(), 1500);
    }
  }, [i, texts, nextAction, nextScene]);

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
            className="image-background"
            src={backgroundImage}
            forceMaxSize={false}
          />
          <ImgComponent
            className="image-box-buble"
            src="CADRE 1.png"
            forceMaxSize={false}
            style={{
              top: `calc(${boxDialog.top}% - 18px)`,
              left: `calc(${boxDialog.left}% - 25px)`,
              width: `calc(${boxDialog.width}% + 50px)`,
              height: `calc(${boxDialog.height}% + 37px)`,
            }}
            aria-hidden="true"
          />
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
