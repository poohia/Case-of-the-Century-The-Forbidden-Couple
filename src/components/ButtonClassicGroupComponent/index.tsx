import React, { useEffect, useState, useRef, useMemo } from "react";
import styled from "styled-components";

import ButtonClassicComponent, {
  ButtonClassicType,
} from "../ButtonClassicComponent";
import { useGameProvider } from "../../gameProvider";
import TranslationComponent from "../TranslationComponent";

export type ButtonClassicGroupComponentProps = {
  buttons: ButtonClassicType[];
  show?: boolean;
  delayBetweenButtons?: number;
  onClick?: (key: string) => void;
  direction?: "column" | "row";
  // autofocus force focus at 0
  autoFocus?: boolean;
  focus?: number;
  disabled?: boolean;
};

const ButtonClassicGroupContainer = styled.div<{
  direction: "column" | "row";
  $disabled: boolean;
}>`
  display: flex;
  justify-content: var(--button-action-group-justify-content);
  align-items: center;
  width: 100%;
  gap: 15px;
  opacity: ${({ $disabled }) => ($disabled ? 0.55 : 1)};

  flex-direction: ${(props) => props.direction};

  ${(props) =>
    props.direction === "row" &&
    `
    flex-wrap: wrap;
    > button{
    width: auto; 
    flex-basis: 48%;
    }
  `}
`;

const ButtonClassicGroupComponent: React.FC<
  ButtonClassicGroupComponentProps
> = ({
  buttons,
  show = false,
  delayBetweenButtons,
  onClick,
  direction = "column",
  autoFocus = false,
  focus,
  disabled = false,
}) => {
  const [buttonsToShow, setButtonsToShow] = useState<string[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { parameters } = useGameProvider();
  const [isAlreadyShowed, setIsAlreadyShowed] = useState<boolean>(false);

  const finalDelayBetweenButtons = useMemo(() => {
    if (parameters.screenReaderEnabled || isAlreadyShowed) {
      return 0;
    }
    if (delayBetweenButtons !== undefined) {
      return delayBetweenButtons;
    }
    return 200;
  }, [parameters, isAlreadyShowed]);

  useEffect(() => {
    const clearExistingInterval = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    clearExistingInterval();
    setButtonsToShow([]);

    if (show && buttons.length > 0) {
      intervalRef.current = setInterval(() => {
        setButtonsToShow((currentVisibleKeys) => {
          if (currentVisibleKeys.length >= buttons.length) {
            clearExistingInterval();
            return currentVisibleKeys;
          }
          const nextButtonKey = buttons[currentVisibleKeys.length].key;
          return [...currentVisibleKeys, nextButtonKey];
        });
      }, finalDelayBetweenButtons);
    }

    return clearExistingInterval;
  }, [show, buttons, finalDelayBetweenButtons]);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setIsAlreadyShowed(true);
      }, buttons.length * finalDelayBetweenButtons);
    }
  }, [show]);

  if (finalDelayBetweenButtons === 0) {
    return (
      <ButtonClassicGroupContainer direction={direction} $disabled={disabled}>
        {buttons.map((button, i) => (
          <ButtonClassicComponent
            focus={(i === 0 && autoFocus) || (focus === i && !autoFocus)}
            visible
            {...button}
            disabled={disabled || button.disabled}
            onClick={() => {
              if (onClick && !disabled && !button.disabled) {
                onClick(button.key);
              }
            }}
            key={`button-${button.key}`}
          >
            <TranslationComponent id={button.idText} />
          </ButtonClassicComponent>
        ))}
      </ButtonClassicGroupContainer>
    );
  }

  return (
    <ButtonClassicGroupContainer direction={direction} $disabled={disabled}>
      {buttons.map((button) => {
        if (buttonsToShow.includes(button.key)) {
          return (
            <ButtonClassicComponent
              visible
              {...button}
              disabled={disabled || button.disabled}
              onClick={() => {
                if (onClick && !disabled && !button.disabled) {
                  onClick(button.key);
                }
              }}
              key={`button-${button.key}`}
            >
              <TranslationComponent id={button.idText} />
            </ButtonClassicComponent>
          );
        }
        // Il est préférable de retourner null pour les éléments qui ne sont pas affichés
        return null;
      })}
    </ButtonClassicGroupContainer>
  );
};

export default ButtonClassicGroupComponent;
