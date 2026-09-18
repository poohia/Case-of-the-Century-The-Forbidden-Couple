import styled from "styled-components";

export const ModalCulpritSelectionActions = styled.div`
  button.small {
    overflow: visible;
  }
`;

export const SectionText = styled.section<{
  $showResult: boolean;
  $isCorrect?: boolean;
}>`
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
