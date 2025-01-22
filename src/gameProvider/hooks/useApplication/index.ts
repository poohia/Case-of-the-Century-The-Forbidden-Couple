import { useCallback, useEffect, useMemo, useState } from "react";
import { Device } from "@capacitor/device";
import { GameProviderHooksDefaultInterface } from "..";
import { ConfigApplication, Platform } from "../../../types";
import config from "../../../config.json";

export interface useApplicationInterface
  extends GameProviderHooksDefaultInterface,
    ReturnType<typeof useApplication> {}

const useApplication = (splashscreenLoaded: boolean) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [backgroundColor, setBackgroundColor] = useState<string>(
    "radial-gradient(circle,rgba(77,79,82,1) 0%,rgba(68,70,74,1) 35%)"
  );
  const [primaryFont, setPrimaryFont] = useState<string>("auto");
  const isMobileDevice = useMemo(
    () =>
      platform === "android" ||
      platform === "ios" ||
      platform === "browserandroid" ||
      platform === "browserios",
    [platform]
  );
  const appConfig = useMemo(
    (): ConfigApplication => config as ConfigApplication,
    []
  );

  const detectBrowserPlatform = useCallback((): Platform => {
    const { userAgent } = navigator;
    if (/Android/i.test(userAgent)) {
      return "browserandroid";
    }
    if (/iPhone|iPad|iPod/i.test(userAgent)) {
      return "browserios";
    }
    // @todo electron
    return "browser";
  }, []);

  const detectPlatform = useCallback(() => {
    return Device.getInfo().then((value) => {
      const p = value.platform;
      switch (p) {
        case "android":
          setPlatform("android");
          break;
        case "ios":
          setPlatform("ios");
          break;
        case "web":
          setPlatform(detectBrowserPlatform());
          break;
      }
      return Promise.resolve();
    });
  }, [detectBrowserPlatform]);

  const updateInnerSize = useCallback(() => {
    const { innerWidth: ww, innerHeight: wh } = window;
    setInnerWidth(ww);
    setInnerHeight(wh);

    console.log(ww, wh);
  }, []);

  useEffect(() => {
    detectPlatform().then(() => {
      setLoaded(true);
    });
  }, [detectPlatform]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      detectPlatform();
    });
  }, [detectPlatform]);

  useEffect(() => {
    if (
      splashscreenLoaded &&
      platform &&
      (platform.includes("browser") || platform === "electron")
    ) {
      window.addEventListener("resize", updateInnerSize);
      return () => {
        window.removeEventListener("resize", updateInnerSize);
      };
    }
  }, [platform, splashscreenLoaded, updateInnerSize]);

  return {
    platform,
    backgroundColor,
    primaryFont,
    loaded,
    isMobileDevice,
    innerWidth,
    innerHeight,
    appConfig,
    setBackgroundColor,
    setPrimaryFont,
  };
};

export default useApplication;
