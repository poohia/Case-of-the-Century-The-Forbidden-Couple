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
  _title: string;
  _scene: string;
};
export type SceneObject<T = {}> = T & {
  _id: number;
  _type: string;
  _title: string;
  _actions: ActionOfScene[];
  _module: string;
};
export type SceneComponentProps<T = {}, P = {}> = React.FC<
  T & {
    data: SceneObject<P>;
  }
>;
export type EnvType = "development" | "production";
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
