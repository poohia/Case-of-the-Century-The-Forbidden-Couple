import styled from "styled-components";
import { ImgComponent } from "../../../../../components";
import "animate.css";
import useButtonHandleClick from "../../hooks/useButtonHandleClick";
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
  const click = useButtonHandleClick(handleClick);

  return (
    <ButtonNextSceneStyled
      className="animate__animated animate__rubberBand animate__faster"
      onClick={click}
    >
      <ImgComponent src="arrow-next.png" />
    </ButtonNextSceneStyled>
  );
};

export default ButtonNextSceneComponent;
