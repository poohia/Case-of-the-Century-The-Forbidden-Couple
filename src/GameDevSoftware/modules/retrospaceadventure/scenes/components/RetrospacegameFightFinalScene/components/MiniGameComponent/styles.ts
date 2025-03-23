import styled from "styled-components";

export const RetrospaceadventureMiniGameContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  /* transform: translate(-50%, -50%); */
  --offset: 10px;
  width: calc(100% - var(--offset));
  height: calc(100% - var(--offset));
  margin: calc(var(--offset) / 2);
  /* margin: 2% 2%; */
  /* padding: 10px; */
  z-index: 11;
  color: white;
  /* @keyframes reduce {
    from {
      width: 160%;
      height: 160%;
      background: green;
    }
    to {
      width: 90%;
      height: 90%;
      background: red;
    }
  } */
  > div {
    position: absolute;
    visibility: hidden;
    &:last-child {
      display: flex;
      justify-content: space-between;
    }
  }
  svg {
    width: 100%;
    height: 100%;
  }
`;

export const HomePageGameContainer = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  > div {
    flex: 1;
    width: 100%;

    &:nth-child(1) {
      padding: 10px;
      video {
        width: 100%;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 100%;
      .text-animation-chatgpt {
        overflow: auto;
        flex: 1;
      }

      .cursor {
        position: absolute;
        z-index: 9;
        background-color: white;
      }
    }
    p {
      cursor: pointer;
      margin: 40px 0;
    }
  }
  .home-page-text-description {
    padding: 5px;
    line-height: 30px;
    overflow-y: auto;
    height: 100%;
    p {
      margin: 0;
    }
  }
`;

export const LoadingComponentContainer = styled.div<{}>`
  color: white;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  // display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: center;
  align-items: center;
  > div {
    // background: #03e3fc;
    background: transparent;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 7px;
  }
  canvas {
    // width: 100%;
    // height: 100%;
  }
  video {
    position: absolute;
    width: 100%;
    height: 97%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    object-fit: fill;
    border-radius: 7px;
  }
`;
