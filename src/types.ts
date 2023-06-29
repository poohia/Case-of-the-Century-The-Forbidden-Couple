import React from "react";

export type AssertAcceptedType = "image" | "sound" | "video" | "json";
export type ConstantValue = string | number | string[] | number[];
export type ConstantObject = {
  key: string;
  value: ConstantValue;
  description?: string;
};

export type Route = "home" | "parameters" | "scene";
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
export type SceneObject<T = {}> = T & {
  _id: number;
  _type: string;
  _title: string;
  _actions?: ActionOfScene[];
  _module: string;
  _music?: string;
  _font?: string;
};
export type SceneComponentProps<T = {}, P = {}> = React.FC<
  T & {
    data: SceneObject<P>;
  }
>;
export type EnvType = typeof process.env.NODE_ENV;
export type GameDatabase = {
  currentScene: number;
  sceneVisited: number[];
  history: number[];
  [key: string]: any;
};
export type ParametersType = {
  activedSound: boolean;
  activatedVibration: boolean;
  locale?: string | null;
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
};
