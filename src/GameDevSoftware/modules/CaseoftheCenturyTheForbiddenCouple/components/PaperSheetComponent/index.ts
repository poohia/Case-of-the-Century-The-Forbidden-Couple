import styled from "styled-components";

export const PaperSheetLayout = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px max(16px, var(--sar)) 16px max(16px, var(--sal));
  box-sizing: border-box;
  background: radial-gradient(
    ellipse at center,
    rgba(8, 12, 20, 0.35),
    rgba(8, 12, 20, 0.8)
  );
`;

// Même chose, posée par-dessus une image de fond en position absolue
export const PaperSheetOverlay = styled(PaperSheetLayout)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

// Fiche papier épinglée, même papier que les modals
export const PaperSheet = styled.div`
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

export const PaperSheetContent = styled.div`
  min-height: 0;
  overflow-y: auto;
`;

export const PaperSheetHeader = styled.header`
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

export const PaperSheetActions = styled.div`
  flex-shrink: 0;
  margin-top: 18px;
  padding-top: 18px;
  border-top: ${({ theme }) => theme.game_configuration.footer_border_top};

  @media (max-height: 480px) {
    margin-top: 10px;
    padding-top: 10px;
  }
`;

// Habille TitleComponent (clair, prévu pour un fond sombre) pour le papier
export const PaperSheetTitle = styled.div`
  flex-shrink: 0;

  && > div {
    color: inherit;
    padding: 0;
  }

  && h1 {
    font-size: clamp(1.8rem, 1.1rem + 2.4vw, 2.6rem);
    line-height: 1.05;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  && h2 {
    margin-top: 6px;
    font-size: clamp(1rem, 0.8rem + 1vw, 1.5rem);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    opacity: 0.8;
  }

  span {
    font-size: inherit;
  }

  @media (max-height: 480px) {
    && h1 {
      font-size: clamp(1.4rem, 1rem + 2vw, 1.9rem);
    }

    && h2 {
      margin-top: 2px;
      font-size: clamp(0.85rem, 0.7rem + 0.6vw, 1.05rem);
    }
  }
`;

// Carton de chapitre: "Chapitre N" en petit, double trait, nom du chapitre
export const PaperSheetChapter = styled(PaperSheet)`
  max-width: 640px;
  padding-bottom: clamp(26px, 4vw, 44px);
`;

export const PaperSheetChapterTitle = styled(PaperSheetTitle)`
  && h1 {
    padding-bottom: 12px;
    border-bottom: 3px double ${({ theme }) => theme.colors.textdark};
    font-size: clamp(0.95rem, 0.75rem + 0.8vw, 1.3rem);
    letter-spacing: 0.3em;
    opacity: 0.8;
  }

  && h2 {
    margin-top: 14px;
    font-size: clamp(1.6rem, 1rem + 2.6vw, 2.6rem);
    line-height: 1.1;
    letter-spacing: 0.04em;
    opacity: 1;
  }

  @media (max-height: 480px) {
    && h1 {
      font-size: clamp(0.85rem, 0.7rem + 0.6vw, 1.05rem);
    }

    && h2 {
      margin-top: 10px;
      font-size: clamp(1.4rem, 1rem + 2vw, 1.9rem);
    }
  }
`;
