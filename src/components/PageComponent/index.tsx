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

type PageComponentProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & { paddingRight?: string };

const PageComponent: React.FC<PageComponentProps> = ({
  children,
  paddingRight,
  ...rest
}) => {
  const safeArea = useSafeArea();
  const paddingR = useMemo(
    () => (paddingRight ? paddingRight : safeArea.sar),
    [paddingRight, safeArea]
  );

  return (
    // @ts-ignore
    <PageContainer paddingRight={paddingR} {...rest}>
      {children}
    </PageContainer>
  );
};

export default PageComponent;
