import styled from "styled-components";

export const ContainerComponent = styled.div`
  height: 100%;
  color: white;
  overflow-y: auto;
  background-color: black;
  // padding: 15px;
  // background: url("assets/images/backgroundprimary.png");
  background: black;
  display: flex;
  > div {
    flex: 1;
  }
`;

export const ImageContainer = styled.div`
  height: 100%;
  overflow: hidden;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  img {
    // width: calc(100% - 15px);
    width: 100%;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 15px 0 15px;
  height: calc(100% - 15px);
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  > div {
    flex: 1;
    &:first-child {
      line-height: 2rem;
      font-size: 1.4rem;
    }
    &:last-child {
    }
  }
`;

export const ActionsContainer = styled.div`
  // display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 10px 0px 10px 0;
  > div {
    margin: 15px 0px;
    // flex-basis: 100%;
    // margin-right: 2%;
    span {
      cursor: pointer;
      padding: 5px;
      font-size: 1.3rem;
      font-style: italic;
      :before {
        content: ">";
        margin-right: 5px;
      }
    }
  }
`;

export const ScannerComponent = styled.div`
  width: 100%;
  z-index: 9;
  > div {
    height: 20px;
    // background-color: rgba(255, 255, 255, 0.7);
    // background-color: green;
    background: rgb(96, 148, 83);
    background: linear-gradient(
      0deg,
      rgba(96, 148, 83, 1) 13%,
      rgba(104, 194, 75, 1) 83%
    );

    // margin: 0 10px;
    // margin: 0 1px;
    // border-radius: 5px;
  }

  position: absolute;
  transition: top 1s linear;
`;
