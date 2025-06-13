import styled from "styled-components";
import { SceneGifWithTextTextContainer } from "../SceneGifWithTextScene/styles";
import { SceneComicsDoubleProps } from "../../../../game-types";

export const SceneComicsDoubleTextTextContainer = styled(
  SceneGifWithTextTextContainer
)<{ $boxDialog: SceneComicsDoubleProps["boxDialog"] }>`
  top: ${(props) => props.$boxDialog.top}%;
  left: ${(props) => props.$boxDialog.left}%;
  width: ${(props) => props.$boxDialog.width}%;
  height: ${(props) => props.$boxDialog.height}%;
`;
