import styled from "styled-components";

import {
  ButtonClassicComponent,
  ImgComponent,
} from "../../../../../components";
import "animate.css";

import { useContext } from "react";

import UnlockContext from "../../contexts/UnlockContext";
import { useGameProvider } from "../../../../../gameProvider";
export const ButtonNextSceneStyled = styled.div`
  button {
    position: absolute;
    top: 14px;
    right: 20px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    width: clamp(62px, 7vh, 78px);
    z-index: 1;
    --button-notify-right: -10px;
    img {
      width: 100%;
    }
    &::after {
      top: 0;
      right: -2px;
    }
  }
`;

type ButtonMenuPauseSceneComponentProps = {
  handleClick: () => void;
};

const ButtonMenuPauseSceneComponent: React.FC<
  ButtonMenuPauseSceneComponentProps
> = ({ handleClick }) => {
  const { openParameters } = useGameProvider();
  const { hasNotify, showAnimation } = useContext(UnlockContext);

  return (
    <ButtonNextSceneStyled inert={openParameters ? "" : undefined}>
      <ButtonClassicComponent
        onClick={handleClick}
        visible
        notify={hasNotify}
        pulse={showAnimation}
        isIconOnly
      >
        <ImgComponent src="loupe.png" />
      </ButtonClassicComponent>
    </ButtonNextSceneStyled>
  );
};

export default ButtonMenuPauseSceneComponent;
