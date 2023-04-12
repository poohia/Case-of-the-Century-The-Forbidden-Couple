import styled from "styled-components";
import useSpriteComponent from "./useSpriteComponent";

export type ImgFromSpriteProps = {
  imageFile: string;
  atlasFile: string;
  frameName: string;
  center?: boolean;
  responsive?: boolean;
};

export type ImgFromSpriteComponentProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  ImgFromSpriteProps;
const ImgContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
const ImgFromSpriteComponent: React.FC<ImgFromSpriteComponentProps> = (
  props
) => {
  const {
    imageFile,
    atlasFile,
    frameName,
    center = true,
    responsive = false,
    ...rest
  } = props;
  const { loaded, parentSize, canvasRef, parentRef } = useSpriteComponent({
    imageFile,
    atlasFile,
    frameName,
    center,
    responsive,
  });

  return (
    <ImgContainer {...rest} ref={parentRef}>
      {loaded && (
        <canvas width={parentSize.w} height={parentSize.h} ref={canvasRef} />
      )}
    </ImgContainer>
  );
};

export default ImgFromSpriteComponent;
