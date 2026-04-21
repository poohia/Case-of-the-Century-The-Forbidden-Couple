import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

import { GameProviderHooksDefaultInterface } from "..";
import { useEnvInterface } from "../useEnv";
import splashscreen from "../../../GameDevSoftware/splashscreen.json";
import VideoComponent from "../../../components/VideoComponent";
import { TranslationComponent } from "../../../components";
import { Platform } from "../../../types";
import { useButtonHandleClick } from "../../../hooks";

const SplashscreenBrandContainer = styled.section<{
  $showBrowserWarn: boolean;
}>`
  background-color: ${({ theme }) =>
    theme.default?.splashscreen_background ?? "#2b2b2b"};
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow: hidden;
  cursor: ${({ $showBrowserWarn }) =>
    $showBrowserWarn ? "pointer" : "default"};
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
  .mobile-information {
    font-size: 1.4rem;
    animation: blink 1.5s ease-in-out infinite;
    border: none;
    background-color: transparent;
    margin-top: 10px;
    color: white;
    cursor: pointer;
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

  const SplashscreenBrandComponent: React.FC<{
    platform: Platform;
    onSplashscreenBrandFinished: () => void;
  }> = ({ platform, onSplashscreenBrandFinished }) => {
    const [showBrowserWarn, setShowBrowserWarn] = useState<boolean>(false);

    const click = useButtonHandleClick();

    useEffect(() => {
      const timeout = setTimeout(() => {
        if (!platform.includes("browser")) {
          onSplashscreenBrandFinished();
        } else {
          setShowBrowserWarn(true);
        }
      }, 1400);
      return () => {
        clearTimeout(timeout);
      };
    }, [platform]);

    return (
      <SplashscreenBrandContainer
        aria-labelledby="splashscreen_loading"
        $showBrowserWarn={showBrowserWarn}
        onClick={(event) => {
          if (showBrowserWarn) {
            click(event, {
              callback: () => {
                onSplashscreenBrandFinished();
              },
            });
          }
        }}
      >
        <div aria-hidden="true">
          <img src={splashscreen.brandImage} alt="" />
        </div>
        <div aria-hidden="true">
          <span>{splashscreen.brandSlogan}</span>
        </div>
        <TranslationComponent id="splashscreen_loading" srOnly />
        {showBrowserWarn && (
          <button className="mobile-information animate__animated animate__flash animate__infinite">
            <TranslationComponent id="splashscreen_warn_browser" />
          </button>
        )}
      </SplashscreenBrandContainer>
    );
  };

  const SplashscreenGamePromotion: React.FC<{
    source: string;
    show: boolean;
    platform: Platform;
    onVideoLoaded: () => void;
    onVideoFinished: () => void;
  }> = ({ source, show, platform, onVideoLoaded, onVideoFinished }) => {
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
    platform: Platform;
  }> = ({ platform }) => {
    const [_, setReload] = useState(false);

    const videoSource = useMemo(() => {
      if (!splashscreen.gamePromotionVideo) {
        return null;
      }
      return `assets/videos/${splashscreen.gamePromotionVideo.replace("@a:", "")}`;
    }, []);

    const onSplashscreenFinished = useCallback(() => {
      setLoaded(true);
    }, []);

    useEffect(() => {
      if (getEnv<boolean>("IGNORE_SPLASHSCREEN")) {
        setLoaded(true);
      }
    }, []);

    useEffect(() => {
      if (videoSource === null) {
        setTimeout(() => {
          // onSplashscreenFinished();
        }, 1400);
      }
    }, []);

    return (
      <div>
        {step === 1 && (
          <SplashscreenBrandComponent
            platform={platform}
            onSplashscreenBrandFinished={onSplashscreenFinished}
          />
        )}
        {videoSource && (
          <SplashscreenGamePromotion
            source={videoSource}
            show={step === 2}
            platform={platform}
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
