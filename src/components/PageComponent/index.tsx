import styled from "styled-components";

const PageComponent = styled.div`
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  user-select: none;
`;

export default PageComponent;
