import React, { useEffect, useState, useRef, useMemo } from "react";
import styled from "styled-components";

import ButtonClassicComponent, {
  ButtonClassicType,
} from "../ButtonClassicComponent";
import { useGameProvider } from "../../gameProvider";
import TranslationComponent from "../TranslationComponent";

type ButtonClassicGroupComponentProps = {
  buttons: ButtonClassicType[];
  show?: boolean;
  delayBetweenButtons?: number;
  onClick?: (key: string) => void;
  direction?: "column" | "row";
};

const ButtonClassicGroupContainer = styled.div<{ direction: "column" | "row" }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 15px;

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
}) => {
  const [buttonsToShow, setButtonsToShow] = useState<string[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { parameters } = useGameProvider();
  const [isAlreadyShowed, setIsAlreadyShowed] = useState<boolean>(false);

  const finalDelayBetweenButtons = useMemo(() => {
    if (parameters.instantTextReveal || isAlreadyShowed) {
      return 0;
    }
    if (delayBetweenButtons) {
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
      <ButtonClassicGroupContainer direction={direction}>
        {buttons.map((button) => (
          <ButtonClassicComponent
            visible
            {...button}
            onClick={() => {
              if (onClick && !button.disabled) {
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
    <ButtonClassicGroupContainer direction={direction}>
      {buttons.map((button) => {
        if (buttonsToShow.includes(button.key)) {
          return (
            <ButtonClassicComponent
              visible
              {...button}
              onClick={() => {
                if (onClick && !button.disabled) {
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
