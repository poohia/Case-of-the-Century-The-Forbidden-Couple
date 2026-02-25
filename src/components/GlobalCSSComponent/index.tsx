import { createGlobalStyle } from "styled-components";

import { ColorModeTypes, Platform, SizeTextTypes } from "../../types";

const GlobalCSSComponent = createGlobalStyle<{
  background?: string;
  primaryFont?: string;
  platform: Platform | null;
  activatedDyslexia?: boolean;
  sizeText: SizeTextTypes;
  colorMode: ColorModeTypes;
}>`
  body {
    margin: 0;
    height: 100vh;
    overflow: hidden;
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
      outline: none;  
    }

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
      case "protanopia":
        return `html body { filter: sepia(0.3) saturate(1.5) hue-rotate(-15deg); }`;
      case "deuteranopia":
        return `html body { filter: sepia(0.2) saturate(1.4) hue-rotate(-20deg); }`;
      case "tritanopia":
        return `html body { filter: sepia(0.3) saturate(1.2) hue-rotate(30deg); }`;
      case "achromatopsia":
        return `html body { filter: grayscale(100%); }`;
      case "high-contrast":
        return `html body { filter: grayscale(10%) contrast(1.15) brightness(1.05); }`;
      case "normal":
      default:
        return "";
    }
  }}
  
  /* screen reader only */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
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
`;

export default GlobalCSSComponent;
