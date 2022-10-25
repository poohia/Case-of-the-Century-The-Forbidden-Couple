import CordovaConfig from "./config.interface";

const config: CordovaConfig = {
  name: "GameDevSoftwareTarget",
  build: {
    version: "1.0.0",
    id: "com.joazco.gamedevsoftwaretarget",
    android: {
      versionCode: "1",
    },
    ios: {
      CFBundleVersion: "1",
    },
  },
  author: {
    email: "jazoulay@joazco.com",
    link: "https://joazco.com",
    name: "Jordan AZOULAY",
  },
  fullscreen: true,
  statusbar: {
    show: true,
    backgroundColor: "#ffffff",
    overlaysWebView: true,
    contentStyle: "default",
  },
  screenOrientation: "landscape",
  splashscreen: {
    fadeSplashscreen: true,
    fadeSplashscreenDuration: 500,
    splashscreenDelay: 3000,
  },
};

export default config;
