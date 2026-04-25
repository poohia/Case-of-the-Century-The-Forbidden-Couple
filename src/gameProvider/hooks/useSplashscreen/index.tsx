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

const SplashscreenGamePromotionContainer = styled.div<{
  show: boolean;
  $showBrowserWarn: boolean;
}>`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  display: ${({ show }) => (show ? "block" : "none")};
  overflow: hidden;
  cursor: ${({ $showBrowserWarn }) =>
    $showBrowserWarn ? "pointer" : "default"};
  video {
    width: 101%;
    height: 101%;
    object-fit: cover;
    object-position: center;
  }
  .mobile-information {
    font-size: 1.4rem;
    animation: blink 1.5s ease-in-out infinite;
    border: none;
    background-color: transparent;
    margin-top: 10px;
    color: white;
    cursor: pointer;
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
`;
let step = 1;
export interface useSplashscreenInterface
  extends
    GameProviderHooksDefaultInterface,
    ReturnType<typeof useSplashscreen> {}

const useSplashscreen = (getEnv: useEnvInterface["getEnvVar"]) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  const SplashscreenBrandComponent: React.FC<{
    haveVideoSplash: boolean;
    loadedGame: boolean;
    platform: Platform;
    onSplashscreenBrandFinished: () => void;
  }> = ({
    haveVideoSplash,
    platform,
    loadedGame,
    onSplashscreenBrandFinished,
  }) => {
    const [showBrowserWarn, setShowBrowserWarn] = useState<boolean>(false);

    const click = useButtonHandleClick();

    useEffect(() => {
      if (loadedGame && !haveVideoSplash) {
        const timeout = setTimeout(() => {
          if (!platform.includes("browser")) {
            onSplashscreenBrandFinished();
          } else {
            setShowBrowserWarn(true);
          }
        }, 500);
        return () => {
          clearTimeout(timeout);
        };
      }
    }, [platform, loadedGame, haveVideoSplash]);

    return (
      <SplashscreenBrandContainer
        aria-labelledby={
          loadedGame ? "splashscreen_warn_browser" : "splashscreen_loading"
        }
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
        aria-live="polite"
      >
        <div aria-hidden="true">
          <img src={splashscreen.brandImage} alt="" />
        </div>
        <div aria-hidden="true">
          <span>{splashscreen.brandSlogan}</span>
        </div>
        {!loadedGame && (
          <TranslationComponent id="splashscreen_loading" srOnly />
        )}
        {showBrowserWarn && !haveVideoSplash && (
          <button className="mobile-information animate__animated animate__flash animate__infinite">
            <TranslationComponent id="splashscreen_warn_browser" />
          </button>
        )}
      </SplashscreenBrandContainer>
    );
  };

  const SplashscreenGamePromotion: React.FC<{
    loadedGame: boolean;
    source: string;
    show: boolean;
    platform: Platform;
    onVideoLoaded: () => void;
    onVideoFinished: () => void;
  }> = ({
    source,
    show,
    loadedGame,
    platform,
    onVideoLoaded,
    onVideoFinished,
  }) => {
    const refVideo = useRef<HTMLVideoElement>(null);
    const [showBrowserWarn, setShowBrowserWarn] = useState<boolean>(false);
    const [videoEnded, setVideoEnded] = useState<boolean>(false);

    const click = useButtonHandleClick();

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

    useEffect(() => {
      if (loadedGame && videoEnded) {
        if (!platform.includes("browser")) {
          setTimeout(() => onVideoFinished(), 700);
        } else {
          setShowBrowserWarn(true);
        }
      }
    }, [loadedGame, platform, videoEnded]);

    return (
      <SplashscreenGamePromotionContainer
        show={show}
        $showBrowserWarn={showBrowserWarn}
        onClick={(event) => {
          if (showBrowserWarn) {
            click(event, {
              callback: () => {
                onVideoFinished();
              },
            });
          }
        }}
      >
        <VideoComponent
          onEnded={() => {
            setVideoEnded(true);
          }}
          ref={refVideo}
          autoPlay={false}
          muted
          src={source}
        />
        {showBrowserWarn && (
          <button className="mobile-information animate__animated animate__flash animate__infinite">
            <TranslationComponent id="splashscreen_warn_browser" />
          </button>
        )}
      </SplashscreenGamePromotionContainer>
    );
  };

  const SplashScreenComponent: React.FC<{
    loadedGame: boolean;
    platform: Platform;
  }> = ({ loadedGame, platform }) => {
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

    return (
      <div>
        {step === 1 && (
          <SplashscreenBrandComponent
            haveVideoSplash={!!videoSource}
            loadedGame={loadedGame}
            platform={platform}
            onSplashscreenBrandFinished={onSplashscreenFinished}
          />
        )}
        {videoSource && (
          <SplashscreenGamePromotion
            loadedGame={loadedGame}
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
  };
};

export default useSplashscreen;
