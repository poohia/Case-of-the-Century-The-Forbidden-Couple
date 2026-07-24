import styled from "styled-components";

import ImgComponent from "../ImgComponent";
import BlurComponent from "../BlurComponent";

type ImgBackgroundComponentProps = React.ComponentPropsWithoutRef<"img"> & {
  src: string;
  forceMaxSize?: boolean;
  blur?: number;
};

const ImgBackgroundComponentContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: var(--gamedevsoftwaretarget-imgbackground-z-index, unset);
  img {
    object-fit: var(--gamedevsoftwaretarget-imgbackground-object-fit, cover);
    width: 100%;
    height: 100%;
  }
`;

const ImgBackgroundComponent = ({
  blur = 0,
  ...props
}: ImgBackgroundComponentProps) => {
  return (
    <ImgBackgroundComponentContainer aria-hidden="true">
      <BlurComponent blur={blur}>
        <ImgComponent aria-hidden="true" {...props} />
      </BlurComponent>
    </ImgBackgroundComponentContainer>
  );
};

export default ImgBackgroundComponent;
