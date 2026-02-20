import React, { useEffect, useState, useRef, useMemo } from "react";
import styled from "styled-components";

import { TranslationComponent } from "../../../../../components";
import { ButtonClassicType } from "../../types";
import ButtonClassicComponent from "../ButtonClassicComponent";
import { useGameProvider } from "../../../../../gameProvider";

type ButtonClassicGroupComponentProps = {
  buttons: ButtonClassicType[];
  show?: boolean;
  delayBetweenButtons?: number;
  onClick?: (key: string) => void;
  direction?: "column" | "row"; // NOUVEAU : Prop pour la direction
};

// MODIFIÉ : Le styled-component accepte maintenant des props pour ajuster son style
const ButtonClassicGroupContainer = styled.div<{ direction: "column" | "row" }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 15px; // Ajout d'un espacement entre les boutons, utile dans les deux directions

  // On utilise une fonction qui reçoit les props du composant stylé
  flex-direction: ${(props) => props.direction};

  // On ajoute flex-wrap seulement si la direction est 'row'
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

  const finalDelayBetweenButtons = useMemo(() => {
    if (parameters.instantTextReveal) {
      return 0;
    }
    if (delayBetweenButtons) {
      return delayBetweenButtons;
    }
    return 200;
  }, []);

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

  if (finalDelayBetweenButtons === 0) {
    return (
      // MODIFIÉ : On passe la prop 'direction' au conteneur
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
    // MODIFIÉ : On passe la prop 'direction' au conteneur ici aussi
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
