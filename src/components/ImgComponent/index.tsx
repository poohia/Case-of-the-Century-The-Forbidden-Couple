import { useCallback, useEffect, useRef } from "react";

type ImageComponentProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
  forceMaxSize?: boolean;
};

const ImgComponent: React.FC<ImageComponentProps> = (props) => {
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
      src={src}
      alt={alt}
      ref={imgRef}
      onLoad={() => updateMaxSize()}
      {...rest}
    />
  );
};

export default ImgComponent;
