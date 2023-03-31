import styled from "styled-components";
import useAnimationComponent from "./useAnimationComponent";

export type AnimationProps = {
  imageFile: string;
  atlasFile: string;
  animationFile: string;
  animationName: string;
};

export type AnimationComponentProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  AnimationProps;

const ImgContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const AnimationComponent: React.FC<AnimationComponentProps> = (props) => {
  const { imageFile, atlasFile, animationFile, animationName, ...rest } = props;
  const { loaded, parentSize, canvasRef, parentRef } = useAnimationComponent({
    imageFile,
    atlasFile,
    animationFile,
    animationName,
  });

  return (
    <ImgContainer {...rest} ref={parentRef}>
      {loaded && (
        <canvas width={parentSize.w} height={parentSize.h} ref={canvasRef} />
      )}
    </ImgContainer>
  );
};

export default AnimationComponent;
