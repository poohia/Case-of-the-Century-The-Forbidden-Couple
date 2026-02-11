import styled from "styled-components";

export const ModalParametersCharactersContainer = styled.div`
  padding: 10px;
  overflow: auto;
  > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    > section {
      position: relative;
      margin: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      flex-basis: calc(50% - 20px);
      > div {
      }
      h3 {
        margin: 6px 0 10px 0;
        text-align: center;
      }
      img {
        width: 150px;
        height: 150px;
        margin: 4px;
        object-fit: cover;
        object-position: top;
      }

      &.inconnu {
        > div {
          cursor: not-allowed;
        }
        img {
          filter: blur(5px) grayscale(1);
          cursor: not-allowed;
        }
      }
      &.notify {
        &::after {
          content: "";
          position: absolute;
          top: -8px;
          right: 30%;
          width: 12px;
          height: 12px;
          background: ${({ theme }) => theme.colors.danger};
          border-radius: 50%;
        }
      }
    }
  }
`;

export const ModalParametersCharactersCharacterComponentContainer = styled.div`
  overflow: auto;
  max-width: 1000px;
  margin: 0 auto;
  font-size: ${({ theme }) => theme.fonts.size};
  line-height: ${({ theme }) => theme.fonts.lineHeight};
  > div {
    display: flex;
    flex-direction: column;
    > div {
      &:nth-child(1) {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin-bottom: 15px;
        > div {
          flex: 1;
          &:nth-child(1) {
            > div {
              display: flex;
              flex-wrap: wrap;
              justify-content: space-around;
              align-items: center;
              /* padding: 0 20px; */
              p {
                font-size: 1.1rem;
                flex: 1;
                &:first-child {
                }
                &:last-child {
                  font-size: 1.3rem;
                }
                /* margin: 10px 0 10px 6px; */
              }
            }
          }
          &:nth-child(2) {
            text-align: right;
          }
        }
      }
    }
    h3 {
      font-size: 2rem;
      font-weight: 550;
      margin: 0 0 10px 0;
    }
  }
  .image-primary {
    width: 70vh;
    max-width: 317px;
  }
`;

export const TextCharacterContainer = styled.div`
  margin: 6px 0;
  span {
    line-height: ${({ theme }) => theme.fonts.lineHeight};
  }
  &.hidden {
    visibility: hidden;
  }
`;

export const DivWithTextLock = styled(TextCharacterContainer)`
  span {
    color: transparent;
    background-color: #e0e0e0; /* Un gris clair */
    border-radius: 4px; /* Bords arrondis pour un look plus doux */
    user-select: none;
    border-radius: 0;
  }
`;
