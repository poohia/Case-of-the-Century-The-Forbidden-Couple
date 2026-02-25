import React, { useCallback, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";

import { useButtonHandleClick } from "../../hooks";
import TranslationComponent from "../TranslationComponent";
import ImgComponent from "../ImgComponent";
import { useGameProvider } from "../../gameProvider";

export type ButtonClassicType = {
  key: string;
  idText: string;
  animate?: boolean;
  activate?: boolean;
  disabled?: boolean;
  notify?: boolean;
};

const StyledButton = styled.button<
  Pick<
    ButtonClassicComponentProps,
    "visible" | "disabled" | "activate" | "notify"
  >
>`
  background-color: ${({ theme }) => theme.default_button.background_color};
  color: ${({ theme }) => theme.default_button.color};
  border: ${({ theme }) => theme.default_button.border ?? "none"};

  font-weight: bold;
  width: 100%;
  max-width: 400px;
  margin: 6px 0;
  min-height: 55px;
  text-transform: uppercase;
  border-radius: 10px;
  font-family: var(--primaryFont, sans-serif);
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  position: relative;
  z-index: 1;

  /* --- Dimensionnement fluide avec clamp() --- */

  /* clamp(MIN, PREFERRED, MAX) */
  font-size: clamp(0.95rem, 0.85rem + 0.3vw, 1.1rem);
  /* Explication font-size:
     - MIN (0.95rem): Taille minimale absolue (pour mobile)
     - PREFERRED (0.85rem + 0.5vw): Taille idéale qui grandit légèrement avec la largeur du viewport (vw).
       Ajustez le '0.85rem' (base) et '0.5vw' (facteur de croissance) pour obtenir la vitesse de scaling souhaitée.
     - MAX (1.2rem): Taille maximale absolue (pour desktop)
  */

  padding: clamp(0.5rem, 0.4rem + 0.5vw, 0.7rem)
    clamp(1.5rem, 1.3rem + 0.8vw, 2rem);
  /* Explication padding:
     - Vertical: clamp(0.5rem, 0.4rem + 0.5vw, 0.7rem)
       - MIN: 0.5rem (mobile)
       - PREFERRED: 0.4rem base + 0.5vw (scaling doux)
       - MAX: 0.7rem (desktop)
     - Horizontal: clamp(1.5rem, 1.3rem + 0.8vw, 2rem)
       - MIN: 1.5rem (mobile)
       - PREFERRED: 1.3rem base + 0.8vw (scaling un peu plus rapide que vertical)
       - MAX: 2rem (desktop)
  */

  ${({ disabled }) =>
    disabled
      ? `
  opacity: 0.7;
  `
      : `
  }
      `}

  ${({ activate, theme }) =>
    activate
      ? `
        background-color: ${theme.default_button.background_color_active};
        color: ${theme.default_button.color_active};
      `
      : ""}

      span {
    text-align: center;
    text-align-last: center;
  }
  ${({ notify, theme }) =>
    notify
      ? `
  &::after {
      content: "";
      position: absolute;
      top: -8px;
      right: -2px;
      width: 12px;
      height: 12px;
      background: ${theme.default_button.color_notify};
      border-radius: 50%;
    }
  `
      : ""}

  img.btn-cta-img {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    box-shadow:
      rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
      rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  }
`;

type ButtonClassicComponentProps = {
  children: React.ReactNode;
  visible?: boolean;
  activate?: boolean;
  disabled?: boolean;
  animate?: boolean;
  notify?: boolean;
  pulse?: boolean;
  tabIndex?: number;
  isIconOnly?: boolean;
  onClick?: () => void;
};

const ButtonClassicComponent: React.FC<ButtonClassicComponentProps> = (
  props
) => {
  const {
    disabled,
    visible,
    activate,
    children,
    animate = true,
    notify,
    pulse,
    tabIndex,
    isIconOnly = false,
    onClick,
  } = props;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { getThemeValue } = useGameProvider();

  const backgroundImg = useMemo(
    () => getThemeValue("default_button", "background_image"),
    []
  );
  const backgroundImgActive = useMemo(
    () => getThemeValue("default_button", "background_image_active"),
    []
  );

  const showBackgroundImg = useMemo(() => {
    if (isIconOnly) {
      return false;
    }
    if (!activate && backgroundImg) {
      return true;
    }
    if (activate && backgroundImgActive) {
      return true;
    }
    return false;
  }, [isIconOnly, activate, backgroundImg, backgroundImgActive]);

  const backgroundImage = useMemo(() => {
    if (!showBackgroundImg) {
      return null;
    }
    if (!activate && backgroundImg) {
      return backgroundImg;
    } else if (activate && backgroundImgActive) {
      return backgroundImgActive;
    }
    return null;
  }, [showBackgroundImg, activate, backgroundImg, backgroundImgActive]);

  const click = useButtonHandleClick();
  const triggerPulse = useCallback(() => {
    const element = buttonRef.current;
    if (!element || !animate) {
      return;
    }

    const animationClasses = ["animate__pulse"];
    const handleAnimationEnd = () => {
      element.classList.remove(...animationClasses);
    };

    element.classList.remove(...animationClasses);
    element.addEventListener("animationend", handleAnimationEnd, {
      once: true,
    });
    element.classList.add(...animationClasses);
  }, [animate]);

  const handleClick = useCallback(
    (event: React.MouseEvent<any, MouseEvent>) => {
      click(event, {
        callback: () => {
          const element = buttonRef.current;

          // Ne rien faire si désactivé, pas visible, ou pas de handler onClick
          if (
            disabled ||
            !visible ||
            !element ||
            activate ||
            onClick === undefined
          ) {
            return;
          }

          if (animate) {
            triggerPulse();
            setTimeout(() => {
              onClick();
            });
          } else {
            onClick();
          }
        },
        playSound: true,
      });
    },
    [animate, disabled, visible, onClick, activate, click, triggerPulse]
  );

  useEffect(() => {
    triggerPulse();
  }, [triggerPulse]);

  return (
    <StyledButton
      ref={buttonRef}
      visible={visible}
      disabled={disabled}
      activate={activate}
      notify={notify}
      aria-hidden={!visible}
      aria-describedby={notify ? "btn-notify-desc" : undefined}
      tabIndex={tabIndex}
      className={`${
        animate ? "animate__animated animate__faster" : ""
      } ${pulse ? "animate__animated animate__tada" : ""}`}
      onClick={handleClick}
    >
      {children}
      {notify && (
        <span id="btn-notify-desc" className="sr-only" aria-live="polite">
          <TranslationComponent id="label_button_notify_sr" />
        </span>
      )}
      {showBackgroundImg && backgroundImage && (
        <ImgComponent
          className="btn-cta-img"
          src={backgroundImage}
          aria-hidden="true"
          forceMaxSize={false}
        />
      )}
    </StyledButton>
  );
};

export default ButtonClassicComponent;
