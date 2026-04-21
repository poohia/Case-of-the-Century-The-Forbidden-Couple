import { useCallback, useMemo } from "react";

import { SceneComponentProps } from "../../../../../types";
import {
  CharacterInterface,
  SceneGifWithTextProps,
} from "../../../../game-types";
import {
  SceneGifWithTextContainer,
  SceneGifWithTextContainerNameCharacter,
  SceneGifWithTextTextContainer,
} from "./styles";
import {
  ImgComponent,
  VisualNovelTextComponent,
} from "../../../../../components";
import {
  useButtonHandleClick,
  useGameObjects,
  useScene,
} from "../../../../../hooks";
import ButtonMenuPauseSceneComponent from "../../components/ButtonMenuPauseSceneComponent";
import ModalParametersGameComponent from "../../modals/ModalParametersGameComponent";
import ContinueArrowComponent from "../../components/ContinueArrowComponent";
import useMultipleTextsOneByOneOnScene from "../../hooks/useMultipleTextsOneByOneOnScene";
import PointsGameComponent from "../../components/PointsGameComponent";
import { VisualNovelTextContainer } from "../SceneDialogueScene/styles";

export type ChapterTitleComponentProps = SceneComponentProps<
  {},
  SceneGifWithTextProps
>;

const SceneGifWithText: ChapterTitleComponentProps = (props) => {
  const {
    data: { _id, backgroundImage, texts, character },
  } = props;

  const { optionsLoaded, nextScene } = useScene(props.data, {
    musics: [
      {
        sound: "main_music.mp3",
      },
      {
        sound: "Visual Novel_C1_Voiture_V2_1903.mp3",
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

  const { getGameObject } = useGameObjects();
  const click = useButtonHandleClick();

  const characterObject = useMemo(
    () => getGameObject<CharacterInterface>(character),
    [character]
  );

  const handleClickManually = useCallback(() => {
    if (!isTypingComplete) {
      handleForceInstant();
      return;
    }

    if (!showContinueArrow) {
      return;
    }

    // setShowContinueArrow(false);
    if (i < texts.length - 1) {
      addPoints(keyText, addPointsValue);
      nextAction();
    } else {
      addPoints(keyText, addPointsValue);
      nextScene();
    }
  }, [i, texts, keyText, addPointsValue, nextAction, nextScene]);

  return (
    <>
      <PointsGameComponent points={points} />
      <SceneGifWithTextContainer
        $nextManuelly={showContinueArrow || !isTypingComplete}
        onClick={(e) => {
          if (!showContinueArrow && isTypingComplete) {
            return;
          }
          click(e, {
            callback: handleClickManually,
          });
        }}
        inert={openParameters ? "" : undefined}
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
        >
          {optionsLoaded && (
            <VisualNovelTextContainer $fontFamily={characterObject.fontFamily}>
              <VisualNovelTextComponent
                characterName={characterObject._title}
                text={text}
                playSound={{ sound: characterObject.bleepSound }}
                paused={openParameters}
                instant={forceInstant}
                // speed={94}
                onDone={() => {
                  handleTypingDone();
                }}
              />
            </VisualNovelTextContainer>
          )}

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
    </>
  );
};

export default SceneGifWithText;
