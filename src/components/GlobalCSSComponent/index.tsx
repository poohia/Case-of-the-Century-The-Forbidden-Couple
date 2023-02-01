import { createGlobalStyle } from "styled-components";
import { Platform } from "../../types";

const GlobalCSSComponent = createGlobalStyle<{
  backgroundColor?: string;
  platform: Platform | null;
}>`
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
    body{
        margin: 0;
        height: 100vh;
        overflow: hidden;
        background:  ${(props) => props.backgroundColor || "transparent"};
        &::-webkit-scrollbar {
            display: none;
          }
    //    padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
        --sat: env(safe-area-inset-top);
        --sar: env(safe-area-inset-right);
        --sab: env(safe-area-inset-bottom);
        --sal: env(safe-area-inset-left);
    }
    #app{
        background-color: transparent;
        overflow: hidden;
        overflow-y: auto;
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
    }
    img {
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
        user-drag: none;
    }
    @keyframes fadein {
      from {
          opacity:0;
      }
      to {
          opacity:1;
      }
  }
`;

export default GlobalCSSComponent;
