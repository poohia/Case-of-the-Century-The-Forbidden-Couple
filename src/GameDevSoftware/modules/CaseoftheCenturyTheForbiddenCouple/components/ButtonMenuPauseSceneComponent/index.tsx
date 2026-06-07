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
  @keyframes phoneVibrate {
    0%,
    100% {
      transform: translate3d(0, 0, 0) rotate(0deg);
    }

    10% {
      transform: translate3d(-2px, 0, 0) rotate(-6deg);
    }

    20% {
      transform: translate3d(2px, 0, 0) rotate(6deg);
    }

    30% {
      transform: translate3d(-3px, 0, 0) rotate(-8deg);
    }

    40% {
      transform: translate3d(3px, 0, 0) rotate(8deg);
    }

    50% {
      transform: translate3d(-2px, 0, 0) rotate(-6deg);
    }

    60% {
      transform: translate3d(2px, 0, 0) rotate(6deg);
    }

    70% {
      transform: translate3d(-1px, 0, 0) rotate(-3deg);
    }

    80% {
      transform: translate3d(1px, 0, 0) rotate(3deg);
    }
  }

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

  button.phone-vibrate {
    transform-origin: 50% 18%;
    animation: phoneVibrate 1.2s ease-in-out infinite;
    filter: drop-shadow(0 8px 18px rgba(0, 0, 0, 0.18));
  }

  @media (prefers-reduced-motion: reduce) {
    button.phone-vibrate {
      animation: none;
      transform: none;
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
