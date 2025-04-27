import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import { TranslationComponent } from "../../../../../components";
import { ButtonClassicType } from "../../types";
import ButtonClassicComponent from "../ButtonClassicComponent";

type ButtonClassicGroupComponentProps = {
  buttons: ButtonClassicType[];
  show?: boolean;
  delayBetweenButtons?: number;
  onClick?: (key: string) => void;
};

const ButtonClassicGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ButtonClassicGroupComponent: React.FC<
  ButtonClassicGroupComponentProps
> = ({ buttons, show = false, delayBetweenButtons = 200, onClick }) => {
  const [buttonsToShow, setButtonsToShow] = useState<string[]>([]);
  // useRef pour stocker l'ID de l'intervalle afin de pouvoir le nettoyer
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
      }, delayBetweenButtons);
    }

    return clearExistingInterval;
  }, [show, buttons, delayBetweenButtons]);

  // Optionnel: Si vous ne voulez absolument rien rendre quand show est faux
  // Note: Cela peut causer un "saut" de layout si l'espace n'est pas réservé.
  // Il est souvent préférable de laisser le conteneur et de gérer la visibilité
  // via CSS ou les props 'visible' des enfants.
  // if (!show) {
  //   return null;
  // }

  if (delayBetweenButtons === 0) {
    return (
      <ButtonClassicGroupContainer>
        {buttons.map((button) => (
          <React.Fragment key={`button-${button.key}`}>
            <ButtonClassicComponent
              visible
              {...button}
              onClick={() => {
                if (onClick && !button.disabled) {
                  onClick(button.key);
                }
              }}
            >
              <TranslationComponent id={button.idText} />
            </ButtonClassicComponent>
          </React.Fragment>
        ))}
      </ButtonClassicGroupContainer>
    );
  }

  return (
    <ButtonClassicGroupContainer>
      {buttons.map((button) => (
        <React.Fragment key={`button-${button.key}`}>
          {buttonsToShow.includes(button.key) && (
            <ButtonClassicComponent
              visible
              {...button}
              onClick={() => {
                if (onClick && !button.disabled) {
                  onClick(button.key);
                }
              }}
            >
              <TranslationComponent id={button.idText} />
            </ButtonClassicComponent>
          )}
        </React.Fragment>
      ))}
    </ButtonClassicGroupContainer>
  );
};

export default ButtonClassicGroupComponent;
