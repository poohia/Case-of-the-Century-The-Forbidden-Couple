import styled from "styled-components";
import useAnimationComponent from "./useAnimationComponent";

export type AnimationProps = {
  imageFile: string;
  atlasFile: string;
  animationFile: string;
  animationName: string;
  center?: boolean;
  responsive?: boolean;
};
type AnimationContainerProps = {
  width?: number;
  height?: number;
};
export type AnimationComponentProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  AnimationProps &
  AnimationContainerProps;

const ImgContainer = styled.div<AnimationContainerProps>`
  width: ${({ width }) => (width ? `${width}px` : "100%")} !important;
  height: ${({ height }) => (height ? `${height}px` : "100%")} !important;
  > canvas {
    width: ${({ width }) => (width ? `${width}px` : "100%")} !important;
    height: ${({ height }) => (height ? `${height}px` : "100%")} !important;
  }
`;

const AnimationComponent: React.FC<AnimationComponentProps> = (props) => {
  const {
    imageFile,
    atlasFile,
    animationFile,
    animationName,
    center = true,
    responsive = false,
    width,
    height,
    ...rest
  } = props;
  const { loaded, parentSize, canvasRef, parentRef } = useAnimationComponent({
    imageFile,
    atlasFile,
    animationFile,
    animationName,
    center,
    responsive,
  });

  return (
    <ImgContainer width={width} height={height} {...rest} ref={parentRef}>
      {loaded && (
        <canvas width={parentSize.w} height={parentSize.h} ref={canvasRef} />
      )}
    </ImgContainer>
  );
};

export default AnimationComponent;
