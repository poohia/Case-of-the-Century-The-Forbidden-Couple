import { useCallback, useEffect, forwardRef, useRef, useMemo } from "react";

import { useGameProvider } from "../../gameProvider";

export type ImageComponentProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
  src: string;
  forceMaxSize?: boolean;
};

const ImgComponent = forwardRef<HTMLImageElement, ImageComponentProps>(
  (props, imgRef) => {
    const { getAssetImg, getAlt, translateText } = useGameProvider();
    const { src, alt, forceMaxSize = true, ...rest } = props;
    const ariaHidden = props["aria-hidden"];
    const personalRef = useRef<HTMLImageElement>(null);

    const finalRef = useMemo(() => imgRef || personalRef, [imgRef]);
    const finalAlt = useMemo(() => {
      if (alt) {
        return translateText(alt);
      }
      const altValue = getAlt(src);
      if (altValue) {
        return translateText(altValue);
      }
      return src;
    }, [alt, src, translateText]);

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
        alt={ariaHidden ? "" : finalAlt}
        ref={finalRef}
        aria-hidden={ariaHidden || undefined}
        onLoad={() => updateMaxSize()}
        {...rest}
      />
    );
  }
);

export default ImgComponent;
