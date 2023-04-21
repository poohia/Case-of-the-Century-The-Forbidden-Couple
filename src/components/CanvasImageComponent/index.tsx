import { useEffect, useMemo, useRef, useState } from "react";
// import { useGameProvider } from "../../gameProvider";
import useSize from "./useSize";
export type ObjectSize = { w: number; h: number };

type CanvasImageProps = {
  src: string;
  center?: boolean;
  responsive?: boolean;
  blockAtMaxSize?: boolean;
  blockAtMinSize?: boolean;
  minSize?: ObjectSize;
};

type CanvasImageComponentProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  CanvasImageProps;

const CanvasImageComponent: React.FC<CanvasImageComponentProps> = (props) => {
  const {
    src,
    center = false,
    responsive = false,
    blockAtMaxSize = false,
    blockAtMinSize = false,
    minSize,
    ...rest
  } = props;
  const getSize = useSize();
  /**  */
  // const { innerWidth, innerHeight } = useGameProvider();
  /**  */
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  /**  */
  const [loaded, setLoaded] = useState<boolean>(false);

  const image = useMemo(() => {
    const img = new Image();
    img.src = src;
    return img;
  }, []);

  useEffect(() => {
    if (loaded && canvasRef.current && parentRef.current) {
      const { current } = canvasRef;

      const ctx = current.getContext("2d");
      ctx?.clearRect(0, 0, current.width, current.height);
      const frameObjectSize = { w: image.naturalWidth, h: image.naturalHeight };
      const parentSize = {
        w: parentRef.current.clientWidth,
        h: parentRef.current.clientHeight,
      };
      const [pw, ph] = getSize(
        parentSize,
        frameObjectSize,
        !!responsive,
        !!blockAtMaxSize,
        !!blockAtMinSize,
        minSize
      );

      ctx?.drawImage(
        image,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight,
        center ? (parentSize.w - pw) / 2 : 0,
        center ? (parentSize.h - ph) / 2 : 0,
        pw,
        ph
      );
    }
  }, [canvasRef, loaded, props]);

  // check img loaded
  useEffect(() => {
    const dispatchImgLoaded = () => {
      setLoaded(true);
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

  return (
    <div ref={parentRef} style={{ width: "100%", height: "100%" }} {...rest}>
      {loaded && parentRef.current && (
        <canvas
          width={parentRef.current.clientWidth}
          height={parentRef.current.clientHeight}
          ref={canvasRef}
        />
      )}
    </div>
  );
};

export default CanvasImageComponent;
