import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useAssets } from "../../hooks";

type SpriteComponentProps = {
  width: number;
  timeBeetweenSprite: number;
  height?: number;
  image: string;
  maxFrame: number;
  loop?: boolean;
  show?: boolean;
  onFinish?: () => void;
} & Pick<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "style"
>;

const SpriteComponentContainer = styled.div<
  // width: number;
  // height: number;
  // background: string;
  // backgroundPosition: number;
  // style: React.CSSProperties | "";
  Pick<SpriteComponentProps, "width" | "height" | "show" | "style"> & {
    background: string;
    backgroundPosition: number;
  }
>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background: url("${({ background }) => background}");
  background-position: ${({ backgroundPosition }) => backgroundPosition * -1}px
    0px;
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  ${({ style }) => (typeof style === "string" ? style : "")}
`;

const SpriteComponent: React.FC<SpriteComponentProps> = (props) => {
  const {
    width,
    timeBeetweenSprite,
    height = width,
    image,
    maxFrame,
    loop,
    style = {},
    show = true,
    onFinish,
  } = props;
  const { getAssetImg } = useAssets();
  const [backgroundPosition, setBackgroundPosition] = useState<number>(0);
  const [animationIsFinish, setAnimationIsFinish] = useState<boolean>(false);
  const [timeout, setTImeout] = useState<NodeJS.Timeout | null>(null);
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
        setAnimationIsFinish(() => true);
        timeout && clearInterval(timeout);
        return 0;
      });
    }, timeBeetweenSprite);
    setTImeout(t);
  }, [props]);

  useEffect(() => {
    timeout && clearInterval(timeout);
    setBackgroundPosition(0);
    setAnimationIsFinish(false);
    startAnimation();
  }, [props]);

  useEffect(() => {
    if (animationIsFinish && onFinish) {
      onFinish();
    }
  }, [animationIsFinish]);

  if (animationIsFinish) return <></>;

  return (
    <SpriteComponentContainer
      width={width}
      height={height}
      background={getAssetImg(image)}
      backgroundPosition={backgroundPosition}
      style={style}
      show={show}
    />
  );
};

export default SpriteComponent;
