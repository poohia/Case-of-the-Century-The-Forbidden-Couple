import styled from "styled-components";

export const ContainerComponent = styled.div`
  height: 100%;
  color: white;
  position: relative;
`;

export const DivTextContainer = styled.div`
  position: absolute;
  bottom: 1%;
  left: 1%;
  width: calc(98% - 8px);
  border: 4px double white;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.9);
  border-color: ${({ theme }) => `${theme.card.firstBorderPrimary}`};
  height: 48vh;
  max-height: 400px;
  overflow-y: auto;
  font-family: "Audiowide";
  > div {
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: calc(var(--sar) - 16px);
    padding-right: calc(var(--sal) - 16px);
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
    line-height: 20px;
    .character-img {
      width: 55px;
      height: 55px;
      min-width: 55px;
      margin-right: 10px;
    }
  }
  .cursor {
    position: absolute;
    z-index: 9;
    background-color: white;
  }
`;

export const ImageContainer = styled.div`
  height: 100%;
  overflow: hidden;
`;

export const DialogResponsesContainer = styled.div`
  display: flex;
  text-align: right;
  font-size: 1rem;
  margin-top: 10px;
  font-family: "ihtacs";
  justify-content: flex-end;
  > div {
    &:nth-child(1) {
      display: flex;
      flex-wrap: wrap;
      > p {
        flex-basis: 48%;
        margin: 10px 1%;
        cursor: pointer;
      }
    }
    &:nth-child(2) {
      margin-left: 10px;
    }
  }
  &.response {
    > div {
      &:nth-child(1) {
        flex: 1;
        > p {
          flex-basis: 100%;
        }
      }
    }
  }
  .action-next-scene {
    color: #a0a0a0;
    &.active {
      color: white;
    }
  }
`;

export const TutorialContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: black;
  text-shadow: none;
  z-index: 9;
`;
