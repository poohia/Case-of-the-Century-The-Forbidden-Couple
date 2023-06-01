import { useCallback, useEffect, useRef } from "react";
import { useAssets } from "../../hooks";

type ImageComponentProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
  src: string;
  forceMaxSize?: boolean;
};

const ImgComponent: React.FC<ImageComponentProps> = (props) => {
  const { getAssetImg } = useAssets();
  const imgRef = useRef<HTMLImageElement>(null);
  const { src, alt, forceMaxSize = true, ...rest } = props;

  const updateMaxSize = useCallback(() => {
    if (imgRef?.current) {
      const { current } = imgRef;
      if (forceMaxSize) {
        current.style.maxWidth = `${current.naturalWidth}px`;
        current.style.maxHeight = `${current.naturalHeight}px`;
      }
    }
  }, [imgRef, forceMaxSize]);

  useEffect(() => {
    updateMaxSize();
  }, [props]);

  return (
    <img
      src={getAssetImg(src)}
      alt={alt}
      ref={imgRef}
      onLoad={() => updateMaxSize()}
      {...rest}
    />
  );
};

export default ImgComponent;
