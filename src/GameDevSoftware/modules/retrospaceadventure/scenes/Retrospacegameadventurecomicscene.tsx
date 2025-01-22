import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

import {
  ImgComponent,
  PageComponent,
  TranslationComponent,
} from "../../../../components";
import { SceneComponentProps } from "../../../../types";

import "animate.css";
import { useGameProvider } from "../../../../gameProvider";
import { useScene, useVibrate } from "../../../../hooks";
import { calculPercent } from "./utils";
import RetrospaceadventureTutorialComicScene from "./components/RetrospaceadventureTutorialComicScene";
import MenuPauseComponent from "./components/MenuPauseComponent";
import { useOnLongPress } from "../../../../hooksGestures";

type RetrospacegameadventurecomicsceneHitBox = {
  width: number;
  height: number;
  top: number;
  left: number;
  content: string;
  fontFamily?: string;
  fontStyle?: string;
};
type RetrospacegameadventurecomicscenePropsData = {
  images: {
    src: string;
    dialogsboxes?: RetrospacegameadventurecomicsceneHitBox[];
  }[];
};

const Container = styled.div`
  background-size: cover;
  width: 100%;
  height: 100%;
`;

const RetrospacegameadventurecomicsceneComic1Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  img {
    width: 98%;
    height: 98%;
  }
`;

const RetrospacegameadventurecomicsceneComicDivImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const RetrospacegameadventurecomicsceneComicImg = styled(ImgComponent)`
  max-width: 100%;
  max-height: 100%;
  visibility: hidden;
  &.active {
    visibility: visible;
  }
  border-radius: 10px;
`;

const RetrospacegameadventurecomicsceneBull = styled.div<
  Omit<RetrospacegameadventurecomicsceneHitBox, "content"> & {
    showBubble: boolean;
    visible: boolean;
  }
>`
  position: absolute !important;
  width: ${({ width }) => `${width}%`};
  height: ${({ height }) => `${height}%`};
  top: ${({ top }) => `${top}%`};
  left: ${({ left }) => `${left}%`};
  ${({ showBubble }) => (showBubble ? "border: 0.5px solid green;" : "")}
  overflow-y: auto;
  text-align: center;
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  border-radius: 28px;
  overflow: visible;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: calc(1vw + 1vh);
    ${({ fontFamily }) => fontFamily && `font-family: ${fontFamily};`}
    ${({ fontStyle }) => fontStyle === "bold" && "font-weight: bold;"}
    ${({ fontStyle }) => fontStyle === "italic" && "font-style: italic;"}
  }
`;

export type RetrospacegameadventurecomicsceneProps = SceneComponentProps<
  {},
  RetrospacegameadventurecomicscenePropsData
>;

const RetrospacegameadventurecomicsceneContainerFromImages: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <RetrospacegameadventurecomicsceneComic1Container>
      {children}
    </RetrospacegameadventurecomicsceneComic1Container>
  );
};
const RetrospacegameadventurecomicsceneImage: React.FC<{
  children: React.ReactNode;
  timeOutToShow: number;
}> = ({ children, timeOutToShow }) => {
  const refImageDiv = useRef<HTMLDivElement>(null);
  const { innerWidth, innerHeight } = useGameProvider();

  const showImage = useCallback(() => {
    if (refImageDiv.current) {
      const { children } = refImageDiv.current;
      const img = children[0] as HTMLImageElement;
      setTimeout(() => {
        img.className = `${img.className} animate__zoomIn active`;
      }, timeOutToShow);
    }
  }, [refImageDiv, timeOutToShow]);

  useEffect(() => {
    showImage();
  }, [refImageDiv, timeOutToShow]);

  useEffect(() => {
    showImage();
  }, [innerWidth, innerHeight]);

  return (
    <RetrospacegameadventurecomicsceneComicDivImg ref={refImageDiv}>
      {children}
    </RetrospacegameadventurecomicsceneComicDivImg>
  );
};

const RetrospacegameadventurecomicsceneDialogBox: React.FC<
  RetrospacegameadventurecomicsceneHitBox & {
    timeOutToShow: number;
  }
> = ({ content, timeOutToShow, width, height, ...rest }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const bullRef = useRef<HTMLDivElement>(null);
  const { getEnvVar } = useGameProvider();

  const showBubble = useMemo(
    () => getEnvVar<boolean>("SHOW_BUBBLE_BOX"),
    [getEnvVar]
  );

  useEffect(() => {
    setTimeout(() => setVisible(true), timeOutToShow);
  }, [timeOutToShow]);

  return (
    <RetrospacegameadventurecomicsceneBull
      width={width}
      height={height}
      ref={bullRef}
      visible={visible}
      showBubble={!!showBubble}
      {...rest}
    >
      <TranslationComponent id={content} />
    </RetrospacegameadventurecomicsceneBull>
  );
};

const Retrospacegameadventurecomicscene: RetrospacegameadventurecomicsceneProps =
  (props) => {
    const {
      data: { images },
    } = props;

    const {
      innerWidth,
      preloadSound,
      playSound,
      getValueFromConstant,
      getData,
      saveData,
      push,
    } = useGameProvider();

    const { oneTap } = useVibrate();

    const [canNextScene, setCanNextScene] = useState<boolean>(false);
    const [tutorialAlreadyShow, setTutorialAlreadyShow] = useState<boolean>(
      !!getData<boolean>("tutorial-scene-comic")
    );
    const [showPauseModal, setShowPauseModal] = useState<boolean>(false);

    const pageTurnSound = useMemo(
      () => getValueFromConstant<string>("retrospaceadventure_page_turn_sound"),
      []
    );

    const { nextScene, prevScene } = useScene(props.data, {
      preloadSounds: [
        {
          sound: pageTurnSound,
          volume: 1,
          loop: false,
        },
      ],
    });

    const { handleClick, startPressTimer, stopPressTimer } = useOnLongPress({
      onClick: (e) => {
        toNextScene(e);
      },
      onLongPress: () => {
        oneTap();
        setShowPauseModal(true);
      },
    });

    const toNextScene = useCallback(
      (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        oneTap();
        playSound(pageTurnSound, 0, 1, 0).then(() => {
          const percent = calculPercent(e.clientX, innerWidth);
          if (canNextScene && percent < 20) {
            prevScene();
          } else if (canNextScene) {
            nextScene();
          }
        });
      },
      [canNextScene]
    );

    const saveTutorial = useCallback(() => {
      setShowPauseModal(true);
      setTutorialAlreadyShow(true);
      saveData("tutorial-scene-comic", true);
    }, []);

    useEffect(() => {
      setCanNextScene(false);
      setTimeout(() => {
        setCanNextScene(true);
      }, images.length * 1000);
    }, [images]);

    useEffect(() => {
      preloadSound(pageTurnSound, 1, false);
    }, [pageTurnSound]);

    return (
      <PageComponent
        style={{ cursor: canNextScene ? "pointer" : "auto" }}
        maxSize={{ width: 1920, height: 1080 }}
      >
        <Container
          onClick={handleClick}
          onMouseDown={startPressTimer} // Desktop long click
          onMouseUp={stopPressTimer}
          onMouseLeave={stopPressTimer}
          onTouchStart={startPressTimer} // Mobile long touch
          onTouchEnd={stopPressTimer}
        >
          {!tutorialAlreadyShow && (
            <RetrospaceadventureTutorialComicScene onClick={saveTutorial} />
          )}
          <RetrospacegameadventurecomicsceneContainerFromImages>
            {images.map((image, i) => (
              <RetrospacegameadventurecomicsceneImage
                key={`RetrospacegameadventurecomicsceneImage-${image.src}-${i}`}
                timeOutToShow={i * 1000}
              >
                <RetrospacegameadventurecomicsceneComicImg
                  src={image.src}
                  className="animate__animated"
                />
                {image.dialogsboxes?.map((dialogsboxe, j) => {
                  return (
                    <RetrospacegameadventurecomicsceneDialogBox
                      key={`RetrospacegameadventurecomicsceneImage-RetrospacegameadventurecomicsceneBull-${image.src}-${i}-${j}`}
                      timeOutToShow={i * 1000 + 1000}
                      {...dialogsboxe}
                    />
                  );
                })}
              </RetrospacegameadventurecomicsceneImage>
            ))}
          </RetrospacegameadventurecomicsceneContainerFromImages>
        </Container>
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
    );
  };

export default Retrospacegameadventurecomicscene;
