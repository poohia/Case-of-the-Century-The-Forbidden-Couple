import React from "react";
import styled, { keyframes } from "styled-components";
import useButtonHandleClick from "../../hooks/useButtonHandleClick";
import { useGameProvider } from "../../../../../gameProvider";

// 1. Animation : on part de Y=0, on descend à Y=10px au milieu du cycle, puis on remonte
const blink = keyframes`
  0%, 100% { opacity: 1; }
  50%      { opacity: 0; }
`;
// 2. Conteneur pour centrer la flèche (ajustez la hauteur selon votre UI)
const ContinueArrowComponentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 40px; */
  height: 30px;
  transform: rotate(180deg);
  position: absolute;
  bottom: -16px;
  right: -8px;
  cursor: pointer;
`;

// 3. La flèche pointant vers le bas, qui se déplace
const Arrow = styled.div`
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: none;
  border-bottom: 12px solid green; /* → pointe vers le bas */
  border-bottom-color: black;

  animation: ${blink} 1s infinite;
`;

const ContinueArrowComponent: React.FC<{ handleClick: () => void }> = ({
  handleClick,
}) => {
  const click = useButtonHandleClick();
  const { translateText } = useGameProvider();
  return (
    <ContinueArrowComponentContainer
      onClick={(e) =>
        click(e, {
          callback: handleClick,
          playSound: false,
        })
      }
      role="button"
      tabIndex={0}
      aria-label={translateText("message_1749559409848")}
    >
      <Arrow />
    </ContinueArrowComponentContainer>
  );
};

export default ContinueArrowComponent;
