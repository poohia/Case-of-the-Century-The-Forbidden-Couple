import styled from "styled-components";
import { PageComponent } from "../../../../components";
import { useAssets, useScene } from "../../../../hooks";
import { SceneComponentProps } from "../../../../types";
import "animate.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import VideoComponent from "../../../../components/VideoComponent";
import { useGameProvider } from "../../../../gameProvider";

type RetrospacegameadventurecomicscenebtnPropsData = {
  video: string;
  fullWidth?: boolean;
  autoNextScene?: boolean;
  sound?: {
    file: string;
    time?: number;
  };
};

export type RetrospacegameadventurecomicsceneProps = SceneComponentProps<
  {},
  RetrospacegameadventurecomicscenebtnPropsData
>;

const Container = styled.div<{ canNextScene: boolean; fullWidth?: boolean }>`
  background: url("assets/images/backgroundprimary.png");
  width: 100%;
  height: 100%;
  ${({ canNextScene }) => canNextScene && "cursor: pointer;"}
  video {
    ${({ fullWidth }) =>
      fullWidth
        ? `
        width: 101%;
    height: 101%;
    object-fit: cover;
    object-position: center;
        `
        : `
    width: 98%;
    height: 98%;
    margin-top: 0.5%;
    margin-left: 1%;
    object-fit: contain;
    object-fit: cover;
    object-position: center;
    border-radius: 10px;
    `}
  }
`;

const Retrospacegameadventurevideoscene: RetrospacegameadventurecomicsceneProps =
  (props) => {
    const {
      data: { _actions, video, fullWidth, autoNextScene, sound },
    } = props;
    const { nextScene } = useScene(props.data);
    const { getAssetVideo } = useAssets();
    const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
    const refVideo = useRef<HTMLVideoElement>(null);
    const { playSoundEffect } = useGameProvider();

    const canClickToNextScene = useMemo(
      () => videoLoaded && !autoNextScene,
      [videoLoaded, autoNextScene]
    );

    const handleVideoFinished = useCallback(() => {
      setVideoLoaded(true);
      if (autoNextScene) {
        setTimeout(() => {
          nextScene();
        }, 500);
      }
    }, [autoNextScene, _actions, nextScene]);

    useEffect(() => {
      if (refVideo.current) {
        setTimeout(() => {
          if (refVideo.current) {
            refVideo.current.play();
          }
        }, 1500);
      }
    }, [refVideo]);

    useEffect(() => {
      if (refVideo.current && sound) {
        const handleVideoPlay = () => {
          setTimeout(() => {
            playSoundEffect(sound.file);
          }, sound.time || 0);
        };

        refVideo.current.addEventListener("play", handleVideoPlay);

        return () => {
          refVideo.current?.removeEventListener("play", handleVideoPlay);
        };
      }
    }, [sound, refVideo]);

    return (
      <PageComponent>
        <Container
          canNextScene={canClickToNextScene}
          onClick={() => canClickToNextScene && nextScene()}
          fullWidth={fullWidth}
        >
          <VideoComponent
            preload="auto"
            ref={refVideo}
            autoPlay={false}
            muted
            onEnded={handleVideoFinished}
          >
            <source src={getAssetVideo(video)} typeof="video/mp4" />
          </VideoComponent>
        </Container>
      </PageComponent>
    );
  };

export default Retrospacegameadventurevideoscene;
