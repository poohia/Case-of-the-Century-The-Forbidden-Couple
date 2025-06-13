import styled from "styled-components";

export const SceneDialogueContainer = styled.div<{
  $backgroundUrl: string;
}>`
  height: 100%;
  background: url(${(props) => props.$backgroundUrl}) no-repeat;
  background-size: cover;
`;
