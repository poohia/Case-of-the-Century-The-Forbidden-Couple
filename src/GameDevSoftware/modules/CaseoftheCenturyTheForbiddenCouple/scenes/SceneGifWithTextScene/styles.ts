import styled from "styled-components";

export const SceneGifWithTextContainer = styled.div<{ $nextManuelly: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${(props) => props.$nextManuelly && "cursor: pointer;"}
  img.image-background {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
    object-position: center top;
  }
  img.image-box-buble {
    position: absolute;
    top: calc(77% - 20px);
    left: calc(11% - 30px);
    width: calc(81% + 60px);
    height: calc(16% + 40px);
    max-width: 1920px;
    max-height: 365px;
  }
  img.image-box-buble-gif-scene {
    position: absolute;
    top: calc(17% - 20px);
    left: calc(7% - 30px);
    width: calc(34% + 60px);
    height: calc(33% + 40px);
  }
`;

export const SceneGifWithTextContainerCadreContainer = styled.img`
  position: absolute;
  top: 17%;
  left: 7%;
  width: 34%;
  height: 33%;
  background: url();
`;

export const SceneGifWithTextTextContainer = styled.section<{
  $showBuble?: boolean;
  $fontFamily: string;
}>`
  position: absolute;
  top: 17%;
  left: 7%;
  width: 34%;
  height: 33%;
  ${(props) => (props.$showBuble ? "border: 1px solid black;" : "")}
  span {
    &:nth-child(2) {
      font-family: ${(props) => props.$fontFamily};
      letter-spacing: 1.4px;
    }
  }
`;
