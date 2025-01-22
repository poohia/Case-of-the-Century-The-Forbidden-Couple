import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import { useSafeArea } from "../../hooks";
import { useGameProvider } from "../../gameProvider";

export type PageContainerMaxSize = { width: number; height: number };

type PageContainerProps = {
  paddingRight?: string;
  maxSize?: PageContainerMaxSize;
  forceContainerCenter?: boolean;
};

type PageComponentProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  PageContainerProps;

const PageContainer = styled.div<PageContainerProps>`
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  padding-right: ${({ paddingRight }) => paddingRight};
  ${({ maxSize }) =>
    maxSize
      ? `
    max-width: ${maxSize.width}px;
    max-height: ${maxSize.height}px;
  `
      : ""}
  ${({ forceContainerCenter }) =>
    forceContainerCenter
      ? `
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      `
      : ""}
`;

const PageComponent: React.FC<PageComponentProps> = ({
  children,
  paddingRight,
  maxSize,
  ...rest
}) => {
  const [forceContainerCenter, setForceContainerCenter] =
    useState<boolean>(false);
  const safeArea = useSafeArea();
  const { innerHeight, innerWidth } = useGameProvider();
  const paddingR = useMemo(
    () => (paddingRight ? paddingRight : safeArea.sar),
    [paddingRight, safeArea]
  );

  const determinateForceContainerCenter = useCallback(() => {
    if (!maxSize) {
      return;
    }
    const { width, height } = maxSize;
    const { innerWidth, innerHeight } = window;
    if (width <= innerWidth || height < innerHeight) {
      setForceContainerCenter(true);
    } else {
      setForceContainerCenter(false);
    }
  }, [maxSize]);

  useEffect(() => {
    if (maxSize) {
      determinateForceContainerCenter();
    }
  }, [maxSize, innerWidth, innerHeight, determinateForceContainerCenter]);

  return (
    // @ts-ignore
    <PageContainer
      paddingRight={paddingR}
      maxSize={maxSize}
      forceContainerCenter={forceContainerCenter}
      {...rest}
    >
      {children}
    </PageContainer>
  );
};

export default PageComponent;
