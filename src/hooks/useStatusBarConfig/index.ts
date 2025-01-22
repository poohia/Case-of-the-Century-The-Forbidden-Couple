import { useCallback, useEffect } from "react";
import { StatusBar, Style } from "@capacitor/status-bar";

import config from "../../config.json";

const useStatusBarConfig = () => {
  const configStatusBar = useCallback(() => {
    const {
      statusbar: {
        show: showConfig,
        overlaysWebView: overlaysWebViewConfig,
        backgroundColor: backgroundColorConfig,
        contentStyle: contentStyleConfig,
      },
      fullscreen: fullScreenConfig,
    } = config;
    if (fullScreenConfig) {
      StatusBar.setOverlaysWebView({ overlay: true });
      StatusBar.hide();
      return;
    }
    if (showConfig) {
      StatusBar.show();
    } else {
      StatusBar.hide();
    }
    StatusBar.setOverlaysWebView({ overlay: overlaysWebViewConfig });
    StatusBar.setBackgroundColor({ color: backgroundColorConfig });
    switch (contentStyleConfig) {
      case "lightContent":
        StatusBar.setStyle({ style: Style.Light });
        break;
      case "default":
      default:
        StatusBar.setStyle({ style: Style.Default });
        break;
    }
  }, []);

  useEffect(() => {
    configStatusBar();
  }, [configStatusBar]);
};

export default useStatusBarConfig;
