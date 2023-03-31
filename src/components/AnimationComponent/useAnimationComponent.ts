import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import animationReducer, {
  AnimationReducerActionData,
  animationDefaultState,
} from "./animationReducer";
import { useGameProvider } from "../../gameProvider";
import { useAssets } from "../../hooks";
import { AnimationComponentProps } from ".";
import { AnimationType, AtlasType } from "./types";
import useSprite from "./useSprite";

const useAnimationComponent = (props: AnimationComponentProps) => {
  /**  */
  const { imageFile, atlasFile, animationFile, animationName } = props;
  /**  */
  const [state, dispatch] = useReducer(animationReducer, animationDefaultState);
  const { loaded, imgLoaded, parentSize, objectPosition, objectSize, nbLoop } =
    state;
  /** */
  const { innerWidth, innerHeight } = useGameProvider();
  const { getAssetImg, getConfigurationFile } = useAssets();

  /**  */
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  /** */
  const image = useMemo(() => {
    const img = new Image();
    img.src = getAssetImg(imageFile);
    return img;
  }, []);
  const atlas = useMemo(() => getConfigurationFile<AtlasType>(atlasFile), []);
  const animations = useMemo(
    () => getConfigurationFile<AnimationType>(animationFile),
    []
  );
  const animation = useMemo(
    () => animations.anims.find((a) => a.key === animationName),
    [animations]
  );

  const { currentFrame, isLastPosition, nextFrame } = useSprite(
    atlas,
    animation?.frames
  );

  const updateParentSize = useCallback(() => {
    if (parentRef.current) {
      const { clientWidth, clientHeight } = parentRef.current;
      dispatch({
        type: "parentSize",
        data: {
          w: clientWidth,
          h: clientHeight,
        } as AnimationReducerActionData,
      });
    }
  }, [parentRef]);

  useEffect(() => {
    updateParentSize();
  }, [parentRef]);

  useEffect(() => {
    updateParentSize();
  }, [innerWidth, innerHeight]);

  useEffect(() => {
    const dispatchImgLoaded = () => {
      dispatch({ type: "imgLoaded" });
    };
    if (image.complete) {
      dispatchImgLoaded();
    } else {
      image.addEventListener("load", dispatchImgLoaded);
      return () => {
        image.removeEventListener("load", dispatchImgLoaded);
      };
    }
  }, []);

  useEffect(() => {
    if (canvasRef.current && loaded) {
      const ctx = canvasRef.current.getContext("2d");
      ctx?.clearRect(0, 0, parentSize.w, parentSize.h);
      const pw = parentSize.w > objectSize.w ? objectSize.w : parentSize.w;
      const ph = parentSize.h > objectSize.h ? objectSize.h : parentSize.h;
      ctx?.drawImage(
        image,
        objectPosition.x,
        objectPosition.y,
        objectSize.w,
        objectSize.h,
        0,
        0,
        pw,
        ph
      );
    }
  }, [canvasRef, objectPosition, objectSize, loaded, parentSize]);

  useEffect(() => {
    if (currentFrame !== null) {
      dispatch({
        type: "objectPosition",
        data: {
          x: currentFrame.x,
          y: currentFrame.y,
        } as AnimationReducerActionData,
      });
      dispatch({
        type: "objectSize",
        data: {
          w: currentFrame.w,
          h: currentFrame.h,
        } as AnimationReducerActionData,
      });
    }
  }, [currentFrame]);

  useEffect(() => {
    if (
      imgLoaded &&
      parentSize &&
      objectPosition.x !== -1 &&
      objectSize.w !== 0
    ) {
      dispatch({ type: "loaded" });
    }
  }, [imgLoaded, parentSize, objectPosition, objectSize]);

  // first animation
  useEffect(() => {
    if (loaded && animation) {
      setTimeout(() => nextFrame(), 1000 / animation.frameRate);
    }
  }, [loaded, animation]);
  // if repeat === -1 or repeat >= nbLoop
  useEffect(() => {
    if (loaded && animation) {
      if (animation.repeat === -1 || animation.repeat >= nbLoop) {
        setTimeout(() => nextFrame(), 1000 / animation.frameRate);
      }
    }
  }, [currentFrame]);

  return {
    loaded,
    parentSize,
    canvasRef,
    parentRef,
  };
};

export default useAnimationComponent;
