import { useCallback, useEffect, useState } from "react";

import { SceneComponentProps } from "../../../../../types";
import {
  ImgComponent,
  VisualNovelTextComponent,
} from "../../../../../components";
import {
  useButtonHandleClick,
  useGameObjects,
  useScene,
} from "../../../../../hooks";
import { ComicsNarratorProps, Text } from "../../../../game-types";
import ButtonMenuPauseSceneComponent from "../../components/ButtonMenuPauseSceneComponent";
import ModalParametersGameComponent from "../../modals/ModalParametersGameComponent";
import ContinueArrowComponent from "../../components/ContinueArrowComponent";
import useMultipleTextsOneByOneOnScene from "../../hooks/useMultipleTextsOneByOneOnScene";
import PointsGameComponent from "../../components/PointsGameComponent";
import { useGameProvider } from "../../../../../gameProvider";
import { VisualNovelTextContainer } from "../SceneDialogueScene/styles";
import {
  SceneComicsNarratorContainer,
  SceneComicsNarratorImgBoxDialog,
  SceneComicsNarratorTextTextContainer,
} from "./styles";

const ComicsNarrator: SceneComponentProps<{}, ComicsNarratorProps> = (
  props
) => {
  const {
    data: { _id, textsNarrator, boxDialog, backgroundImage },
  } = props;

  const [finalTexts, setFinalTexts] = useState<Text[]>([]);

  const { optionsLoaded, nextScene } = useScene(props.data, {
    musics: [
      {
        sound: "main_music.mp3",
        volume: 1,
      },
      {
        sound: "ambiance_city.mp3",
        volume: 1,
        loop: true,
        fadeDuration: 0,
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
  } = useMultipleTextsOneByOneOnScene(_id, finalTexts, {
    nextScene,
  });

  //   const characterObject = useMemo(() => {
  //     return getGameObject<CharacterInterface>(texts[i].character);
  //   }, [i]);

  //   const backgroundImage = useMemo(() => {
  //     return texts[i].backgroundImage;
  //   }, [i]);

  //   const characterNameBoxPosition = useMemo(() => {
  //     return texts[i].boxCharacterNamePosition as BoxCharacterNamePosition;
  //   }, [i]);

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

    if (i < finalTexts.length - 1) {
      addPoints(keyText, addPointsValue);
      nextAction();
    } else {
      addPoints(keyText, addPointsValue);
      setTimeout(() => nextScene(), 1500);
    }
  }, [i, finalTexts, keyText, addPointsValue, nextAction, nextScene]);

  useEffect(() => {
    setTimeout(() => {
      setFinalTexts(textsNarrator as Text[]);
    }, 2700);
  }, [textsNarrator]);

  return (
    <>
      <PointsGameComponent points={points} />
      <SceneComicsNarratorContainer
        $nextManuelly={
          (showContinueArrow || !isTypingComplete) && finalTexts.length > 0
        }
        onClick={(e) => {
          if (
            (!showContinueArrow && isTypingComplete) ||
            finalTexts.length === 0
          ) {
            return;
          }
          click(e, {
            callback: handleClickManually,
            playSound: true,
          });
        }}
        className="animate__animated animate__fadeIn"
      >
        <ButtonMenuPauseSceneComponent handleClick={handleParamsOpened} />
        <ImgComponent
          className="image-background"
          src={backgroundImage}
          forceMaxSize={false}
        />
        <SceneComicsNarratorImgBoxDialog
          src="CADRE 2.png"
          forceMaxSize={false}
          aria-hidden="true"
          $boxDialog={boxDialog}
          className="animate__animated animate__bounceIn animate__delay-2s"
        />
        {/* <SceneComicsDoubleCharacterName
          aria-hidden="true"
          $boxDialog={boxDialog}
          $position={characterNameBoxPosition}
        >
          <span>
            <strong>{characterObject._title}</strong>{" "}
          </span>
        </SceneComicsDoubleCharacterName> */}
        <SceneComicsNarratorTextTextContainer
          $showBuble={showBubble}
          $fontFamily={"serif"}
          $boxDialog={boxDialog}
          aria-label={translateText("label_narrator")}
        >
          {text && optionsLoaded && (
            <VisualNovelTextContainer $fontFamily={"serif"}>
              <VisualNovelTextComponent
                text={text}
                playSound={{ sound: "bleep020.mp3" }}
                paused={openParameters}
                instant={forceInstant}
                onDone={handleTypingDone}
              />
            </VisualNovelTextContainer>
          )}

          {showContinueArrow && isTypingComplete && (
            <ContinueArrowComponent handleClick={handleClickManually} />
          )}
        </SceneComicsNarratorTextTextContainer>
      </SceneComicsNarratorContainer>
      <ModalParametersGameComponent
        open={openParameters}
        onClose={() => {
          handleParamsClosed();
        }}
      />
    </>
  );
};

export default ComicsNarrator;
