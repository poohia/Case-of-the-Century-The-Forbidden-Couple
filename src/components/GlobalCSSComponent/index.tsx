import { createGlobalStyle } from "styled-components";

const GlobalCSSComponent = createGlobalStyle<{ backgroundColor?: string }>`
    body{
        margin: 0;
        padding: 0;
        height: 100vh;
        overflow: hidden;
        background-color:  ${(props) => props.backgroundColor || "blue"};
    }
    #app{
        background-color: orange;
    }
`;

export default GlobalCSSComponent;
