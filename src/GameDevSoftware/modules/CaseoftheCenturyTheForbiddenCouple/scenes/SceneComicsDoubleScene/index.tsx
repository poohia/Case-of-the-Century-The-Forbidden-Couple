import { useMemo } from "react";
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
import { useGameObjects, useScene } from "../../../../../hooks";
import { Character, SceneComicsDoubleProps } from "../../../../game-types";
import { SceneComicsDoubleTextTextContainer } from "./styles";
import ButtonNextSceneComponent from "../../components/ButtonNextSceneComponent";
import ButtonMenuPauseSceneComponent from "../../components/ButtonMenuPauseSceneComponent";
import ModalParametersGameComponent from "../../modals/ModalParametersGameComponent";
import ContinueArrowComponent from "../../components/ContinueArrowComponent";
import useMultipleTextsOneByOneOnScene from "../../hooks/useMultipleTextsOneByOneOnScene";
import useButtonHandleClick from "../../hooks/useButtonHandleClick";

const SceneComicsDouble: SceneComponentProps<{}, SceneComicsDoubleProps> = (
  props
) => {
  const {
    data: { image, texts, boxDialog },
  } = props;

  const { nextScene } = useScene(props.data, {
    musics: [
      {
        sound: "main_music.mp3",
        volume: 1,
      },
    ],
  });

  const { getGameObject } = useGameObjects();
  const {
    i,
    text,
    openParameters,
    showContinueArrow,
    canNextScene,
    showBubble,
    autoNextScene,
    setOpenParemeters,
    nextAction,
    resetScene,
    handleParamsClosed,
    pause,
  } = useMultipleTextsOneByOneOnScene(texts, nextScene, true);

  const characterObject = useMemo(() => {
    return getGameObject<Character>(texts[i].character);
  }, [i]);

  const backgroundImage = useMemo(() => {
    // @ts-ignore
    return texts[i].backgroundImage;
  }, [i]);

  const click = useButtonHandleClick(false);

  return (
    <ThemeProvider theme={{ ...globalTheme }}>
      <PageComponent>
        <SceneGifWithTextContainer
          $nextManuelly={i < texts.length - 1 && showContinueArrow}
          onClick={(e) => {
            if (i < texts.length - 1 && showContinueArrow) {
              click(e, nextAction);
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
            className="image-background"
            src={backgroundImage}
            forceMaxSize={false}
          />
          <ImgComponent
            className="image-box-buble"
            src="CADRE 1.png"
            forceMaxSize={false}
            style={{
              top: `calc(${boxDialog.top}% - 20px)`,
              left: `calc(${boxDialog.left}% - 30px)`,
              width: `calc(${boxDialog.width}% + 60px)`,
              height: `calc(${boxDialog.height}% + 40px)`,
            }}
          />
          <SceneComicsDoubleTextTextContainer
            $showBuble={showBubble}
            $fontFamily={characterObject.fontFamily}
            $boxDialog={boxDialog}
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
          </SceneComicsDoubleTextTextContainer>
          {canNextScene && !autoNextScene && (
            <ButtonNextSceneComponent
              handleClick={() => {
                nextScene();
                setTimeout(() => {
                  resetScene();
                });
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

export default SceneComicsDouble;
