import styled from "styled-components";

import { ModalInterrogatoireResumeHeader } from "../ModalInterrogatoireResume/styled";

export const ModalResumedEndHeader = styled(ModalInterrogatoireResumeHeader)`
  gap: 4px;

  h4 {
    margin: 0;
    font-size: clamp(1.5rem, 1.2rem + 1vw, 2.2rem);
    line-height: 1.05;
    text-transform: uppercase;

    @media (max-width: 920px) {
      font-size: clamp(1.15rem, 1rem + 1vw, 1.55rem);
    }
  }
`;

export const ModalResumedEndParagraphs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const ModalResumedEndParagraph = styled.section`
  line-height: 1.5;

  > div {
    display: inline;
    padding: 0;
    text-align: left;
  }
`;
