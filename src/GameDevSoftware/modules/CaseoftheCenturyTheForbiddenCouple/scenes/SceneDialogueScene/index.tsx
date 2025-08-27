import { ThemeProvider } from "styled-components";
import { useScene } from "../../../../../hooks";
import { SceneComponentProps } from "../../../../../types";
import { globalTheme } from "../../theme";
import { PageComponent, TranslationComponent } from "../../../../../components";
import { useGameProvider } from "../../../../../gameProvider";
import {
  CharacterViewContainer,
  ImgBoxDialogContainer,
  SceneDialogueContainer,
} from "./styles";
import { SceneDialogueProps } from "../../../../game-types";
import {
  SceneComicsDoubleCharacterName,
  SceneComicsDoubleTextTextContainer,
} from "../SceneComicsDoubleScene/styles";
import ButtonMenuPauseSceneComponent from "../../components/ButtonMenuPauseSceneComponent";
import ModalParametersGameComponent from "../../modals/ModalParametersGameComponent";
import useSceneDialogueScene from "./useSceneDialogueScene";
import PointsGameComponent from "../../components/PointsGameComponent";
import SmileyAngryComponent from "../../components/SmileyAngryComponent";
import SceneDialogueSceneTextContainerComponent from "./SceneDialogueSceneTextContainerComponent";
import useUnlock from "../../hooks/useUnlock";
import NotifyContext from "../../contexts/NotifyContext";

const SceneDialogue: SceneComponentProps<{}, SceneDialogueProps> = (props) => {
  const { optionsLoaded, nextScene } = useScene(props.data, {
    musics: [
      {
        sound: "main_music.mp3",
        volume: 1,
      },
    ],
  });
  const { backgroundImage, boxDialog, boxDialogImg } = props.data;

  const {
    showContinueArrow,
    showResponse,
    characterResponseObject,
    showBubble,
    responsesObject,
    imageAnimation,
    characterObject,
    text,
    openParameters,
    points,
    percentAngry,
    previousPercentAngry,
    click,
    handleClickResponse,
    handleParamsOpened,
    handleClickManually,
    handleParamsClosed,
    /** */
    isTypingComplete,
    forceInstant,
    handleTypingDone,
  } = useSceneDialogueScene({ ...props.data, nextScene });

  const { getAssetImg, translateText } = useGameProvider();
  const { notifyRest } = useUnlock(props.data);

  return (
    <ThemeProvider theme={{ ...globalTheme }}>
      <NotifyContext.Provider value={notifyRest}>
        <PageComponent maxSize={{ width: 1920, height: 1080 }}>
          <PointsGameComponent points={points} />
          <SceneDialogueContainer
            aria-label={translateText("message_1752563713306")}
            $backgroundUrl={getAssetImg(backgroundImage)}
            $backgroundResponseUrl={getAssetImg("CADRE-INTERIEUR.png")}
            $nextManuelly={
              (showContinueArrow && !showResponse) || !isTypingComplete
            }
            onClick={(e) => {
              if (!showResponse) {
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
                  aria-hidden="true"
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
                        role="button"
                        tabIndex={i}
                      >
                        <TranslationComponent id={response.text} />
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
                <SmileyAngryComponent
                  percent={percentAngry}
                  prevPercent={previousPercentAngry}
                />
                <ImgBoxDialogContainer
                  src={boxDialogImg}
                  $boxDialog={boxDialog}
                  forceMaxSize={false}
                  aria-hidden="true"
                />

                <SceneComicsDoubleCharacterName
                  aria-hidden="true"
                  $boxDialog={boxDialog}
                >
                  <span>
                    <strong>{characterObject._title}</strong>
                  </span>
                </SceneComicsDoubleCharacterName>
                <SceneDialogueSceneTextContainerComponent
                  optionsLoaded={optionsLoaded}
                  showBubble={showBubble}
                  characterObject={characterObject}
                  boxDialog={boxDialog}
                  text={text}
                  openParameters={openParameters}
                  forceInstant={forceInstant}
                  showContinueArrow={showContinueArrow}
                  isTypingComplete={isTypingComplete}
                  handleTypingDone={handleTypingDone}
                  handleClickManually={handleClickManually}
                />
              </>
            )}
          </SceneDialogueContainer>
          <ModalParametersGameComponent
            open={openParameters}
            onClose={handleParamsClosed}
          />
        </PageComponent>
      </NotifyContext.Provider>
    </ThemeProvider>
  );
};

export default SceneDialogue;
