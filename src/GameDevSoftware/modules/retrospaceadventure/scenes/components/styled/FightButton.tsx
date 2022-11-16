import styled from "styled-components";
import { fightTheme } from "../../themes";

const FightButton = styled.button<{ preset: "valide" | "cancel" }>`
  background: ${({
    theme,
    preset,
  }: {
    theme: typeof fightTheme;
    preset: "valide" | "cancel";
  }) => theme.button[preset].backgroundColor};
  border: 2px solid
    ${({
      theme,
      preset,
    }: {
      theme: typeof fightTheme;
      preset: "valide" | "cancel";
    }) => theme.button[preset].borderColor};
  border-radius: ${({ theme }: { theme: typeof fightTheme }) =>
    theme.button.borderRadius};
  width: ${({ theme }: { theme: typeof fightTheme }) => theme.button.width};
  height: ${({ theme }: { theme: typeof fightTheme }) => theme.button.height};
  transform-style: preserve-3d;
  transition: transform 150ms cubic-bezier(0, 0, 0.58, 1),
    background 150ms cubic-bezier(0, 0, 0.58, 1);
  transform: translate(0, 0.25em);
  :before {
    position: absolute;
    content: "";
    width: 100%;
    height: 96%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({
      theme,
      preset,
    }: {
      theme: typeof fightTheme;
      preset: "valide" | "cancel";
    }) => theme.button[preset].borderColor};
    border-radius: inherit;
    transform: translate3d(0, 0.75em, -1em);
    transition: transform 150ms cubic-bezier(0, 0, 0.58, 1),
      box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
  }
  :active {
    background: ${({
      theme,
      preset,
    }: {
      theme: typeof fightTheme;
      preset: "valide" | "cancel";
    }) => theme.button[preset].backgroundColor};
    transform: translate(0em, 0.75em);
    :before {
      transform: translate3d(0, 0, -1em);
    }
  }
  &[disabled] {
    opacity: 0.5;
    :before {
      opacity: 0;
    }
  }
`;

export default FightButton;
