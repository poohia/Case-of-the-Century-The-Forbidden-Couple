import React, { useMemo } from "react";
import styled from "styled-components";
import { useSafeArea } from "../../hooks";

const PageContainer = styled.div<{ paddingRight?: string }>`
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  padding-right: ${({ paddingRight }) => paddingRight};
`;

const PageComponent: React.FC<{
  children: React.ReactNode;
  paddingRight?: string;
}> = ({ children, paddingRight }) => {
  const safeArea = useSafeArea();
  const paddingR = useMemo(
    () => (paddingRight ? paddingRight : safeArea.sar),
    [paddingRight, safeArea]
  );
  return <PageContainer paddingRight={paddingR}>{children}</PageContainer>;
};

export default PageComponent;
