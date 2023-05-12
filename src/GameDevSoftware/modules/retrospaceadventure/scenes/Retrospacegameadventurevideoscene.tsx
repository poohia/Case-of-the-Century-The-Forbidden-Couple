import styled from "styled-components";
import { PageComponent } from "../../../../components";
import { useAssets } from "../../../../hooks";
import { SceneComponentProps } from "../../../../types";
import "animate.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useGameProvider } from "../../../../gameProvider";
import VideoComponent from "../../../../components/VideoComponent";

type RetrospacegameadventurecomicscenebtnPropsData = {
  video: string;
  autoNextScene?: boolean;
};

export type RetrospacegameadventurecomicsceneProps = SceneComponentProps<
  {},
  RetrospacegameadventurecomicscenebtnPropsData
>;

const Container = styled.div<{ canNextScene: boolean }>`
  background: url("assets/images/backgroundprimary.png");
  width: 100%;
  height: 100%;
  ${({ canNextScene }) => canNextScene && "cursor: pointer;"}
  video {
    width: 98%;
    height: 98%;
    margin-top: 0.5%;
    margin-left: 1%;
    object-fit: contain;
    object-fit: cover;
    object-position: center;
    border-radius: 10px;
  }
`;

const Retrospacegameadventurevideoscene: RetrospacegameadventurecomicsceneProps =
  (props) => {
    const {
      data: { _actions, video, autoNextScene },
    } = props;
    const { nextScene } = useGameProvider();
    const { getAssetVideo } = useAssets();
    const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
    const refVideo = useRef<HTMLVideoElement>(null);

    const canClickToNextScene = useMemo(
      () => videoLoaded && !autoNextScene,
      [videoLoaded, autoNextScene]
    );

    const handleVideoFinished = useCallback(() => {
      setVideoLoaded(true);
      if (autoNextScene) {
        setTimeout(() => {
          nextScene(_actions[0]._scene);
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

    return (
      <PageComponent>
        <Container
          canNextScene={canClickToNextScene}
          onClick={() => canClickToNextScene && nextScene(_actions[0]._scene)}
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
