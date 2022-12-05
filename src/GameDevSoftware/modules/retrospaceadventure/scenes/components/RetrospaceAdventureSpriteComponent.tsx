import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useAssets } from "../../../../../hooks";

const RetrospaceAdventureSpriteComponentContainer = styled.div<{
  width: number;
  height: number;
  background: string;
  backgroundPosition: number;
  style: React.CSSProperties | "";
}>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background: url("${({ background }) => background}");
  background-position: ${({ backgroundPosition }) => backgroundPosition * -1}px
    0px;
  ${({ style }) => (typeof style === "string" ? style : "")}
`;

type RetrospaceAdventureSpriteComponentProps = {
  width: number;
  timeBeetweenSprite: number;
  height?: number;
  image: string;
  maxFrame: number;
  loop?: boolean;
  onFinish?: () => void;
} & Pick<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "style"
>;

const RetrospaceAdventureSpriteComponent: React.FC<
  RetrospaceAdventureSpriteComponentProps
> = (props) => {
  const {
    width,
    timeBeetweenSprite,
    height = width,
    image,
    maxFrame,
    loop,
    style = {},
    onFinish,
  } = props;
  const { getAssetImg } = useAssets();
  const [backgroundPosition, setBackgroundPosition] = useState<number>(0);
  const [animationIsFinish, setAnimationIsFinish] = useState<boolean>(false);
  const [timeout, setTimeout] = useState<any>(null);
  const [i, setI] = useState<number>(0);

  const startAnimation = useCallback(() => {
    const t = setInterval(() => {
      setI((_i) => {
        if (_i < maxFrame) {
          setBackgroundPosition((_backgroundPosition) => {
            return _backgroundPosition + width;
          });
          return _i + 1;
        }
        if (loop) {
          setBackgroundPosition(0);
          return 0;
        }
        onFinish && onFinish();
        clearInterval(timeout);
        setAnimationIsFinish(true);
        return 0;
      });
    }, timeBeetweenSprite);
    setTimeout(t);
  }, [props]);

  useEffect(() => {
    clearInterval(timeout);
    setBackgroundPosition(0);
    setAnimationIsFinish(false);
    startAnimation();
  }, [props]);

  if (animationIsFinish) return <></>;

  return (
    <RetrospaceAdventureSpriteComponentContainer
      width={width}
      height={height}
      background={getAssetImg(image)}
      backgroundPosition={backgroundPosition}
      style={style}
    />
  );
};

export default RetrospaceAdventureSpriteComponent;
