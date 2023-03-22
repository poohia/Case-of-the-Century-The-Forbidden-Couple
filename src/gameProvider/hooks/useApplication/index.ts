import { useCallback, useEffect, useMemo, useState } from "react";

import { GameProviderHooksDefaultInterface } from "..";
import useDevice from "@awesome-cordova-library/device/lib/react";
import useScreenOrientation from "@awesome-cordova-library/screen-orientation/lib/react";
import { Platform } from "../../../types";

export interface useApplicationInterface
  extends GameProviderHooksDefaultInterface {
  platform: Platform | null;
  screenorientation: OrientationLockType;
  backgroundColor: string;
  isMobileDevice: boolean;
  innerWidth: number;
  innerHeight: number;
  setBackgroundColor: (backgroundColor: string) => void;
}

const useApplication = (): useApplicationInterface => {
  const { getPlatform } = useDevice();
  const { currentOrientation } = useScreenOrientation();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [screenorientation, setScreenOrientation] = useState(
    currentOrientation()
  );
  const [backgroundColor, setBackgroundColor] = useState<string>(
    "radial-gradient(circle,rgba(77,79,82,1) 0%,rgba(68,70,74,1) 35%)"
  );
  const isMobileDevice = useMemo(
    () =>
      platform === "android" ||
      platform === "ios" ||
      platform === "browserandroid" ||
      platform === "browserios",
    [platform]
  );

  const detectBrowserPlatform = useCallback((): Platform => {
    const { userAgent } = navigator;
    if (/Android/i.test(userAgent)) {
      return "browserandroid";
    }
    if (/iPhone|iPad|iPod/i.test(userAgent)) {
      return "browserios";
    }
    return "browser";
  }, []);

  const detectPlatform = useCallback(() => {
    const p = getPlatform();
    switch (p) {
      case "Android":
        setPlatform("android");
        break;
      case "iOS":
        setPlatform("ios");
        break;
      case "browser":
        setPlatform(detectBrowserPlatform());
        break;
      case "Mac OS X":
      case "WinCE":
      default:
        setPlatform("electron");
    }
  }, [getPlatform, detectBrowserPlatform]);

  const updateInnerSize = useCallback(() => {
    const { innerWidth, innerHeight } = window;
    setInnerWidth(innerWidth);
    setInnerHeight(innerHeight);
  }, []);

  useEffect(() => {
    detectPlatform();
    setLoaded(true);
  }, [detectPlatform]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      detectPlatform();
      setScreenOrientation(currentOrientation());
    });
  }, [detectPlatform, currentOrientation]);

  useEffect(() => {
    if (platform === "browserandroid" || platform === "browserios") {
      const scrollView = () => {
        setTimeout(function () {
          // alert("i'm here");
          // // This hides the address bar:
          // window.scrollTo(0, 1);
          // const elem = document.documentElement;
          // if (elem.requestFullscreen) {
          //   elem.requestFullscreen();
          // }
        }, 2000);
      };
      scrollView();
      window.addEventListener("load", scrollView);
    }
  }, [platform]);

  useEffect(() => {
    if (platform && (platform.includes("browser") || platform === "electron")) {
      window.addEventListener("resize", updateInnerSize);
      return () => {
        window.removeEventListener("resize", updateInnerSize);
      };
    }
  }, [platform, updateInnerSize]);

  console.log(innerWidth, innerHeight);

  return {
    platform,
    screenorientation,
    backgroundColor,
    loaded,
    isMobileDevice,
    innerWidth,
    innerHeight,
    setBackgroundColor,
  };
};

export default useApplication;
