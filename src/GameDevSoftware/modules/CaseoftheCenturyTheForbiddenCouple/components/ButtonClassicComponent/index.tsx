import React, { useCallback } from "react";
import styled from "styled-components";

const Button = styled.button<
  Pick<ButtonClassicComponentProps, "visible" | "disabled">
>`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: bold;
  width: 100%;
  max-width: 400px;
  margin: 6px 0;
  border: 3px solid ${({ theme }) => theme.colors.secondary};
  text-transform: uppercase;
  border-radius: 18px;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  transition:
    transform 0.1s ease-in-out,
    opacity 0.3s ease-in-out,
    visibility 0.3s ease-in-out;

  /* --- Dimensionnement fluide avec clamp() --- */

  /* clamp(MIN, PREFERRED, MAX) */
  font-size: clamp(0.95rem, 0.85rem + 0.5vw, 1.2rem);
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

  opacity: ${({ visible }) => (visible ? 1 : 0)};
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  pointer-events: ${({ visible }) => (visible ? "auto" : "none")};

  ${({ disabled }) =>
    disabled
      ? `
  opacity: 0.7;
  `
      : `
        &:hover {
    transform: scale(1.05);
  }
      `}
`;

type ButtonClassicComponentProps = {
  children: React.ReactNode;
  visible?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

const ButtonClassicComponent: React.FC<ButtonClassicComponentProps> = (
  props
) => {
  const { children, visible = false, disabled = false, onClick } = props;

  const handleClick = useCallback(() => {
    if (disabled || !onClick) {
      return;
    }
    onClick();
  }, [disabled]);

  return (
    <Button visible={visible} disabled={disabled} onClick={handleClick}>
      {children}
    </Button>
  );
};

export default ButtonClassicComponent;
