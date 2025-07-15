import styled from "styled-components";
import { ImgComponent } from "../../../../../components";
import "animate.css";
import ButtonClassicComponent from "../ButtonClassicComponent";
const ButtonNextSceneStyled = styled.div`
  button {
    position: absolute;
    top: 14px;
    right: 20px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    width: clamp(62px, 7vh, 102px);
    img {
      width: 100%;
    }
  }
`;

type ButtonMenuPauseSceneComponentProps = {
  handleClick: () => void;
};

const ButtonMenuPauseSceneComponent: React.FC<
  ButtonMenuPauseSceneComponentProps
> = ({ handleClick }) => {
  return (
    <ButtonNextSceneStyled>
      <ButtonClassicComponent onClick={handleClick} visible>
        <ImgComponent src="loupe.png" />
      </ButtonClassicComponent>
    </ButtonNextSceneStyled>
  );
};

export default ButtonMenuPauseSceneComponent;
