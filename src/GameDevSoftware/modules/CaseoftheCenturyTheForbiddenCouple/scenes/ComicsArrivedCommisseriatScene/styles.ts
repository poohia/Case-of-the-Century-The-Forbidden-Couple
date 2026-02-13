import styled from "styled-components";

import {
  SceneComicsDoubleImgBoxDialog,
  SceneComicsDoubleTextTextContainer,
} from "../SceneComicsDoubleScene/styles";
import { SceneGifWithTextContainer } from "../SceneGifWithTextScene/styles";

export const SceneComicsNarratorContainer = styled(SceneGifWithTextContainer)`
  img.image-background {
    object-position: unset;
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

export const SectionObjectifs = styled.section<{ objectifsActive: boolean }>`
  position: absolute;
  top: clamp(2vh, calc(var(--sat) - 20px), calc(var(--sat)));
  left: 0;
  border: 3px solid black;
  border-left: none;
  padding: 6px;
  padding-left: clamp(6px, calc(var(--sal) - 20px), calc(var(--sal)));
  h2 {
    margin: 0;
    font-size: 1.2rem;
  }
  ul {
    margin: 8px 0 4px 0;
    font-size: 1rem;
    color: black;
    li {
      color: ${({ objectifsActive }) =>
        objectifsActive ? "black" : "rgba(0, 0, 0, 0.4)"};
    }
  }
  background-color: ${({ theme }) => theme.colors.textLight};
`;
