import { ObjectPosition, ObjectSize } from "./types";

export type AnimationReducerState = {
  loaded: boolean;
  imgLoaded: boolean;
  objectSize: ObjectSize;
  objectPosition: ObjectPosition;
  parentSize: ObjectSize;
};

export const animationDefaultState: AnimationReducerState = {
  imgLoaded: false,
  loaded: false,
  objectPosition: { x: -1, y: -1 },
  objectSize: { w: 0, h: 0 },
  parentSize: { h: 0, w: 0 },
};

export interface AnimationReducerActionData {
  x: number;
  y: number;
}
export interface AnimationReducerActionData {
  h: number;
  w: number;
}
export interface AnimationReducerActionData {
  timer: NodeJS.Timeout;
}

export type AnimationReducerActionType = keyof AnimationReducerState;

export type AnimationReducerAction = {
  type: AnimationReducerActionType;
  data?: AnimationReducerActionData;
};

const animationReducer = (
  state: AnimationReducerState,
  action: AnimationReducerAction
): AnimationReducerState => {
  const { data, type } = action;
  switch (type) {
    case "loaded":
      return { ...state, loaded: true };
    case "parentSize":
      if (data?.h && data.w) {
        return {
          ...state,
          parentSize: {
            h: data.h,
            w: data.w,
          },
        };
      }
      return state;
    case "objectSize":
      if (data?.w && data.h) {
        return { ...state, objectSize: { h: data.h, w: data.w } };
      }
      return state;
    case "objectPosition":
      if (typeof data?.x !== "undefined" && typeof data.y !== "undefined") {
        return {
          ...state,
          objectPosition: { x: data.x, y: data.y },
        };
      }
      return state;
    case "imgLoaded":
      return { ...state, imgLoaded: true };
    default:
      return state;
  }
};

export default animationReducer;
