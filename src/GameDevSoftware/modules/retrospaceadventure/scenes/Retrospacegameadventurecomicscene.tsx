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
import { useScene } from "../../../../hooks";
import { calculPercent } from "./utils";

type RetrospacegameadventurecomicsceneHitBox = {
  width: number;
  height: number;
  top: number;
  left: number;
  content: string;
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
  // object-fit: contain;
  &.active {
    visibility: visible;
  }
  border-radius: 10px;
`;

const RetrospacegameadventurecomicsceneBull = styled.div<
  Omit<RetrospacegameadventurecomicsceneHitBox, "content"> & {
    showBubble: boolean;
    fontSize: number;
    visible: boolean;
  }
>`
  position: absolute !important;
  width: ${({ width }) => `${width}%`};
  height: ${({ height }) => `${height}%`};
  top: ${({ top }) => `${top}%`};
  left: ${({ left }) => `${left}%`};
  ${({ showBubble }) => (showBubble ? "border: 0.5px solid green;" : "")}
  // font-size: ${({ fontSize }) => `${fontSize}px`};
  overflow-y: auto;
  text-align: center;
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  border-radius: 28px;
  overflow: visible;
  // &:after {
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   content: "";
  //   width: 100%;
  //   height: 100%;
  //   border: 1px solid green;
  //   border-radius: 28px;
  //   z-index: 9999;
  // }
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 100%; /* le texte prendra 100% de la taille de la div parent */
    // font-size: ${({ fontSize }) => `${fontSize}px`};
    white-space: pre-wrap; /* le texte sera à la ligne automatiquement si nécessaire */
    line-height: 200%;
  }
  @media screen and (max-width: 897px) {
    span {
      font-size: 80%; /* le texte prendra 100% de la taille de la div parent */
      line-height: 130%;
    }
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
      const { children, offsetHeight, offsetWidth } = refImageDiv.current;
      const img = children[0] as HTMLImageElement;
      // const { naturalHeight, naturalWidth } = img;
      // const width =
      //   naturalWidth > offsetWidth ? offsetWidth - 20 : naturalWidth;
      // const height =
      //   naturalHeight > offsetHeight ? offsetHeight - 20 : naturalHeight;

      // const width = offsetWidth - 20,
      //   height = offsetHeight - 20;

      // img.style.width = `${width}px`;
      // img.style.height = `${height}px`;
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
  const [fontSize, setFontSize] = useState<number>(0);
  const bullRef = useRef<HTMLDivElement>(null);
  const { innerWidth, innerHeight, getEnvVar } = useGameProvider();

  const showBubble = useMemo(
    () => getEnvVar<boolean>("SHOW_BUBBLE_BOX"),
    [getEnvVar]
  );

  const calculateFontSize = (
    width: number,
    height: number,
    content: number
  ) => {
    var area = width * height;

    return Math.sqrt(area / content); //this provides the font-size in points.
  };

  const draw = useCallback(() => {
    if (bullRef.current) {
      const { offsetWidth, offsetHeight } = bullRef.current;
      setFontSize(calculateFontSize(offsetWidth, offsetHeight, content.length));
    }
  }, [bullRef, content]);

  useEffect(() => {
    draw();
  }, [bullRef, content]);

  useEffect(() => {
    setTimeout(() => setVisible(true), timeOutToShow);
  }, [timeOutToShow]);

  useEffect(() => {
    draw();
  }, [innerWidth, innerHeight]);

  return (
    <RetrospacegameadventurecomicsceneBull
      width={width}
      height={height}
      fontSize={fontSize}
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
      data: { images, _canPrevScene = false },
    } = props;

    const { innerWidth, preloadSound, playSound, getValueFromConstant } =
      useGameProvider();
    const [canNextScene, setCanNextScene] = useState<boolean>(false);

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

    const toNextScene = useCallback(
      (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        playSound(pageTurnSound, 0, 1, 0).then(() => {
          const percent = calculPercent(e.clientX, innerWidth);
          if (canNextScene && _canPrevScene && percent < 20) {
            prevScene();
          } else if (canNextScene) {
            nextScene();
          }
        });
      },
      [canNextScene, _canPrevScene]
    );

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
        onClick={toNextScene}
        maxSize={{ width: 1920, height: 1080 }}
      >
        <Container>
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
      </PageComponent>
    );
  };

export default Retrospacegameadventurecomicscene;
