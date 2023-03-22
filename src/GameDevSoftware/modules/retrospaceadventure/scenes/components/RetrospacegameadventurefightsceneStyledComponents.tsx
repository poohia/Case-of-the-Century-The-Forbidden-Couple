import styled from "styled-components";

export const ContainerComponent = styled.div`
  height: 100%;
  color: white;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-right: var(--sar);
`;

export const ContainerRowComponent = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const ContainerRowFightCenter = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  > div {
    flex: 1;
  }
`;

export const CardCharacter = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 5px;
`;

export const HeroCardCharacter = styled(CardCharacter)`
  > div {
    &:nth-child(2) {
      position: relative;
      margin-left: 1%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 50px;
      }
    }
    &:nth-child(1) {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      > div {
        &:nth-child(1) {
          margin-bottom: 5px;
        }
      }
    }
  }
`;

export const EnemyCardCharacter = styled(CardCharacter)`
  > div {
    &:nth-child(1) {
      position: relative;
      margin-right: 1%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 50px;
      }
    }
    &:nth-child(2) {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      > div {
        &:nth-child(1) {
          margin-bottom: 5px;
        }
      }
    }
  }
`;

export const EnemyCardChoiceSelected = styled.div`
  position: absolute;
  bottom: -50px;
  left: 0;
  background: white;
  border-radius: 7px;
  box-shadow: 0 2px 3px rgb(0 0 0 / 40%);
  width: 60px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  img {
    width: 24px !important;
  }
  &:before {
    position: absolute;
    z-index: -1;
    content: "";
    right: calc(50% - 10px);
    top: -8px;
    border-style: solid;
    border-width: 0 10px 10px 10px;
    border-color: transparent transparent white transparent;
    transition-duration: 0.3s;
    transition-property: transform;
  }
`;

export const HeroCardChoiceSelected = styled.div`
  position: absolute;
  top: -50px;
  right: 18px;
  background: white;
  border-radius: 7px;
  box-shadow: 0 2px 3px rgb(0 0 0 / 40%);
  width: 60px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  img {
    width: 24px !important;
  }
  &:before {
    position: absolute;
    z-index: -1;
    content: "";
    right: calc(50% - 10px);
    bottom: -8px;
    border-style: solid;
    border-width: 0px 10px 10px 10px;
    border-color: transparent transparent white transparent;
    transition-duration: 0.3s;
    transition-property: transform;
    transform: rotate(180deg);
  }
`;
