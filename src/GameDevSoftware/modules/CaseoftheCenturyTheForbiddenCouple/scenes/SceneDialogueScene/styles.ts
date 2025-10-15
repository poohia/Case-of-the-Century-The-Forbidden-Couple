import styled from "styled-components";
import { ImgComponent } from "../../../../../components";
import { SceneComicsDoubleProps } from "../../../../game-types";

export const SceneDialogueContainer = styled.section<{
  $backgroundUrl: string;
  $backgroundResponseUrl: string;
  $nextManuelly: boolean;
}>`
  height: 100%;
  background: url(${(props) => props.$backgroundUrl}) no-repeat;
  background-size: cover;
  position: relative;
  ${(props) => props.$nextManuelly && "cursor: pointer;"}

  .list-responses {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    height: 100%;
    overflow-y: auto;
    position: relative;
    top: -15px;
    left: -20px;
    width: calc(100% + 36px);
    height: calc(100% + 22px);
    > div {
      background: url(${(props) => props.$backgroundResponseUrl}) no-repeat
        center;
      background-size: 100% 100%;
      cursor: pointer;
      flex-basis: calc(50% - 2px - 2% - 4px - 4px);
      min-height: calc(36% - 4px);
      margin: 1%;
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: center;
      border-radius: 7px;
      span {
        width: 74%;
        font-size: var(--font-size);
      }
    }
  }
`;

export const ImgBoxDialogContainer = styled(ImgComponent)<{
  $boxDialog: SceneComicsDoubleProps["boxDialog"];
}>`
  position: absolute;
  top: calc(${(props) => props.$boxDialog.top}% - 20px);
  left: calc(${(props) => props.$boxDialog.left}% - 30px);
  width: calc(${(props) => props.$boxDialog.width}% + 60px);
  height: calc(${(props) => props.$boxDialog.height}% + 40px);
`;

export const CharacterViewContainer = styled(ImgComponent)<{
  $boxDialog: SceneComicsDoubleProps["boxDialog"];
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -65%);
  width: 75vh;
  height: 75vh;
`;

export const VisualNovelTextContainer = styled.div<{ $fontFamily?: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  /* font-size: clamp(1.25rem, 2.5vw + 0.5rem, 2.5rem); */
  font-size: ${({ theme }) => theme.fonts.size};
  line-height: ${({ theme }) => theme.fonts.lineHeight};

  text-align: justify;

  font-family: ${({ $fontFamily }) => $fontFamily};
`;
