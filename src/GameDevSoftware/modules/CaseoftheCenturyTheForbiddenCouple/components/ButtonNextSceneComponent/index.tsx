import styled from "styled-components";
import { ImgComponent } from "../../../../../components";
import "animate.css";
import { useButtonHandleClick } from "../../../../../hooks";
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
  const click = useButtonHandleClick();

  return (
    <ButtonNextSceneStyled
      className="animate__animated animate__rubberBand animate__faster"
      onClick={(e) =>
        click(e, {
          callback: handleClick,
          playSound: true,
        })
      }
    >
      <ImgComponent src="arrow-next.png" />
    </ButtonNextSceneStyled>
  );
};

export default ButtonNextSceneComponent;
