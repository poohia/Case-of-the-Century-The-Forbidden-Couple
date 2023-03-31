import styled from "styled-components";
import useAnimationComponent from "./useAnimationComponent";

export type AnimationComponentProps = {
  imageFile: string;
  atlasFile: string;
  animationFile: string;
  animationName: string;
};

const ImgContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const AnimationComponent: React.FC<AnimationComponentProps> = (props) => {
  const { loaded, parentSize, canvasRef, parentRef } =
    useAnimationComponent(props);

  return (
    <ImgContainer ref={parentRef}>
      {loaded && (
        <canvas width={parentSize.w} height={parentSize.h} ref={canvasRef} />
      )}
    </ImgContainer>
  );
};

export default AnimationComponent;
