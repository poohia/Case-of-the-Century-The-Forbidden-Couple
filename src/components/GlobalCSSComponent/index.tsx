import { createGlobalStyle } from "styled-components";

const GlobalCSSComponent = createGlobalStyle<{ backgroundColor?: string }>`
    body{
        margin: 0;
        padding: 0;
        height: 100vh;
        overflow: hidden;
        background:  ${(props) => props.backgroundColor || "transparent"};
        &::-webkit-scrollbar {
            display: none;
          }
        user-select: none;
    }
    #app{
        background-color: transparent;
        overflow: hidden;
    }
    img {
        -webkit-user-drag: none;
    }
`;

export default GlobalCSSComponent;
