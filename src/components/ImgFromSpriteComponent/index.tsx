import styled from "styled-components";
import useSpriteComponent from "./useSpriteComponent";
import { ObjectSize } from "./types";

export type ImgFromSpriteProps = {
  imageFile: string;
  atlasFile: string;
  frameName: string;
  center?: boolean;
  responsive?: boolean;
  blockAtMaxSize?: boolean;
  blockAtMinSize?: boolean;
  minSize?: ObjectSize
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
    center = false,
    responsive = false,
    blockAtMaxSize = false,
    blockAtMinSize = false,
    minSize,
    ...rest
  } = props;
  const { loaded, parentSize, canvasRef, parentRef } = useSpriteComponent({
    imageFile,
    atlasFile,
    frameName,
    center,
    responsive,
    blockAtMaxSize,
    blockAtMinSize,
    minSize
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
