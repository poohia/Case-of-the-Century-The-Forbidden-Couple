import { useCallback, useEffect, useState } from "react";
import { GameProviderHooksDefaultInterface } from "..";
import AppWrapper from "../../../AppWrapper";

export interface useSplashscreenInterface
  extends GameProviderHooksDefaultInterface {
  SplashScreenComponent: React.FC<{
    onSplashscreenFinished: () => void;
  }>;
  showSplashscreen: (show: boolean) => void;
}

const useSplashscreen = (): useSplashscreenInterface => {
  const [loaded, setLoaded] = useState<boolean>(false);

  const showSplashscreen = useCallback((show: boolean) => {
    setLoaded(!show);
  }, []);

  const SplashScreenComponent: React.FC<{
    onSplashscreenFinished: () => void;
  }> = ({ onSplashscreenFinished }) => {
    useEffect(() => {
      setTimeout(() => {
        onSplashscreenFinished();
      }, 4000);
    }, []);
    return (
      <AppWrapper>
        <div>
          <div>Loading...</div>
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
