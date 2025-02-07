// https://www.freepik.com/free-vector/different-aliens-monster-transparent-background_20829475.htm#query=alien%20drawing&position=0&from_view=search
// import AnimatedText from "react-animated-text-content";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ThemeProvider } from "styled-components";

import {
  AnimationComponent,
  ImgFromSpriteComponent,
  PageComponent,
} from "../../../../../../components";
import {
  useAssets,
  useGameObjects,
  useScene,
  useVibrate,
} from "../../../../../../hooks";

import "animate.css";

import { RetrospaceadventureCharacter } from "../../types";
import { fightTheme, globalTheme } from "../../themes";
import { useGameProvider } from "../../../../../../gameProvider";
import {
  ContainerComponent,
  DivTextContainer,
  ImageContainer,
  TutorialContainer,
} from "./RetrospacegameadventuredialogsceneStyledComponents";
import DialogScenePnjTextComponent from "./DialogScenePnjTextComponent";
import { SceneComponentProps, TutorialViewType } from "../../../../../../types";
import DialogSceneCharacterComponent from "./DialogSceneCharacterComponent";
import { useOnLongPress } from "../../../../../../hooksGestures";
import MenuPauseComponent from "../MenuPauseComponent";
import RetrospaceadevntureTutorialComponent from "../RetrospaceadevntureTutorialComponent";

export type RetrospacegameadventuredialogsceneProps = SceneComponentProps<
  {},
  {
    textIntro: string;
    alien: string;
    hero: string;
    dialog: {
      response: string;
      textResponse: string;
      isNextActionResponse?: boolean;
    }[];
  }
>;

const Retrospacegameadventuredialogscene: RetrospacegameadventuredialogsceneProps =
  (props) => {
    const {
      data: { hero, alien, textIntro, dialog: dialogData },
    } = props;
    const { nextScene } = useScene(props.data, {
      preloadSounds: [
        {
          sound: "robot_talk.mp3",
          loop: true,
          volume: 1,
        },
      ],
      primarySoundVolume: 0.4,
    });
    const {
      setBackgroundColor,
      playSound,
      getData,
      saveData,
      getValueFromConstant,
      push,
    } = useGameProvider();

    const [dialog, setDialog] = useState<
      {
        type: "pnj" | "character";
        text?: string;
        isEnd?: boolean;
      }[]
    >([]);
    const [Enemy, setEnemy] = useState<RetrospaceadventureCharacter>();
    const [Hero, setHero] = useState<RetrospaceadventureCharacter>();
    const [showDialogAnimation, setShowDialogAnimation] =
      useState<boolean>(false);
    const [tutorialAlreadyShow, setTutorialAlreadyShow] = useState<boolean>(
      !!getData<boolean>("tutorial-dialog")
    );

    const [showPauseModal, setShowPauseModal] = useState<boolean>(false);
    const { startPressTimer, stopPressTimer } = useOnLongPress({
      onLongPress: () => {
        if (!tutorialAlreadyShow) {
          return;
        }
        oneTap();
        setShowPauseModal(true);
      },
    });

    const { getAssetImg } = useAssets();
    const { getGameObject } = useGameObjects();

    // const { getValueFromConstant } = useConstants();
    const { oneTap } = useVibrate();

    const refContainer = useRef<HTMLDivElement>(null);
    const divTextContainer = useRef<HTMLDivElement>(null);

    const maxSizeGameContainer = useMemo(() => {
      const [width, height] = getValueFromConstant(
        "retrospaceadventure_max_width_height_views"
      );
      return { width, height };
    }, [getValueFromConstant]);

    const scrollDiv = useCallback(() => {
      if (divTextContainer.current) {
        divTextContainer.current.scrollTo({
          top: divTextContainer.current.scrollHeight,
          left: 0,
        });
      }
    }, [divTextContainer]);

    const nextDialogPnj = useCallback(
      (text: string, isEnd: boolean) => {
        setDialog((dialog) => dialog.concat({ type: "pnj", text, isEnd }));
        setTimeout(() => scrollDiv());
      },
      [scrollDiv()]
    );

    const nextDialogCharacter = useCallback(() => {
      setTimeout(() => {}, 1000);
      setDialog((dialog) => {
        if (dialog[dialog.length - 1]?.isEnd) {
          setTimeout(() => {
            nextScene();
          }, 1400);
          return dialog;
        }
        return dialog.concat({ type: "character" });
      });
      setTimeout(() => scrollDiv(), 700);
    }, [scrollDiv]);

    // useEffect(() => {
    //   if (divTextContainer.current) {
    //     divTextContainer.current.scrollTo({
    //       top: divTextContainer.current.scrollHeight,
    //       left: 0,
    //       behavior: "smooth",
    //     });
    //   }
    // });

    const views = useMemo((): TutorialViewType[] => {
      return [
        {
          title: "comic_spacegame_dialog_tuto_title",
          image: "dialog_tuto.png",
          text: "comic_spacegame_dialog_tuto_title_description",
          isVideo: false,
        },
      ];
    }, []);

    useEffect(() => {
      setEnemy(getGameObject<RetrospaceadventureCharacter>(alien));
    }, [alien, getGameObject]);

    useEffect(() => {
      setHero(getGameObject<RetrospaceadventureCharacter>(hero));
    }, [hero, getGameObject]);

    useEffect(() => {
      setTimeout(() => {
        setShowDialogAnimation(true);
      }, 1400);
    }, []);

    if (!Enemy || !Hero) {
      return <></>;
    }

    return (
      <ThemeProvider theme={{ ...globalTheme, ...fightTheme }}>
        <PageComponent maxSize={maxSizeGameContainer}>
          <ContainerComponent>
            {Enemy && (
              <ImageContainer
                onMouseDown={startPressTimer} // Desktop long click
                onMouseUp={stopPressTimer}
                onMouseLeave={stopPressTimer}
                onTouchStart={startPressTimer} // Mobile long touch
                onTouchEnd={stopPressTimer}
              >
                {!showDialogAnimation && (
                  <ImgFromSpriteComponent
                    className="animate__animated animate__fadeInLeft animate__fast"
                    atlasFile={Enemy.atlasFile}
                    imageFile={Enemy.image}
                    frameName="idle_sprite_3"
                    center
                    responsive
                    blockAtMaxSize
                    blockAtMinSize
                  />
                )}

                <AnimationComponent
                  animationFile={Enemy.animationFile}
                  animationName="dialog_animation"
                  atlasFile={Enemy.atlasFile}
                  imageFile={Enemy.image}
                  style={{
                    visibility: showDialogAnimation ? "visible" : "hidden",
                  }}
                  center
                  responsive
                  blockAtMaxSize
                  blockAtMinSize
                />
              </ImageContainer>
            )}
            {/* {_actions && (
              <RetrospacegameadventuredialogsceneTextComponent
                _actions={_actions}
                minigames={minigames}
                textContent={textContent}
                onClickCards={() => {
                  oneTap();
                  playSound("buttonclick.mp3", 0, 1, 0);
                  setShowCards(true);
                }}
                onClickMinigame={(minigame) => {
                  oneTap();
                  playSound("buttonclick.mp3", 0, 1, 0);
                  setShowMiniGame(minigame);
                }}
              />
            )} */}

            <DivTextContainer ref={divTextContainer}>
              {showDialogAnimation && (
                <>
                  <DialogScenePnjTextComponent
                    character={Enemy!}
                    textId={textIntro}
                    onFinished={nextDialogCharacter}
                    onChange={scrollDiv}
                  />
                  {dialog.map((d, i) => {
                    if (d.type === "pnj") {
                      return (
                        <DialogScenePnjTextComponent
                          key={`comic-spacegame-dialog-${i}`}
                          character={Enemy}
                          textId={d.text || ""}
                          onFinished={nextDialogCharacter}
                          onChange={scrollDiv}
                        />
                      );
                    } else {
                      return (
                        <DialogSceneCharacterComponent
                          key={`comic-spacegame-dialog-${i}`}
                          baseKey={`comic-spacegame-dialog-${i}`}
                          character={Hero}
                          dialog={dialogData}
                          onFinished={nextDialogPnj}
                        />
                      );
                    }
                  })}
                </>
              )}
            </DivTextContainer>
            {!tutorialAlreadyShow && (
              <TutorialContainer ref={refContainer}>
                <RetrospaceadevntureTutorialComponent
                  lastIcon="cancel.png"
                  views={views}
                  refParentContainer={refContainer}
                  onClickLastStep={() => {
                    setTutorialAlreadyShow(true);
                    saveData("tutorial-dialog", true);
                  }}
                />
              </TutorialContainer>
            )}
          </ContainerComponent>
          <MenuPauseComponent
            open={showPauseModal}
            onContinue={() => {
              setShowPauseModal(false);
            }}
            onBackHome={() => {
              push("home");
            }}
          />
        </PageComponent>
      </ThemeProvider>
    );
  };

export default Retrospacegameadventuredialogscene;
