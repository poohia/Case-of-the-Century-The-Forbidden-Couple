import { useMemo } from "react";
import c from "../../../config.json";
import { ConfigApplication } from "../../../types";
import { useEnvInterface } from "../useEnv";
import styled from "styled-components";

import christmasTree from "./christmas-tree.png";

const config = c as ConfigApplication;

const HolidaysOverlaysContainer = styled.div`
  @keyframes snow-fall {
    0% {
      background-position:
        0px -200px,
        0px -200px,
        0px -200px;
    }
    100% {
      background-position:
        0px 200px,
        0px 400px,
        0px 600px;
    }
  }

  .snow-overlay {
    pointer-events: none;
    position: fixed;
    inset: 0;
    z-index: 9999;
    background-image:
      radial-gradient(
        2px 2px at 10px 10px,
        rgba(255, 255, 255, 0.8),
        transparent
      ),
      radial-gradient(
        2px 2px at 50px 50px,
        rgba(255, 255, 255, 0.9),
        transparent
      ),
      radial-gradient(
        3px 3px at 130px 80px,
        rgba(255, 255, 255, 0.9),
        transparent
      );
    background-size: 200px 200px;
    animation: snow-fall 12s linear infinite;
    opacity: 0.85;
  }

  .holiday-icon {
    pointer-events: none;
    position: fixed;
    bottom: 10px;
    left: 10px;
    width: 40px;
    height: 60px;
    z-index: 9999;
  }
`;

const HolidaysOverlayComponent = ({
  getEnvVar,
}: {
  getEnvVar: useEnvInterface["getEnvVar"];
}) => {
  const month = useMemo(() => new Date().getMonth(), []);
  const christmas = useMemo<boolean>(
    () =>
      (!!config.holidaysOverlay?.christmas && month === 11) ||
      !!getEnvVar("FORCE_CHIRSTMAS_OVLERAY"),
    [month]
  );
  const halloween = useMemo<boolean>(
    () =>
      (!!config.holidaysOverlay?.halloween && month === 9) ||
      !!getEnvVar("FORCE_HALLOWEEN_OVERLAY"),
    [month]
  );

  if (!christmas && !halloween) {
    return null;
  }

  return (
    <HolidaysOverlaysContainer>
      {christmas && (
        <>
          <div className="snow-overlay"></div>
          <div className="snow-overlay"></div>
          <div className="holiday-icon">
            <img src={christmasTree} />
          </div>
        </>
      )}
    </HolidaysOverlaysContainer>
  );
};

export default HolidaysOverlayComponent;
