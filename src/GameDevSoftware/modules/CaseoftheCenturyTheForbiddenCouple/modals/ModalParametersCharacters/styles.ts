import styled from "styled-components";

export const ModalParametersCharactersContainer = styled.div`
  padding: 10px;
  overflow: auto;
  > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    > div {
      margin: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      flex-basis: calc(50% - 20px);
      > div {
        cursor: pointer;
      }
      h3 {
        margin-top: 0;
      }
      img {
        width: 150px;
        height: 150px;
        margin: 4px;
        object-fit: cover;
        object-position: top;
        cursor: pointer;
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
    }
  }
`;

export const ModalParametersCharactersCharacterComponentContainer = styled.div`
  overflow: auto;
  max-width: 1000px;
  margin: 0 auto;
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
    max-width: 217px;
  }
`;
