import styled from "styled-components";

export const CreditsLayout = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px max(16px, var(--sar)) 16px max(16px, var(--sal));
  box-sizing: border-box;
  background: radial-gradient(
    ellipse at center,
    rgba(8, 12, 20, 0.35),
    rgba(8, 12, 20, 0.8)
  );
`;

// Fiche papier épinglée, même papier que les modals
export const CreditsSheet = styled.div`
  position: relative;
  width: 100%;
  max-width: 760px;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: clamp(30px, 4vw, 48px) clamp(18px, 4vw, 52px) clamp(18px, 3vw, 32px);
  color: ${({ theme }) => theme.colors.textdark};
  background: url(${({ theme }) => theme.default_modal.background_image})
    center / 100% 100% no-repeat;
  box-shadow:
    0 18px 50px rgba(0, 0, 0, 0.55),
    0 3px 8px rgba(0, 0, 0, 0.3);

  &:before {
    content: "";
    position: absolute;
    top: -18px;
    left: 50%;
    width: 46px;
    height: 46px;
    transform: translateX(-50%);
    background: url(${({ theme }) => theme.project.image_epingle}) center /
      contain no-repeat;
    filter: drop-shadow(0 3px 4px rgba(0, 0, 0, 0.35));
  }

  @media (max-height: 480px) {
    padding-bottom: 14px;
  }
`;

export const CreditsContent = styled.div`
  min-height: 0;
  overflow-y: auto;
`;

export const CreditsHeader = styled.header`
  padding-bottom: 14px;
  border-bottom: 3px double ${({ theme }) => theme.colors.textdark};
  text-align: center;

  p {
    margin: 0;
    font-size: clamp(0.8rem, 0.6rem + 0.6vw, 1rem);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    opacity: 0.8;
  }

  h1 {
    margin: 4px 0 0;
    font-size: clamp(2rem, 1.2rem + 3.4vw, 3.4rem);
    line-height: 1.05;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  span {
    font-size: inherit;
  }

  @media (max-height: 480px) {
    padding-bottom: 8px;

    h1 {
      font-size: clamp(1.5rem, 1rem + 2vw, 2rem);
    }
  }
`;

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

export const CreditsActions = styled.div`
  flex-shrink: 0;
  margin-top: 18px;
  padding-top: 18px;
  border-top: ${({ theme }) => theme.game_configuration.footer_border_top};

  @media (max-height: 480px) {
    margin-top: 10px;
    padding-top: 10px;
  }
`;
