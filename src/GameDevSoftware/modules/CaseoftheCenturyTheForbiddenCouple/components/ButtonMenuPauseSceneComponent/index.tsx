import styled from "styled-components";
import { ImgComponent } from "../../../../../components";
import "animate.css";
import useButtonHandleClick from "../../hooks/useButtonHandleClick";
const ButtonNextSceneStyled = styled.button`
  position: absolute;
  top: 14px;
  right: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;

type ButtonMenuPauseSceneComponentProps = {
  handleClick: () => void;
};

const ButtonMenuPauseSceneComponent: React.FC<
  ButtonMenuPauseSceneComponentProps
> = ({ handleClick }) => {
  const click = useButtonHandleClick(handleClick, true);

  return (
    <ButtonNextSceneStyled
      className="animate__animated animate__rubberBand animate__faster"
      onClick={click}
    >
      <ImgComponent src="loupe.png" />
    </ButtonNextSceneStyled>
  );
};

export default ButtonMenuPauseSceneComponent;
