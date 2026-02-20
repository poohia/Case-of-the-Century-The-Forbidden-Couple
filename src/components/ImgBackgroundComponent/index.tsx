import styled from "styled-components";

import ImgComponent from "../ImgComponent";

type ImgBackgroundComponentProps = React.ComponentPropsWithoutRef<"img"> & {
  src: string;
  forceMaxSize?: boolean;
};

const ImgBackgroundComponentContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: var(--gamedevsoftwaretarget-imgbackground-z-index, unset);
  img {
    object-fit: var(--gamedevsoftwaretarget-imgbackground-object-fit, cover);
    width: 100%;
    height: 100%;
  }
`;

const ImgBackgroundComponent = (props: ImgBackgroundComponentProps) => {
  return (
    <ImgBackgroundComponentContainer aria-hidden="true">
      <ImgComponent aria-hidden="true" {...props} />
    </ImgBackgroundComponentContainer>
  );
};

export default ImgBackgroundComponent;
