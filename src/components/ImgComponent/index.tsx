import { useCallback, useEffect, forwardRef, useRef, useMemo } from "react";
import { useAssets } from "../../hooks";

type ImageComponentProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
  src: string;
  forceMaxSize?: boolean;
};

const ImgComponent = forwardRef<HTMLImageElement, ImageComponentProps>(
  (props, imgRef) => {
    const { getAssetImg } = useAssets();
    const { src, alt, forceMaxSize = true, ...rest } = props;
    const personalRef = useRef<HTMLImageElement>(null);

    const finalRef = useMemo(() => imgRef || personalRef, [imgRef]);

    const updateMaxSize = useCallback(() => {
      // @ts-ignore
      if (finalRef?.current) {
        // @ts-ignore
        const { current } = finalRef;
        if (forceMaxSize) {
          current.style.maxWidth = `${current.naturalWidth}px`;
          current.style.maxHeight = `${current.naturalHeight}px`;
        }
      }
    }, [finalRef, forceMaxSize]);

    useEffect(() => {
      updateMaxSize();
    }, [props, updateMaxSize]);

    return (
      <img
        src={getAssetImg(src)}
        alt={alt}
        ref={finalRef}
        onLoad={() => updateMaxSize()}
        {...rest}
      />
    );
  }
);

export default ImgComponent;
