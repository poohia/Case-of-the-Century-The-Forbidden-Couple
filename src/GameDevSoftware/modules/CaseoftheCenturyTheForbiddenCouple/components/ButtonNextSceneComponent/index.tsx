import styled from "styled-components";
import { ImgComponent } from "../../../../../components";
import "animate.css";
const ButtonNextSceneStyled = styled.button`
  position: absolute;
  bottom: 14px;
  right: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;

type ButtonNextSceneComponentProps = {
  handleClick: () => void;
};

const ButtonNextSceneComponent: React.FC<ButtonNextSceneComponentProps> = ({
  handleClick,
}) => {
  return (
    <ButtonNextSceneStyled
      className="animate__animated animate__rubberBand animate__faster"
      onClick={handleClick}
    >
      <ImgComponent src="arrow-next.png" />
    </ButtonNextSceneStyled>
  );
};

export default ButtonNextSceneComponent;
