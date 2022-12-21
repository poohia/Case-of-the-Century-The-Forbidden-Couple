import React, { useMemo } from "react";
import styled from "styled-components";

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
  const paddingR = useMemo(
    () =>
      paddingRight
        ? paddingRight
        : getComputedStyle(document.body).getPropertyValue("--sar"),
    [paddingRight]
  );
  console.log("🚀 ~ file: index.tsx:17 ~ paddingRight", paddingR);
  return <PageContainer paddingRight={paddingR}>{children}</PageContainer>;
};

export default PageComponent;
