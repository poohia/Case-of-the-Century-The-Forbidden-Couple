import styled from "styled-components";

export const ContainerComponent = styled.div`
  height: 100vh;
  color: white;
  overflow-y: auto;
  background-color: black;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  > div {
    flex: 1;
    &:first-child {
      flex: 2;
    }
  }
`;

export const TextContainer = styled.div`
  font-size: 1.7rem;
  padding: 10px;
  line-height: 38px;
  display: flex;
  > div {
    &:first-child {
      flex-basis: 90%;
      padding-right: 5%;
    }
  }
`;

export const IconContainer = styled.div`
  img {
    width: 42px;
    border-radius: 50%;
    border: 2px solid white;
    padding: 2px;
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 10px 0px 10px 0;
  text-align: center;
  > div {
    flex-basis: 48%;
    margin-right: 2%;
    span {
      cursor: pointer;
      padding: 5px;
      font-size: 1.3rem;
      font-style: italic;
      :before {
        content: ">";
        margin-right: 5px;
      }
    }
  }
`;
