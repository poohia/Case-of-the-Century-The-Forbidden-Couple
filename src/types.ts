import { OrientationLockType } from "@capacitor/screen-orientation";
import React from "react";

export type AssertAcceptedType = "image" | "sound" | "video" | "json";
export type ConstantValue = string | number | string[] | number[];
export type ConstantObject = {
  key: string;
  value: ConstantValue;
  valueMobile?: ConstantValue | null;
  description?: string;
  editable?: boolean;
  deletable?: boolean;
  module?: string;
};
export type Route =
  | "home"
  | "parameters"
  | "scene"
  | "saves"
  | "endDemo"
  | "credits";
export interface ParamsRoute {
  backRoute?: Route;
}
export interface ParamsRoute {
  sceneId?: number;
}
export type ObjectGameTypeJSON = {
  file: string;
  type: string;
};
export type SceneTypeJSON = ObjectGameTypeJSON & {
  module: string;
};
export type ActionOfScene = {
  [key: string]: any;
  _title?: string;
  _scene: string;
};
export type SceneList = {
  file: string;
  type: string;
  module: string;
  firstScene?: boolean;
}[];
export type SceneObject<T = {}> = T & {
  [key: string]: any;
  _id: number;
  _type: string;
  _title: string;
  _module: string;
  _actions: ActionOfScene[];
  _release_sounds?: string[];
};
export type SceneComponentProps<T = {}, P = {}> = React.FC<
  T & {
    data: SceneObject<P>;
  }
>;
export type EnvType = typeof process.env.NODE_ENV;
export type GameDatabase = {
  currentScene: number;
  history: number[];
  [key: string]: any;
};
export type GameDatabaseSave = {
  title?: string;
  date: string;
  game: GameDatabase;
  id: number;
  isPreset?: boolean;
};
export type ParametersType = {
  activatedMusic: number;
  activatedSoundsEffect: number;
  activatedVibration: boolean;
  activatedDyslexia: boolean;
  sizeText?: SizeTextTypes;
  colorMode?: ColorModeTypes;
  instantTextReveal?: boolean;
  locale?: string | null;
  [key: string]: any;
};
export type Platform =
  | "browser"
  | "android"
  | "ios"
  | "browserandroid"
  | "browserios"
  | "electron";

export type TutorialViewType = {
  title: string;
  image: string;
  text: string;
  isVideo?: boolean;
  action?: { text: string; callback: () => void };
};

export type ConfigApplication = {
  name: string;
  description: string;
  playStore: string;
  appStore: string;
  webStore: string;
  build: {
    version: string;
    id: string;
    android: { versionCode: string };
    ios: { CFBundleVersion: string };
  };
  author: {
    email: string;
    link: string;
    name: string;
  };
  fullscreen: boolean;
  statusbar: {
    show: boolean;
    backgroundColor: string;
    overlaysWebView: boolean;
    contentStyle: "default" | "lightcontent";
  };
  screenOrientation: OrientationLockType;
  splashscreen: {
    fadeSplashscreen: boolean;
    fadeSplashscreenDuration: number;
    splashscreenDelay: number;
  };
  background?: string;
  fontFamily?: string;
  holidaysOverlay: {
    christmas: boolean;
    halloween: boolean;
  };
};
export type FontObject = {
  key: string;
  file: string;
  format: string;
};
export type SizeTextTypes = "small" | "normal" | "tall";
export type ColorModeTypes =
  | "normal"
  | "protanopia"
  | "deuteranopia"
  | "tritanopia"
  | "achromatopsia"
  | "high-contrast";
