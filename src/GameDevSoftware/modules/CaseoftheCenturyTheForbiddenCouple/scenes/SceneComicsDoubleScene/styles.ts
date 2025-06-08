import styled from "styled-components";
import { SceneGifWithTextTextContainer } from "../SceneGifWithTextScene/styles";

export const SceneComicsDoubleTextTextContainer = styled(
  SceneGifWithTextTextContainer
)<{ $boxDialog: any }>`
  top: ${(props) => props.$boxDialog.top}%;
  left: ${(props) => props.$boxDialog.left}%;
  width: ${(props) => props.$boxDialog.width}%;
  height: ${(props) => props.$boxDialog.height}%;
`;
