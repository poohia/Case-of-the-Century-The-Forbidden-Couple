import styled from "styled-components";

import {
  SceneComicsDoubleImgBoxDialog,
  SceneComicsDoubleTextTextContainer,
} from "../SceneComicsDoubleScene/styles";
import { SceneGifWithTextContainer } from "../SceneGifWithTextScene/styles";

export const SceneComicsNarratorContainer = styled(SceneGifWithTextContainer)`
  img.image-background {
    object-position: unset;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

export const SceneComicsNarratorImgBoxDialog = styled(
  SceneComicsDoubleImgBoxDialog
)`
  top: calc(${(props) => props.$boxDialog.top}% - 8px);
  left: calc(${(props) => props.$boxDialog.left}% - 19px);
  width: calc(${(props) => props.$boxDialog.width}% + 27px);
  height: calc(${(props) => props.$boxDialog.height}% + 15px);
  max-height: calc(1080px - 20px);
`;

export const SceneComicsNarratorTextTextContainer = styled(
  SceneComicsDoubleTextTextContainer
)`
  > div {
    > div {
      padding: 0;
      span {
        // margin: 0;
      }
    }
  }
  .continue-arrow-container {
    right: 6%;
    bottom: 12%;
  }
`;
