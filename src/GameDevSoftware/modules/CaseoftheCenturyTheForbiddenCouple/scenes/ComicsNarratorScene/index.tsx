import { useCallback, useEffect, useState } from "react";

import { SceneComponentProps } from "../../../../../types";
import {
  AnimationImgsComponent,
  VisualNovelTextComponent,
} from "../../../../../components";
import { useButtonHandleClick, useScene } from "../../../../../hooks";
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
    data: { _id, sceneDescription, textsNarrator, boxDialog, backgroundImages },
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
    autoStart: finalTexts.length > 0,
    nextScene,
  });

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
      nextScene();
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
        <section aria-label={translateText(sceneDescription)}>
          <ButtonMenuPauseSceneComponent handleClick={handleParamsOpened} />
          <AnimationImgsComponent
            imgs={backgroundImages.map((bi) => bi.image)}
            forceMaxSize={false}
            ariaHidden
            imgClassName="image-background"
          />
          <SceneComicsNarratorImgBoxDialog
            src="CADRE 2.png"
            forceMaxSize={false}
            aria-hidden="true"
            $boxDialog={boxDialog}
            className="animate__animated animate__bounceIn animate__delay-2s"
          />

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
                  speed={48}
                />
              </VisualNovelTextContainer>
            )}

            {showContinueArrow && isTypingComplete && (
              <ContinueArrowComponent handleClick={handleClickManually} />
            )}
          </SceneComicsNarratorTextTextContainer>
        </section>
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
