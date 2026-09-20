import styled from "styled-components";

export const ModalCulpritSelectionActions = styled.div`
  button.small {
    overflow: visible;
  }
`;

export const ModalCulpritSelectionStartAction = styled.div`
  display: flex;
  justify-content: center;
  padding: 4px 0;

  > button {
    min-width: min(100%, 280px);
  }
`;

export const ModalCulpritSelectionFooter = styled.footer`
  display: flex;
  justify-content: center;
  margin-top: auto;
  padding: 16px 0 2px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);

  > button {
    min-width: min(100%, 280px);
  }
`;

export const ModalCulpritSelectionResultStamp = styled.span<{
  $result: "success" | "failed";
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 72%;
  padding: 7px 10px;
  border: 4px double currentColor;
  border-radius: 3px;
  background: ${({ $result }) =>
    $result === "success"
      ? "rgba(43, 115, 61, 0.12)"
      : "rgba(166, 36, 42, 0.12)"};
  box-shadow:
    0 0 0 2px rgba(245, 239, 227, 0.42),
    inset 0 0 0 1px currentColor;
  color: ${({ $result }) => ($result === "success" ? "#2b733d" : "#a6242a")};
  font-family: Impact, "Arial Black", sans-serif;
  font-size: clamp(1.3rem, 1rem + 1.2vw, 2rem);
  font-weight: 900;
  letter-spacing: 0.09em;
  line-height: 1;
  pointer-events: none;
  text-align: center;
  text-transform: uppercase;
  text-shadow: 1px 1px 0 rgba(245, 239, 227, 0.35);
  transform: translate(-50%, -50%)
    rotate(${({ $result }) => ($result === "success" ? "-8deg" : "7deg")});
  animation: modal-culprit-selection-stamp 360ms
    cubic-bezier(0.18, 0.88, 0.32, 1.2) both;

  @keyframes modal-culprit-selection-stamp {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%)
        rotate(${({ $result }) => ($result === "success" ? "-8deg" : "7deg")})
        scale(1.65);
    }

    70% {
      opacity: 0.92;
      transform: translate(-50%, -50%)
        rotate(${({ $result }) => ($result === "success" ? "-8deg" : "7deg")})
        scale(0.96);
    }

    100% {
      opacity: 0.92;
    }
  }
`;

export const SectionText = styled.section<{
  $showResult: boolean;
  $isCorrect?: boolean;
  $hasFooterAction: boolean;
}>`
  padding-bottom: 0;

  &:last-of-type {
    padding-bottom: ${({ $hasFooterAction }) =>
      $hasFooterAction ? 0 : "var(--sab)"};
  }

  > div {
    text-align: left;
    display: inline;
    font-weight: 600;
    padding: 0;
  }
  button {
    border: 1px dashed currentColor;
    background: transparent;
    cursor: ${({ $showResult }) => ($showResult ? "default" : "pointer")};
    font-weight: 600;
    color: inherit;
    margin-left: 4px;
    margin-top: 4px;
    padding: 5px 12px;
    color: ${({ $showResult, $isCorrect, theme }) => {
      if (!$showResult || $isCorrect === undefined) {
        return theme.colors.textdark;
      }

      return $isCorrect ? "#2e7d32" : "#c62828";
    }};

    &:disabled {
      cursor: default;
      opacity: 0.55;
    }
  }
`;
