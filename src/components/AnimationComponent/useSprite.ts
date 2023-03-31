import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AnimationTypeAnimsFrame,
  AtlasType,
  AtlasTypeFrameFrame,
} from "./types";

const useSprite = (
  atlas: AtlasType,
  frames: AnimationTypeAnimsFrame[] | undefined
) => {
  const [position, setPosition] = useState<number>(0);
  const [frameObject, setFrameObject] = useState<AtlasTypeFrameFrame[]>([]);

  const currentFrame = useMemo(() => {
    if (frameObject.length === 0) {
      return null;
    }
    return frameObject[position] || null;
  }, [position, frameObject]);

  const nextFrame = useCallback(() => {
    let nextPosition = position + 1;
    if (nextPosition > frameObject.length - 1) {
      setPosition(0);
    } else {
      setPosition(nextPosition);
    }
  }, [position, frameObject]);

  useEffect(() => {
    if (!frames) {
      console.warn("Frames not found");
    }
    let fo: AtlasTypeFrameFrame[] = [];
    frames?.forEach((frame) => {
      const frameFind = atlas.frames.find((f) => f.filename === frame.frame);
      if (frameFind) {
        fo.push(frameFind.frame);
      }
    });
    setFrameObject(fo);
  }, []);

  return { currentFrame, nextFrame };
};

export default useSprite;
