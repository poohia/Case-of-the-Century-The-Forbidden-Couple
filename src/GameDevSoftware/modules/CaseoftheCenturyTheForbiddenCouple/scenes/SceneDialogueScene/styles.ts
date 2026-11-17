import styled from "styled-components";

import { ImgComponent } from "../../../../../components";
import DialogBoxFrameComponent, {
  isSolidDialogBox,
} from "../../components/DialogBoxFrameComponent";
import { SceneComicsDoubleProps } from "../../../../game-types";

/**
 * Filtre d'image du thème (`images.background_filter`) appliqué au fond de
 * scène. Le fond est un `background` CSS et non un `<img>`, donc le CSS global
 * du moteur (qui cible `img[data-gds-img]`) ne l'atteint pas.
 * Les GIF sont exclus, comme côté moteur : un filtre recalculé à chaque image
 * de l'animation serait coûteux.
 */
const backgroundFilterCss = (theme: object, url: string): string => {
  const value = (theme as { images?: { background_filter?: string } }).images
    ?.background_filter;

  if (!value || value === "none" || /\.gif(\?|#|$)/i.test(url)) {
    return "";
  }

  return `filter: ${value};`;
};

export const SceneDialogueContainer = styled.section<{
  $backgroundUrl: string;
  $backgroundResponseUrl: string;
  $nextManuelly: boolean;
}>`
  height: 100%;
  position: relative;
  /* contient le ::before en z-index négatif dans ce conteneur */
  isolation: isolate;
  ${(props) => props.$nextManuelly && "cursor: pointer;"}

  /* Le fond est porté par un ::before pour pouvoir le filtrer sans toucher aux
     enfants : un filter sur le conteneur filtrerait aussi les personnages
     (déjà filtrés par ImgComponent) et le texte du dialogue. */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background: url(${(props) => props.$backgroundUrl}) no-repeat center;
    background-size: cover;
    ${({ theme, $backgroundUrl }) => backgroundFilterCss(theme, $backgroundUrl)}
  }

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

    > button {
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
      border: none;
      color: ${({ theme }) => theme.colors.textdark};
      font-family: sans-serif;
      font-size: 1rem;
      ${({ theme }) =>
        isSolidDialogBox(theme)
          ? `
      background: ${theme.default_modal.background_color};
      border: ${theme.default_button.border || "2px solid #ffffff"};
      color: ${theme.default_modal.color};
      `
          : ""}
      span {
        /* width: 74%; */
      }
    }
  }
`;

export const ImgBoxDialogContainer = styled(DialogBoxFrameComponent)<{
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
  object-fit: contain;
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
