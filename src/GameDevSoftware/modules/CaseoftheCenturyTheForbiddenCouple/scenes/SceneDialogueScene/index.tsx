import { ThemeProvider } from "styled-components";
import {
  useButtonHandleClick,
  useGameObjects,
  useScene,
} from "../../../../../hooks";
import { SceneComponentProps } from "../../../../../types";
import { globalTheme } from "../../theme";
import { PageComponent, TranslationComponent } from "../../../../../components";
import { useGameProvider } from "../../../../../gameProvider";
import {
  CharacterViewContainer,
  ImgBoxDialogContainer,
  SceneDialogueContainer,
} from "./styles";
import {
  Character,
  Dialogue,
  Response as ResponseType,
  SceneDialogueProps,
} from "../../../../game-types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SceneComicsDoubleTextTextContainer } from "../SceneComicsDoubleScene/styles";
import { Textfit } from "react-textfit";
import useMultipleTextsOneByOneOnScene from "../../hooks/useMultipleTextsOneByOneOnScene";
import ButtonMenuPauseSceneComponent from "../../components/ButtonMenuPauseSceneComponent";
import ModalParametersGameComponent from "../../modals/ModalParametersGameComponent";
import ContinueArrowComponent from "../../components/ContinueArrowComponent";

const SceneDialogue: SceneComponentProps<{}, SceneDialogueProps> = (props) => {
  const {} = useScene(props.data, {
    musics: [
      {
        sound: "main_music.mp3",
        volume: 1,
      },
    ],
  });
  const {
    backgroundImage,
    firstDialogue,
    boxDialog,
    boxDialogImg,
    characterResponse,
  } = props.data;

  const { getAssetImg, playSoundEffect } = useGameProvider();
  const { getGameObject } = useGameObjects();

  const [dialogue, setDialogue] = useState<Dialogue>(
    getGameObject(firstDialogue)
  );

  const [showResponse, setShowResponse] = useState<boolean>(false);

  const characterObject = useMemo<Character>(
    () => getGameObject(dialogue.character),
    [dialogue]
  );
  const texts = useMemo(() => dialogue.texts, [dialogue]);

  const [imageAnimation, setImageAnimation] = useState<string>(() => {
    switch (dialogue.animation) {
      case "angry":
        return characterObject.angryImage;
      case "idle":
      default:
        return characterObject.idleImage;
    }
  });

  useEffect(() => {
    switch (dialogue.animation) {
      case "idle":
        setImageAnimation(characterObject.idleImage);
        break;
      case "angry":
        setImageAnimation(characterObject.angryImage);
    }
  }, [dialogue, characterObject]);

  useEffect(() => {
    if (dialogue.animation !== "idle") {
      setTimeout(() => {
        setImageAnimation(characterObject.idleImage);
      }, 1700);
    }
  }, [dialogue, characterObject.idleImage]);

  const characterResponseObject = useMemo<Character>(
    () => getGameObject(characterResponse),
    []
  );
  const responsesObject = useMemo<ResponseType[]>(() => {
    return (
      dialogue.responses?.map((response: any) => getGameObject(response)) || []
    );
  }, [characterObject]);

  const {
    i,
    text,
    openParameters,
    showContinueArrow,
    canNextScene,
    autoNextScene,
    vitessScrollText,
    showBubble,
    nextAction,
    handleParamsOpened,
    handleParamsClosed,
    resetScene,
  } = useMultipleTextsOneByOneOnScene(texts);
  console.log("🚀 ~ canNextScene:", canNextScene);

  const click = useButtonHandleClick();

  const handleClickResponse = useCallback(
    (event: React.MouseEvent<any, MouseEvent>, response: ResponseType) => {
      click(event, {
        callback: () => {
          setDialogue(getGameObject(response.dialogue));
        },
        playSound: true,
      });
    },
    []
  );

  useEffect(() => {
    if (canNextScene && autoNextScene) {
      setTimeout(() => {
        setShowResponse(true);
      }, vitessScrollText);
    }
  }, [canNextScene, autoNextScene]);

  useEffect(() => {
    if (dialogue.sound) {
      playSoundEffect({
        sound: dialogue.sound,
        volume: 0.7,
      });
    }
  }, [dialogue]);

  useEffect(() => {
    setShowResponse(false);
    resetScene();
  }, [dialogue]);

  const handleClickManually = useCallback(() => {
    if (i < texts.length - 1) {
      nextAction();
    } else {
      setShowResponse(true);
    }
  }, [i, texts]);

  return (
    <ThemeProvider theme={{ ...globalTheme }}>
      <PageComponent>
        <SceneDialogueContainer
          $backgroundUrl={getAssetImg(backgroundImage)}
          $nextManuelly={showContinueArrow && !showResponse}
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
          {showResponse ? (
            <>
              <CharacterViewContainer
                src={characterResponseObject.idleImage}
                $boxDialog={boxDialog}
                forceMaxSize={false}
              />
              <ImgBoxDialogContainer
                src={boxDialogImg}
                $boxDialog={boxDialog}
                forceMaxSize={false}
              />
              <SceneComicsDoubleTextTextContainer
                $showBuble={showBubble}
                $fontFamily={characterResponseObject.fontFamily}
                $boxDialog={boxDialog}
              >
                <div className="list-responses">
                  {responsesObject.map((response, i) => (
                    <div
                      key={`scene-dialogue-response-${i}`}
                      onClick={(e) => handleClickResponse(e, response)}
                    >
                      {/* {i}. <TranslationComponent id={response.text} /> */}
                      {i + 1}. Réponse n°{i + 1}
                    </div>
                  ))}
                  {responsesObject.map((response, i) => (
                    <div
                      key={`scene-dialogue-response-${i}`}
                      onClick={(e) => handleClickResponse(e, response)}
                    >
                      {/* {i}. <TranslationComponent id={response.text} /> */}
                      {i + 3}. Réponse n°{i + 3}
                    </div>
                  ))}
                </div>
              </SceneComicsDoubleTextTextContainer>
            </>
          ) : (
            <>
              <CharacterViewContainer
                src={imageAnimation}
                $boxDialog={boxDialog}
                forceMaxSize={false}
              />
              <ImgBoxDialogContainer
                src={boxDialogImg}
                $boxDialog={boxDialog}
                forceMaxSize={false}
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
                    <ContinueArrowComponent handleClick={handleClickManually} />
                  )}
                </Textfit>
              </SceneComicsDoubleTextTextContainer>
            </>
          )}
        </SceneDialogueContainer>
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

export default SceneDialogue;
