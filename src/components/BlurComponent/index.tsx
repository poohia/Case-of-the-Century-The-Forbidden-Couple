import type { ReactNode } from "react";
import styled from "styled-components";

type BlurComponentProps = {
  blur: number;
  children: ReactNode;
};

const BlurContainer = styled.div<{ $blur: number }>`
  width: 100%;
  height: 100%;
  filter: blur(${({ $blur }) => $blur}px);
  transform: scale(1.02);
  transform-origin: center;
`;

const BlurComponent: React.FC<BlurComponentProps> = ({ blur, children }) => {
  if (blur <= 0) {
    return <>{children}</>;
  }

  return <BlurContainer $blur={blur}>{children}</BlurContainer>;
};

export default BlurComponent;
