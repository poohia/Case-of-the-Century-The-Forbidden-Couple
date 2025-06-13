import styled from "styled-components";
import { ImgComponent } from "../../../../../components";
import { SceneComicsDoubleProps } from "../../../../game-types";

export const SceneDialogueContainer = styled.div<{
  $backgroundUrl: string;
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
    > div {
      cursor: pointer;
      flex-basis: calc(48% - 2px);
      margin: 1%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px dashed black;
      border-radius: 7px;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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
