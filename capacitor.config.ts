import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.joazco.comicspacegame',
  appName: 'Comic Space Game',
  webDir: 'build',
  cordova: {
    preferences: {
      AutoHideSplashScreen: 'true',
      SplashScreenDelay: '0',
      FadeSplashScreen: 'true',
      FadeSplashScreenDuration: '0',
      AllowInlineMediaPlayback: 'true'
    }
  }
};

export default config;
