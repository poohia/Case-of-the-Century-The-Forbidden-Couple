import styled from "styled-components";
import { TranslationComponent } from "../../../../../components";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  color: white;
  justify-content: center;
  align-items: center;
  font-family: Audiowide;
  div {
    border: 1px dashed white;
    margin: 1px;
    width: 99%;
    height: 99%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    &:first-child {
      flex-basis: 20vw;
      span {
        margin: 10px;
      }
    }
    &:last-child {
      flex-basis: 80vw;
    }
  }
`;

const RetrospaceadventureTutorialComicScene: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => {
  return (
    <Container
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <div>
        <TranslationComponent id="retrospaceadventure_prev_info" />
      </div>
      <div>
        <TranslationComponent id="retrospaceadventure_next_info" />
      </div>
    </Container>
  );
};

export default RetrospaceadventureTutorialComicScene;
