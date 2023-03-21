import { useEffect, useRef } from "react";

type ImageComponentProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
  forceMaxSize?: boolean;
};

const ImgComponent: React.FC<ImageComponentProps> = (props) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const { src, alt, forceMaxSize = true, ...rest } = props;

  useEffect(() => {
    if (imgRef?.current) {
      const { current } = imgRef;
      if (forceMaxSize) {
        current.style.maxWidth = `${current.naturalWidth}px`;
        current.style.maxHeight = `${current.naturalHeight}px`;
      }
    }
  }, [imgRef, props]);

  return <img src={src} alt={alt} ref={imgRef} {...rest} />;
};

export default ImgComponent;
