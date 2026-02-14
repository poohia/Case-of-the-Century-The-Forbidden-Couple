import { useEffect, useMemo, useRef, useState } from "react";

import ImgComponent from "../ImgComponent";

type AnimationImgsComponentProps = {
  imgs: string[];
  imgPerSeconde?: number;
  loop?: boolean;
  reverseOnLoop?: boolean;
  ariaHidden?: boolean;
  forceMaxSize?: boolean;
  imgClassName?: string;
};

const AnimationImgsComponent: React.FC<AnimationImgsComponentProps> = ({
  imgs,
  imgPerSeconde = 1,
  loop = true,
  reverseOnLoop = false,
  ariaHidden,
  forceMaxSize = true,
  imgClassName,
}) => {
  const [i, setI] = useState<number>(0);
  const directionRef = useRef<1 | -1>(1);
  const intervalMs = useMemo(() => {
    return 1000 / Math.max(imgPerSeconde, 1);
  }, [imgPerSeconde]);

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

  if (imgs.length === 0) {
    return null;
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
