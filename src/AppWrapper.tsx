import React, { useMemo } from "react";
import styled from "styled-components";
import { useGameProvider } from "./gameProvider";

const OrientationScreenInformationComponent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 2rem;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
  text-align: center;
  color: white;
  line-height: 3.3rem;
`;

const AppWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { platform, screenorientation } = useGameProvider();

  const warnScreenOrientation = useMemo(
    () =>
      (platform === "browserandroid" || platform === "browserios") &&
      !screenorientation.includes("landscape"),
    [platform, screenorientation]
  );

  return (
    <>
      {warnScreenOrientation && (
        <OrientationScreenInformationComponent>
          <span>You must orient your screen in landscape mode</span>
        </OrientationScreenInformationComponent>
      )}
      {children}
    </>
  );
};

export default AppWrapper;
