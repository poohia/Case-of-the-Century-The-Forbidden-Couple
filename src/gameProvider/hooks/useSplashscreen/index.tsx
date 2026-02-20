import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

import { GameProviderHooksDefaultInterface } from "..";
import { useEnvInterface } from "../useEnv";
import splashscreen from "../../../GameDevSoftware/splashscreen.json";
import VideoComponent from "../../../components/VideoComponent";

const SplashscreenBrandContainer = styled.div`
  background-color: ${({ theme }) =>
    theme.default?.splashscreen_background ?? "#2b2b2b"};
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow: hidden;
  > div {
    &:nth-child(1) {
      margin-bottom: 10px;
    }
    &:nth-child(2) {
      span {
        font-size: 2rem;
      }
    }
  }
`;

const SplashscreenGamePromotionContainer = styled.div<{ show: boolean }>`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  display: ${({ show }) => (show ? "block" : "none")};
  overflow: hidden;
  video {
    width: 101%;
    height: 101%;
    object-fit: cover;
    object-position: center;
  }
`;
let step = 1;
export interface useSplashscreenInterface
  extends
    GameProviderHooksDefaultInterface,
    ReturnType<typeof useSplashscreen> {}

const useSplashscreen = (getEnv: useEnvInterface["getEnvVar"]) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  const showSplashscreen = useCallback((show: boolean) => {
    setLoaded(!show);
  }, []);

  const SplashscreenBrandComponent: React.FC = () => {
    return (
      <SplashscreenBrandContainer>
        <div>
          <img src={splashscreen.brandImage} alt="" />
        </div>
        <div>
          <span>{splashscreen.brandSlogan}</span>
        </div>
      </SplashscreenBrandContainer>
    );
  };

  const SplashscreenGamePromotion: React.FC<{
    source: string;
    show: boolean;
    onVideoLoaded: () => void;
    onVideoFinished: () => void;
  }> = ({ source, show, onVideoLoaded, onVideoFinished }) => {
    const refVideo = useRef<HTMLVideoElement>(null);

    useEffect(() => {
      if (refVideo.current) {
        setTimeout(() => {
          if (refVideo.current) {
            onVideoLoaded();
            refVideo.current.play();
            refVideo.current.playbackRate = 2.0;
          }
        }, 1500);
      }
    }, [refVideo, onVideoLoaded]);

    return (
      <SplashscreenGamePromotionContainer show={show}>
        <VideoComponent
          onEnded={() => {
            setTimeout(() => onVideoFinished(), 700);
          }}
          ref={refVideo}
          autoPlay={false}
          muted
          src={source}
        />
      </SplashscreenGamePromotionContainer>
    );
  };

  const SplashScreenComponent: React.FC<{
    onSplashscreenFinished: () => void;
  }> = ({ onSplashscreenFinished }) => {
    const [_, setReload] = useState(false);

    const videoSource = useMemo(() => {
      if (!splashscreen.gamePromotionVideo) {
        return null;
      }
      return `assets/videos/${splashscreen.gamePromotionVideo.replace("@a:", "")}`;
    }, []);

    useEffect(() => {
      if (getEnv<boolean>("IGNORE_SPLASHSCREEN")) {
        setLoaded(true);
      }
    }, []);

    useEffect(() => {
      if (videoSource === null) {
        setTimeout(() => {
          onSplashscreenFinished();
        }, 1400);
      }
    }, []);

    return (
      <div>
        {step === 1 && <SplashscreenBrandComponent />}
        {videoSource && (
          <SplashscreenGamePromotion
            source={videoSource}
            show={step === 2}
            onVideoLoaded={() => {
              step = 2;
              setReload(true);
            }}
            onVideoFinished={onSplashscreenFinished}
          />
        )}
      </div>
    );
  };

  return {
    loaded,
    SplashScreenComponent,
    showSplashscreen,
  };
};

export default useSplashscreen;
