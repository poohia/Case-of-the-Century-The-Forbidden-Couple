import { createGlobalStyle } from "styled-components";

const GlobalCSSComponent = createGlobalStyle<{ backgroundColor?: string }>`
    body{
        margin: 0;
        padding: 0;
        height: 100vh;
        overflow: hidden;
        background:  ${(props) => props.backgroundColor || "transparent"};
    }
    #app{
        background-color: transparent;
    }
`;

export default GlobalCSSComponent;
