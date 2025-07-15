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
import { Textfit } from "react-textfit";
import ButtonMenuPauseSceneComponent from "../../components/ButtonMenuPauseSceneComponent";
import ModalParametersGameComponent from "../../modals/ModalParametersGameComponent";
import ContinueArrowComponent from "../../components/ContinueArrowComponent";
import useSceneDialogueScene from "./useSceneDialogueScene";
import PointsGameComponent from "../../components/PointsGameComponent";

const SceneDialogue: SceneComponentProps<{}, SceneDialogueProps> = (props) => {
  const {} = useScene(props.data, {
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
    click,
    handleClickResponse,
    handleParamsOpened,
    handleClickManually,
    handleParamsClosed,
  } = useSceneDialogueScene(props.data);

  const { getAssetImg, translateText } = useGameProvider();

  return (
    <ThemeProvider theme={{ ...globalTheme }}>
      <PageComponent maxSize={{ width: 1920, height: 1080 }}>
        <PointsGameComponent points={points} />
        <SceneDialogueContainer
          aria-label={translateText("message_1752563713306")}
          $backgroundUrl={getAssetImg(backgroundImage)}
          $nextManuelly={showContinueArrow && !showResponse}
          onClick={(e) => {
            if (showContinueArrow && !showResponse) {
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
              </SceneComicsDoubleTextTextContainer>
            </>
          )}
        </SceneDialogueContainer>
        <ModalParametersGameComponent
          open={openParameters}
          onClose={handleParamsClosed}
        />
      </PageComponent>
    </ThemeProvider>
  );
};

export default SceneDialogue;
