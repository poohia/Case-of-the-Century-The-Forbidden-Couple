import styled from "styled-components";
import { SceneGifWithTextTextContainer } from "../SceneGifWithTextScene/styles";
import {
  BoxCharacterNamePosition,
  SceneComicsDoubleProps,
} from "../../../../game-types";
import { ImgComponent } from "../../../../../components";

export const SceneComicsDoubleTextTextContainer = styled(
  SceneGifWithTextTextContainer
)<{ $boxDialog: SceneComicsDoubleProps["boxDialog"] }>`
  top: ${(props) => props.$boxDialog.top}%;
  left: ${(props) => props.$boxDialog.left}%;
  width: ${(props) => props.$boxDialog.width}%;
  height: ${(props) => props.$boxDialog.height}%;
`;

export const SceneComicsDoubleImgBoxDialog = styled(ImgComponent)<{
  $boxDialog: SceneComicsDoubleProps["boxDialog"];
}>`
  position: absolute;
  max-width: 1920px;
  max-height: 365px;
  top: calc(${(props) => props.$boxDialog.top}% - 18px);
  left: calc(${(props) => props.$boxDialog.left}% - 25px);
  width: calc(${(props) => props.$boxDialog.width}% + 50px);
  height: calc(${(props) => props.$boxDialog.height}% + 37px);
`;

export const SceneComicsDoubleCharacterName = styled.div<{
  $boxDialog: SceneComicsDoubleProps["boxDialog"];
  $position?: BoxCharacterNamePosition;
}>`
  position: absolute;
  top: calc(${(props) => props.$boxDialog.top}% - 40px);
  ${({ $position, $boxDialog }) =>
    $position === "right"
      ? `
  right: calc(${$boxDialog.left}% - 0px);
  `
      : `
  left: calc(${$boxDialog.left}% - 0px);
  `}

  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 3px;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  padding: 4px 10px;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: clamp(0.95rem, 1rem + 0.3vw, 1.4rem);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  span {
    font-size: var(--font-size);
  }
`;
