import React, { useEffect, useRef } from "react";

import styled, { keyframes } from "styled-components";

import { useButtonHandleClick } from "../../../../../hooks";
import { TranslationComponent } from "../../../../../components";
import { useGameProvider } from "../../../../../gameProvider";
import { DialoguePlayback } from "../../../../../types";

// 1. Animation : on part de Y=0, on descend à Y=10px au milieu du cycle, puis on remonte
const blink = keyframes`
  0%, 100% { opacity: 1; }
  50%      { opacity: 0; }
`;
// 2. Conteneur pour centrer la flèche (ajustez la hauteur selon votre UI)
const ContinueArrowComponentContainer = styled.button<{ $ready: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 40px; */
  height: 17px;
  transform: rotate(180deg);
  position: absolute;
  bottom: 6%; //4px;
  right: 1%; //4px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  opacity: ${({ $ready }) => ($ready ? 1 : 0)};
  pointer-events: ${({ $ready }) => ($ready ? "auto" : "none")};
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

const ContinueArrowComponent: React.FC<{
  handleClick: () => void;
  show?: boolean;
}> = ({ handleClick, show = true }) => {
  const {
    openParameters,
    parameters: { screenReaderEnabled, dialogueSpeed },
  } = useGameProvider();
  const click = useButtonHandleClick();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const hasFocusedRef = useRef(false);

  const keepMounted =
    !!screenReaderEnabled &&
    (typeof dialogueSpeed === "undefined" ||
      dialogueSpeed === DialoguePlayback.Manual);

  useEffect(() => {
    if (!show || !keepMounted || hasFocusedRef.current) {
      return;
    }
    hasFocusedRef.current = true;
    buttonRef.current?.focus();
  }, [show, keepMounted]);

  if (!show && !keepMounted) {
    return null;
  }

  return (
    <ContinueArrowComponentContainer
      ref={buttonRef}
      $ready={show}
      aria-disabled={show ? undefined : true}
      onClick={(e) => {
        if (!show) {
          return;
        }
        click(e, {
          callback: handleClick,
          dontPlaySound: true,
        });
      }}
      className="continue-arrow-container"
      inert={openParameters ? "" : undefined}
    >
      <TranslationComponent id={"message_1749559409848"} srOnly />
      <Arrow />
    </ContinueArrowComponentContainer>
  );
};

export default ContinueArrowComponent;
