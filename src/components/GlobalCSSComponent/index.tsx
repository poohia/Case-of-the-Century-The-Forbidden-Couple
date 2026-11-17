import { createGlobalStyle } from "styled-components";

import { ColorModeTypes, Platform, SizeTextTypes } from "../../types";
import { ThemeMap } from "../../gameProvider/hooks/useTheme";

const focusRingCss = (theme?: ThemeMap) => `
  outline: ${theme?.screen_reader?.outline ?? "4px solid #ffd60a"};
  outline-offset: ${theme?.screen_reader?.outline_offset ?? "2px"};
  box-shadow: ${theme?.screen_reader?.outline_inner ?? "0 0 0 2px #000000"};
`;

/**
 * Filtres d'image pilotés par le thème (groupe `images`) : `filter` pour toutes
 * les images du moteur, `background_filter` pour `.image-background`,
 * `character_filter` pour `.image-character`. Une valeur vide ou "none" n'émet
 * aucune règle (aucun coût). Les GIF sont toujours exclus : un filtre
 * recalculé à chaque image de l'animation serait coûteux.
 */
const imageFilterCss = (theme?: ThemeMap) => {
  const rule = (selector: string, value?: string) =>
    value && value !== "none"
      ? `${selector}:not([src*=".gif" i]) { filter: ${value}; }`
      : "";
  return [
    rule("img[data-gds-img]", theme?.images?.filter),
    rule(
      "img[data-gds-img].image-background",
      theme?.images?.background_filter
    ),
    rule("img[data-gds-img].image-character", theme?.images?.character_filter),
  ].join("\n");
};

const GlobalCSSComponent = createGlobalStyle<{
  theme: ThemeMap;
  background?: string;
  primaryFont?: string;
  platform: Platform | null;
  screenReaderEnabled?: boolean;
  activatedDyslexia?: boolean;
  sizeText: SizeTextTypes;
  colorMode: ColorModeTypes;
}>`
  html {
    text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }

  body {
    margin: 0;
    height: 100vh;
    overflow: hidden;
    text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    // background:  ${(props) => props.background || "transparent"};
    
    //    padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
    --sat: env(safe-area-inset-top);
    --sar: env(safe-area-inset-right);
    --sab: env(safe-area-inset-bottom);
    --sal: env(safe-area-inset-left);

    --background: ${(props) => props.background || "transparent"};
    --primaryFont: ${(props) => props.primaryFont || "auto"};
    --font-size: ${({ sizeText, activatedDyslexia }) => {
      switch (sizeText) {
        case "small":
          if (activatedDyslexia) {
            return "60%";
          }
          return "70%";
        case "tall":
          if (activatedDyslexia) {
            return "140%";
          }
          return "150%";
        case "normal":
        default:
          if (activatedDyslexia) {
            return "90%";
          }
          return "100%";
      }
    }};
    
    *{
      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome and Opera */
      
      &::-webkit-scrollbar {
          display: none;
        }
      -webkit-tap-highlight-color: rgba(255, 255, 255, 0); 
      -webkit-focus-ring-color: rgba(255, 255, 255, 0); 
      /* outline: none;   */
    }

    ${(props) =>
      props.screenReaderEnabled
        ? `
        button:focus,
        a:focus,
        input:focus {
          ${focusRingCss(props.theme)}
        }
    `
        : `
        `}

      ${(props) => `
          button:focus-visible,
          a:focus-visible,
          input:focus-visible {
            ${focusRingCss(props.theme)}
          }
      `}


    video::-webkit-media-controls-overlay-play-button {
      display: none;
    }
  }
    
  #app {
    background-color: transparent;
    overflow: hidden;
    overflow-y: auto;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background:  ${(props) => props.background || "#2b2b2b"};
    background-size: cover;
    font-family: ${(props) => props.primaryFont || "auto"};
    text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }

  img {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
  }

  ${({ colorMode }) => {
    switch (colorMode) {
      case "darkandwhite":
        return `html body { filter: grayscale(1) contrast(1.15) brightness(1.02); }`;
      case "normal":
      default:
        return "";
    }
  }}
  
  ${(props) => imageFilterCss(props.theme)}

  /* screen reader only */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  ${({ platform }) =>
    platform === "browserandroid"
      ? `html { height: 100vh; 
          overflow: auto; 
      }
      `
      : ""}
         
  ${({ platform }) =>
    platform === "browserios"
      ? `html { height: 101vh; 
        overflow: auto; 
    }`
      : ""}  
      
  ${({ activatedDyslexia }) =>
    activatedDyslexia
      ? `
          html body, html body * {
            font-family: 'OpenDyslexicAlta-Regular', var(--primaryFont) !important;
          }
        `
      : ""}

  
    @keyframes blink {
      0%,
      100% {
        opacity: 1;
      }

      45% {
        opacity: 1;
      }

      55% {
        opacity: 0.25;
      }

      65% {
        opacity: 1;
      }
    }
`;

export default GlobalCSSComponent;
