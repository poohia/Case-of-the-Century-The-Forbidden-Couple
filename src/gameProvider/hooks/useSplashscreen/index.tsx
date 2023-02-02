import { useCallback, useEffect, useRef, useState } from "react";
import { GameProviderHooksDefaultInterface } from "..";
import AppWrapper from "../../../AppWrapper";
import styled from "styled-components";
import { useEnvInterface } from "../useEnv";
import splashscreen from "../../../GameDevSoftware/splashscreen.json";

const SplashscreenBrandContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: fadein 1s;
  -moz-animation: fadein 1s;
  -webkit-animation: fadein 1s;
  -o-animation: fadein 1s;
  height: 100%;
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
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

export interface useSplashscreenInterface
  extends GameProviderHooksDefaultInterface {
  SplashScreenComponent: React.FC<{
    onSplashscreenFinished: () => void;
  }>;
  showSplashscreen: (show: boolean) => void;
}

const useSplashscreen = (
  getEnv: useEnvInterface["getEnvVar"]
): useSplashscreenInterface => {
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
    show: boolean;
    onVideoLoaded: () => void;
    onVideoFinished: () => void;
  }> = ({ show, onVideoLoaded, onVideoFinished }) => {
    const refVideo = useRef<HTMLVideoElement>(null);

    useEffect(() => {
      if (refVideo.current) {
        setTimeout(() => {
          onVideoLoaded();
          refVideo.current?.play();
        }, 1500);
      }
    }, [refVideo, onVideoLoaded]);

    return (
      <SplashscreenGamePromotionContainer show={show}>
        <video
          onEnded={() => {
            setTimeout(() => onVideoFinished(), 700);
          }}
          preload="auto"
          ref={refVideo}
          autoPlay={false}
          playsInline
          muted
        >
          <source src={splashscreen.gamePromotionVideo} typeof="video/mp4" />
        </video>
      </SplashscreenGamePromotionContainer>
    );
  };

  const SplashScreenComponent: React.FC<{
    onSplashscreenFinished: () => void;
  }> = ({ onSplashscreenFinished }) => {
    const [step, setStep] = useState<1 | 2>(1);

    useEffect(() => {
      const showFullSplashscreen = getEnv<boolean>("SHOW_FULL_SPLASHSCREEN");
      if (showFullSplashscreen === false) {
        setLoaded(true);
      }
    }, []);

    return (
      <AppWrapper>
        <div>
          {step === 1 && <SplashscreenBrandComponent />}
          <SplashscreenGamePromotion
            show={step === 2}
            onVideoLoaded={() => setStep(2)}
            onVideoFinished={onSplashscreenFinished}
          />
        </div>
      </AppWrapper>
    );
  };

  return {
    loaded,
    showSplashscreen,
    SplashScreenComponent,
  };
};

export default useSplashscreen;
