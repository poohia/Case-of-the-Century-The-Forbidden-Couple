import styled from "styled-components";

export const ModalParametersCharactersContainer = styled.div`
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
        &.img-character {
          border-radius: 50%;
          box-shadow:
            rgb(0 0 0 / 16%) 0px 10px 36px 0px,
            rgb(0 0 0 / 6%) 0px 0px 0px 1px;
        }
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
    overflow-x: hidden;
    > div {
      &:nth-child(1) {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        flex-wrap: wrap;
        margin-bottom: 15px;
        > div {
          flex: 1;
          display: flex;
          align-items: center;
          flex-direction: row;
          justify-content: center;

          &:nth-child(1) {
            dl {
              width: 100%;
              > div {
                display: flex;
                flex-direction: column;
                dt,
                dd {
                  flex-basis: calc(50% - 10px);
                  margin: 2px;
                  display: flex;
                  align-items: center;
                }
                dt {
                  font-size: 1.4rem;
                }
                dd {
                  font-size: 1.8rem;
                  padding-left: 20px;
                  margin-right: 10px;
                }
              }
            }
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

export const TextCharacterContainer = styled.p`
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

export const ImgPalaroid = styled.div`
  display: inline-block;
  background: white;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.textLight};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  width: fit-content;
  max-width: 300px;
  height: calc(274px + 10px + 10px) !important;
  transform: rotate(2deg); /* effet jeté sur une table */

  img {
    display: block;
    max-width: 100%;
    height: auto;
    border-radius: 2px;
    max-height: 274px;
    height: 274px !important;
    object-fit: cover;
    object-position: center top;
  }

  &:before {
    content: "";
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
    width: 12px;
    height: 12px;
    background: ${({ theme }) => theme.colors.border};
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    z-index: 2;
  }
`;
