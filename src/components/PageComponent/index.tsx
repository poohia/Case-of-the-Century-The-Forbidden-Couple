import React, { useMemo } from "react";
import styled from "styled-components";

import { useGameProvider } from "../../gameProvider";

type PageContainerSize = { width: number; height: number };
const PAGE_RATIO = 16 / 9;

type PageContainerProps = {
  maxSize?: PageContainerSize;
};

type PageComponentProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {};

const PageContainer = styled.div<PageContainerProps>`
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  ${({ maxSize }) =>
    maxSize
      ? `
    max-width: ${maxSize.width}px;
    max-height: ${maxSize.height}px;
  `
      : ""}
`;

const PageComponent: React.FC<PageComponentProps> = ({ children, ...rest }) => {
  const { innerHeight, innerWidth, isMobileDevice } = useGameProvider();

  const maxSize = useMemo<PageContainerSize | undefined>(() => {
    if (
      innerWidth <= 0 ||
      innerHeight <= 0 ||
      (innerWidth <= 1920 && innerHeight <= 1080)
    ) {
      return undefined;
    }

    const currentRatio = innerWidth / innerHeight;

    if (Math.abs(currentRatio - PAGE_RATIO) < 0.001) {
      return undefined;
    }

    if (currentRatio > PAGE_RATIO) {
      return {
        width: Math.round(innerHeight * PAGE_RATIO),
        height: innerHeight,
      };
    }

    return {
      width: innerWidth,
      height: Math.round(innerWidth / PAGE_RATIO),
    };
  }, [innerHeight, innerWidth, isMobileDevice]);

  return (
    // @ts-ignore
    <PageContainer maxSize={maxSize} {...rest}>
      {children}
    </PageContainer>
  );
};

export default PageComponent;
