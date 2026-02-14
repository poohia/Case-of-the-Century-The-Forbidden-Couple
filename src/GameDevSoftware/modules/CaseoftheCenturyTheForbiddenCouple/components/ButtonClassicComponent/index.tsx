import React, { useCallback, useRef } from "react";
import styled from "styled-components";

import { useButtonHandleClick } from "../../../../../hooks";
import { ImgComponent, TranslationComponent } from "../../../../../components";

const StyledButton = styled.button<
  Pick<
    ButtonClassicComponentProps,
    "visible" | "disabled" | "activate" | "notify"
  > & { noBoxShadow: boolean }
>`
  // background-color: ${({ theme }) => theme.colors.primary};
  // background: url(assets/images/cta_img.png);
  background-color: transparent;
  position: relative;
  color: ${({ theme }) => theme.colors.textLight};
  font-weight: bold;
  width: 100%;
  max-width: 400px;
  margin: 6px 0;
  border: none;
  min-height: 55px;
  text-transform: uppercase;
  border-radius: 10px;
  font-family: var(--primaryFont, sans-serif);
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  position: relative;

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
        // background: ${theme.colors.textLight};
      
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
      background: ${theme.colors.danger};
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
  noBoxShadow?: boolean;
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
    animate,
    notify,
    pulse,
    tabIndex,
    noBoxShadow = false,
    onClick,
  } = props;
  const buttonRef = useRef<HTMLButtonElement>(null);

  const click = useButtonHandleClick();

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
            // 1. Définir les classes d'animation
            const animationClasses = ["animate__pulse"];

            // 2. Fonction pour nettoyer les classes après l'animation
            const handleAnimationEnd = () => {
              element.classList.remove(...animationClasses);
              // L'event listener est retiré automatiquement grâce à { once: true }
            };

            // 3. Nettoyer d'anciennes classes (au cas où l'utilisateur clique très vite)
            element.classList.remove(...animationClasses, "animate__pulse");

            // Force un reflow (parfois nécessaire pour relancer l'animation si les classes sont ajoutées/supprimées rapidement)
            // void element.offsetWidth; // Décommentez si l'animation ne se relance pas bien sur clics rapides

            // 4. Ajouter l'écouteur pour la fin de l'animation (sera retiré après 1 exécution)
            element.addEventListener("animationend", handleAnimationEnd, {
              once: true,
            });

            // 5. Ajouter les classes pour démarrer l'animation
            setTimeout(() => {
              element.classList.add(...animationClasses);
              // 6. Exécuter le handler onClick original fourni par le parent
              onClick();
            });
          } else {
            onClick();
          }
        },
        playSound: true,
      });
    },
    [animate, disabled, visible, onClick]
  ); // Dépendances du useCallback

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
      noBoxShadow={noBoxShadow}
      className={`${
        animate ? "animate__animated animate__faster animate__pulse" : ""
      } ${pulse ? "animate__animated animate__tada" : ""}`}
      onClick={handleClick}
    >
      {children}
      {notify && (
        <span id="btn-notify-desc" className="sr-only" aria-live="polite">
          <TranslationComponent id="message_1759052809043" />
        </span>
      )}
      {!noBoxShadow && (
        <ImgComponent
          className="btn-cta-img"
          src={activate ? "cta_active_img.png" : "cta_img.png"}
          aria-hidden="true"
          forceMaxSize={false}
        />
      )}
    </StyledButton>
  );
};

export default ButtonClassicComponent;
