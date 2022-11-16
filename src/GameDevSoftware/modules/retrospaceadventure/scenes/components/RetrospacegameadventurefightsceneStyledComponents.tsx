import styled from "styled-components";

export const ContainerComponent = styled.div`
  height: 100vh;
  color: white;
  overflow-y: auto;
  --gradient-start: #a16bfe;
  --gradient-start-text: "#A16BFE";
  --gradient-end: #deb0df;
  --gradient-end-text: "#DEB0DF";
  background: linear-gradient(
    33deg,
    var(--gradient-start),
    var(--gradient-end)
  );
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
      margin-left: 4%;
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
      margin-right: 4%;
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
