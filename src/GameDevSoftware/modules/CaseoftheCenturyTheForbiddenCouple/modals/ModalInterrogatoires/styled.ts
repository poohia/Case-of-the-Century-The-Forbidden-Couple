import styled from "styled-components";

export const ModalInterrogatoireCharacterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-height: 100%;
`;

export const ModalInterrogatoireCharacterTranscript = styled.section`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const ModalInterrogatoireCharacterList = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ModalInterrogatoireCharacterEntry = styled.li<{
  $direction: "left" | "right";
}>`
  display: flex;
  flex-direction: column;
  align-items: ${({ $direction }) =>
    $direction === "right" ? "flex-end" : "flex-start"};
  gap: 8px;
`;

export const ModalInterrogatoireCharacterSpeaker = styled.div<{
  $direction: "left" | "right";
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  max-width: 100%;
  padding: 5px 12px;
  text-align: center;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textLight};
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1.15;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 4px 12px;
`;

export const ModalInterrogatoireCharacterBubble = styled.div<{
  $direction: "left" | "right";
}>`
  width: fit-content;
  max-width: calc(90% - 10px);
  padding: 10px;
  border: 2px solid rgba(20, 12, 6, 0.92);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.28), transparent 20%),
    ${({ $direction }) =>
      $direction === "right"
        ? "rgba(243, 226, 198, 0.98)"
        : "rgba(247, 232, 205, 0.98)"};
  text-align: ${({ $direction }) =>
    $direction === "right" ? "right" : "left"};
  box-shadow:
    inset 0 0 0 1px rgba(93, 64, 38, 0.15),
    0 6px 16px rgba(0, 0, 0, 0.12);

  p {
    margin: 0;
    line-height: 1.2;
    font-size: clamp(1rem, 1.5vw + 0.3rem, 1.8rem);
  }

  p + p {
    margin-top: 10px;
  }
`;

export const ModalInterrogatoireCharacterActions = styled.div`
  padding-top: 4px;
  padding-bottom: 10px;

  > div {
    justify-content: center;
  }

  button {
    width: 100%;
    min-width: unset;
  }
`;
