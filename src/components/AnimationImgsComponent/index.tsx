import { useEffect, useMemo, useRef, useState } from "react";

import ImgComponent from "../ImgComponent";
import ImgBackgroundComponent from "../ImgBackgroundComponent";
import { useCache } from "../../hooks";

type AnimationImgsComponentProps = {
  imgs: string[];
  imgPerSeconde?: number;
  loop?: boolean;
  reverseOnLoop?: boolean;
  ariaHidden?: boolean;
  forceMaxSize?: boolean;
  imgClassName?: string;
  isBackground?: boolean;
};

const AnimationImgsComponent: React.FC<AnimationImgsComponentProps> = ({
  imgs,
  imgPerSeconde = 1,
  loop = true,
  reverseOnLoop = false,
  ariaHidden,
  forceMaxSize = true,
  imgClassName,
  isBackground = false,
}) => {
  const [i, setI] = useState<number>(0);
  const directionRef = useRef<1 | -1>(1);
  const intervalMs = useMemo(() => {
    return 1000 / Math.max(imgPerSeconde, 1);
  }, [imgPerSeconde]);

  const { fetchCacheAssets } = useCache();

  useEffect(() => {
    if (imgs.length <= 1) {
      setI(0);
      return;
    }
    const timer = setInterval(() => {
      setI((prev) => {
        if (!loop) {
          return Math.min(prev + 1, imgs.length - 1);
        }

        if (reverseOnLoop) {
          const next = prev + directionRef.current;
          if (next >= imgs.length) {
            directionRef.current = -1;
            return Math.max(prev - 1, 0);
          }
          if (next < 0) {
            directionRef.current = 1;
            return Math.min(prev + 1, imgs.length - 1);
          }
          return next;
        }

        return (prev + 1) % imgs.length;
      });
    }, intervalMs);
    return () => {
      clearInterval(timer);
    };
  }, [imgs.length, intervalMs, loop, reverseOnLoop]);

  useEffect(() => {
    directionRef.current = 1;
  }, [reverseOnLoop, imgs.length]);

  useEffect(() => {
    fetchCacheAssets(imgs);
  }, [imgs]);

  if (imgs.length === 0) {
    return null;
  }

  if (isBackground) {
    return (
      <ImgBackgroundComponent
        src={imgs[i % imgs.length]}
        forceMaxSize={forceMaxSize}
        aria-hidden={ariaHidden}
        className={imgClassName}
      />
    );
  }

  return (
    <ImgComponent
      src={imgs[i % imgs.length]}
      forceMaxSize={forceMaxSize}
      aria-hidden={ariaHidden}
      className={imgClassName}
    />
  );
};

export default AnimationImgsComponent;
