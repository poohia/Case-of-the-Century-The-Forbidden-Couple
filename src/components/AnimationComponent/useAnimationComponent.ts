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
import { AnimationProps } from ".";
import { AnimationType, AtlasType } from "./types";
import useSprite from "./useSprite";

const useAnimationComponent = (props: AnimationProps) => {
  /**  */
  const {
    imageFile,
    atlasFile,
    animationFile,
    animationName,
    responsive,
    center,
  } = props;
  /**  */
  const [state, dispatch] = useReducer(animationReducer, animationDefaultState);
  const { loaded, imgLoaded, parentSize, objectPosition, objectSize } = state;
  const [_, setNbLoop] = useState<number>(0);
  const [timeoutState, setTimeoutState] = useState<any>(null);
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
    [animations, animationName]
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

  // update parent size if ref is charged
  useEffect(() => {
    updateParentSize();
  }, [parentRef]);
  // update parent size on resize window
  useEffect(() => {
    updateParentSize();
  }, [innerWidth, innerHeight]);
  // check img loaded
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
  // draw image
  useEffect(() => {
    if (canvasRef.current && loaded) {
      const ctx = canvasRef.current.getContext("2d");
      ctx?.clearRect(0, 0, parentSize.w, parentSize.h);
      // const pw = parentSize.w > objectSize.w ? objectSize.w : parentSize.w;
      // const ph = parentSize.h > objectSize.h ? objectSize.h : parentSize.h;
      const pw = responsive
        ? parentSize.w
        : parentSize.w > objectSize.w
        ? objectSize.w
        : parentSize.w;
      const ph = responsive
        ? parentSize.h
        : parentSize.h > objectSize.h
        ? objectSize.h
        : parentSize.h;

      ctx?.drawImage(
        image,
        objectPosition.x,
        objectPosition.y,
        objectSize.w,
        objectSize.h,
        center ? (parentSize.w - pw) / 2 : 0,
        center ? (parentSize.h - ph) / 2 : 0,
        pw,
        ph
      );
    }
  }, [canvasRef, objectPosition, loaded, parentSize, objectSize]);

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

    // if (animationName === "damage_animation") {
    //   console.log(currentFrame);
    // }
  }, [currentFrame]);
  // if all is charged
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

  useEffect(() => {
    if (loaded && animation && timeoutState === null) {
      const t = setTimeout(() => {
        setTimeoutState(null);
        setNbLoop((nbLoop) => {
          if (animation.repeat === -1 || animation.repeat >= nbLoop) {
            nextFrame();
          }
          return nbLoop;
        });
      }, 1000 / animation.frameRate);
      setTimeoutState(t);
    }
  }, [loaded, currentFrame]);

  useEffect(() => {
    if (isLastPosition) {
      setNbLoop((l) => l + 1);
    }
  }, [isLastPosition]);

  useEffect(() => {
    if (timeoutState) {
      clearTimeout(timeoutState);
      setTimeoutState(null);
    }
    setNbLoop(0);
  }, [animationName]);

  return {
    loaded,
    parentSize,
    canvasRef,
    parentRef,
  };
};

export default useAnimationComponent;
