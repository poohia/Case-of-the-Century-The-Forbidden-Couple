import styled from "styled-components";

export const GameConfigurationContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto;

  button {
    max-width: 30%;
  }
`;

export const GameConfigurationMainStyled = styled.main`
  flex: 1;
  margin-bottom: 10px;
`;

export const GameConfigurationFooterStyled = styled.footer`
  min-height: fit-content;
  padding: 2px;
  border-top: ${({ theme }) => theme.game_configuration.footer_border_top};
  /* position: sticky;
  bottom: -2px;
  left: 0%;
  width: 100%;
  z-index: 3; */
  background-color: ${({ theme }) => theme.default_modal.background_color};
  --button-action-group-justify-content: flex-end;
`;

export const GameConfigurationSectionStyled = styled.section`
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.default_modal.color};
    outline-offset: 4px;
  }

  > div {
    &:nth-child(1) {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: clamp(0.85rem, 0.75rem + 0.2vw, 1rem);
      font-weight: bold;
      ${({ theme }) =>
        theme.default_modal.background_color === "transparent"
          ? ``
          : `
            position: sticky;
      top: 0;
      left: 0%;
      width: 100%;
      z-index: 2;
      `};

      background-color: ${({ theme }) => theme.default_modal.background_color};
      h3 {
        margin: 0;
      }
      padding-bottom: 10px;
    }
  }
`;

export const GameConfigurationAudioConfigurationStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  h4 {
    margin: 0 0 28px;
  }
`;

export const GameConfigurationAudioOptionsRowStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  padding: 4px 14px;
  text-align: center;

  > section {
    min-width: 0;

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.default_modal.color};
      outline-offset: 4px;
    }

    > div {
      height: clamp(220px, 30vh, 320px);
    }
  }
`;

export const GameConfigurationVibrationSectionStyled = styled.section`
  width: 100%;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.default_modal.color};
    outline-offset: 4px;
  }
`;

export const GameConfigurationAccessibilityContainer = styled.div`
  padding: 4px 14px;
  section {
    height: fit-content;
    border-bottom: 1px solid
      ${({ theme }) => theme.game_configuration.section_border_bottom};

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.default_modal.color};
      outline-offset: 4px;
    }

    &:last-child {
      border-bottom: none;
    }
  }
`;
