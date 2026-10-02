import styled from "styled-components";

export const CreditsBlock = styled.section`
  h2 {
    display: flex;
    align-items: center;
    gap: 14px;
    margin: 22px 0 10px;
    font-size: clamp(0.95rem, 0.75rem + 0.7vw, 1.2rem);
    letter-spacing: 0.16em;
    text-transform: uppercase;

    &:before,
    &:after {
      content: "";
      flex: 1;
      border-top: 1px solid rgba(17, 27, 45, 0.45);
    }
  }

  dl {
    margin: 0;
  }

  @media (max-height: 480px) {
    h2 {
      margin: 12px 0 4px;
    }
  }
`;

// Rôle à gauche, nom à droite, comme un générique
export const CreditsPerson = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
  column-gap: clamp(14px, 3vw, 28px);
  align-items: baseline;
  padding: 10px 0;
  border-bottom: 1px dashed rgba(17, 27, 45, 0.35);

  &:last-child {
    border-bottom: none;
  }

  dt {
    text-align: right;
    font-size: clamp(0.85rem, 0.7rem + 0.5vw, 1.05rem);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    line-height: 1.35;
    opacity: 0.82;
  }

  dd {
    margin: 0;
    font-size: clamp(1.1rem, 0.85rem + 0.9vw, 1.5rem);
    font-weight: 700;
    line-height: 1.3;
  }

  span {
    font-size: inherit;
  }

  @media (max-height: 480px) {
    padding: 5px 0;
  }
`;
