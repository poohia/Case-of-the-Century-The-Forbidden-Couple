import { createGlobalStyle } from "styled-components";

const GlobalCSSComponent = createGlobalStyle<{ backgroundColor?: string }>`
    body{
        margin: 0;
        height: 100vh;
        overflow: hidden;
        background:  ${(props) => props.backgroundColor || "transparent"};
        &::-webkit-scrollbar {
            display: none;
          }
       padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
        --sat: env(safe-area-inset-top);
        --sar: env(safe-area-inset-right);
        --sab: env(safe-area-inset-bottom);
        --sal: env(safe-area-inset-left);
    }
    #app{
       background-color: transparent;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
    }
`;

export default GlobalCSSComponent;
