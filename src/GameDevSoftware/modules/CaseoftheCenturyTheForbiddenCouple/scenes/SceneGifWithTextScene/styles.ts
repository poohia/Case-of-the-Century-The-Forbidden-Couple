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
  img.image-background {
    width: 100%;
    height: 100%;
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
    top: calc(30% - 14px);
    left: calc(7% - 20px);
    width: calc(38% + 40px);
    height: calc(36% + 34px);
  }
`;

export const SceneGifWithTextContainerCadreContainer = styled.img`
  position: absolute;
  top: 17%;
  left: 7%;
  width: 34%;
  height: 33%;
`;

export const SceneGifWithTextTextContainer = styled.section<{
  $showBuble?: boolean;
  $fontFamily: string;
}>`
  position: absolute;
  top: 30%;
  left: 7%;
  width: 38%;
  height: 36%;
  ${(props) => (props.$showBuble ? "border: 1px solid black;" : "")}
  span {
    &:nth-child(2) {
      font-family: ${(props) => props.$fontFamily};
      letter-spacing: 1.4px;
    }
  }
`;

export const SceneGifWithTextContainerNameCharacter = styled.div`
  position: absolute;
  top: calc(30% - 35px);
  left: calc(7% - 11px);
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 3px;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  padding: 4px 10px;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: clamp(0.95rem, 1rem + 0.3vw, 1.4rem);
  span {
    font-size: var(--font-size);
  }
`;
