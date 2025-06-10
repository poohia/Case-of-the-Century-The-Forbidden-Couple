import styled from "styled-components";

export const SceneGifWithTextContainer = styled.div<{ $nextManuelly: boolean }>`
  width: 100%;
  height: 100%;
  max-width: 1920px;
  max-height: 1080px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${(props) => props.$nextManuelly && "cursor: pointer;"}
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
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
