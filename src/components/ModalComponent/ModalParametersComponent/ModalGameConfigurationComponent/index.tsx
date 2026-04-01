import { useEffect, useMemo, useRef, useState } from "react";

import ModalComponent, { ModalChildrenParametersComponentProps } from "../..";
import TranslationComponent from "../../../TranslationComponent";
import { ParametersLanguagesComponent } from "../ModalParametersLanguagesComponent";
import {
  GameConfigurationAccessibilityContainer,
  GameConfigurationAudioConfigurationStyled,
  GameConfigurationAudioOptionsRowStyled,
  GameConfigurationContainerStyled,
  GameConfigurationFooterStyled,
  GameConfigurationMainStyled,
  GameConfigurationSectionStyled,
  GameConfigurationVibrationSectionStyled,
} from "./styled";
import { ButtonClassicType } from "../../../ButtonClassicComponent";
import ButtonClassicGroupComponent from "../../../ButtonClassicGroupComponent";
import { ParametersDialogueSpeedComponent } from "../ModalParametersDialogueSpeedComponent";
import { ParametersVibrationComponent } from "../ModalParametersVibrationComponent";
import { useGameProvider } from "../../../../gameProvider";
import { ParametersAudioComponent } from "../ModalParametersAudioComponent";
import { ParametersSoundEffectComponent } from "../ModalParametersSoundEffectComponent";
import { ParametersAccessibilityInstantTextRevealComponent } from "../ModalParametersAccessibilityComponent/ModalParametersAccessibilityInstantTextRevealComponent";
import { ParametersAccessibilitySizeTextComponent } from "../ModalParametersAccessibilityComponent/ModalParametersAccessibilitySizeTextComponent";
import { ParametersAccessibilityColorModeComponent } from "../ModalParametersAccessibilityComponent/ModalParametersAccessibilityColorModeComponent";
import { ParametersAccessibilityDyslexiaComponent } from "../ModalParametersAccessibilityComponent/ModalParametersAccessibilityDyslexiaComponent";

const MAX_STEP = 4;

const StepParametersLanguagesComponent: React.FC = () => {
  return (
    <GameConfigurationSectionStyled>
      <div>
        <h3>
          <TranslationComponent id="parameters_languages" />
        </h3>
        <div>1/{MAX_STEP}</div>
      </div>
      <div>
        <ParametersLanguagesComponent
          open
          buttonsDirection="row"
          delayBetweenButtons={0}
        />
      </div>
    </GameConfigurationSectionStyled>
  );
};

const StepParametersDialogueSpeedComponent: React.FC = () => {
  return (
    <GameConfigurationSectionStyled>
      <div>
        <h3>
          <TranslationComponent id="parameters_dialogue_speed" />
        </h3>
        <div>2/{MAX_STEP}</div>
      </div>
      <div>
        <ParametersDialogueSpeedComponent
          open
          buttonsDirection="row"
          delayBetweenButtons={0}
        />
      </div>
    </GameConfigurationSectionStyled>
  );
};

const StepParametersAudioComponent: React.FC = () => {
  const { isMobileDevice } = useGameProvider();
  return (
    <GameConfigurationSectionStyled>
      <div>
        <h3>
          <TranslationComponent id="game_configuration_volume" />
        </h3>
        <div>3/{MAX_STEP}</div>
      </div>
      <GameConfigurationAudioConfigurationStyled>
        <GameConfigurationAudioOptionsRowStyled>
          <section>
            <h4>
              <TranslationComponent id="parameters_audio" />
            </h4>
            <ParametersAudioComponent />
          </section>
          <section>
            <h4>
              <TranslationComponent id="parameters_activate_sound_effect" />
            </h4>
            <ParametersSoundEffectComponent />
          </section>
        </GameConfigurationAudioOptionsRowStyled>
        {isMobileDevice && (
          <GameConfigurationVibrationSectionStyled>
            <h4>
              <TranslationComponent id="parameters_activate_vibration" />
            </h4>
            <ParametersVibrationComponent
              open
              buttonsDirection="row"
              delayBetweenButtons={0}
            />
          </GameConfigurationVibrationSectionStyled>
        )}
      </GameConfigurationAudioConfigurationStyled>
    </GameConfigurationSectionStyled>
  );
};

const StepParametersAccessibilityComponent: React.FC = () => {
  return (
    <GameConfigurationSectionStyled>
      <div>
        <h3>
          <TranslationComponent id="parameters_accessibility" />
        </h3>
        <div>4/{MAX_STEP}</div>
      </div>
      <GameConfigurationAccessibilityContainer>
        <section>
          <h4>
            <TranslationComponent id="parameters_instant_text_reveal" />
          </h4>
          <ParametersAccessibilityInstantTextRevealComponent
            open
            buttonsDirection="row"
            delayBetweenButtons={0}
          />
        </section>
        <section>
          <h4>
            <TranslationComponent id="parameters_size_text_title" />
          </h4>
          <ParametersAccessibilitySizeTextComponent
            open
            buttonsDirection="row"
            delayBetweenButtons={0}
          />
        </section>
        <section>
          <h4>
            <TranslationComponent id="parameters_color_mode_title" />
          </h4>
          <ParametersAccessibilityColorModeComponent
            open
            buttonsDirection="row"
            delayBetweenButtons={0}
          />
        </section>
        <section>
          <h4>
            <TranslationComponent id="parameters_activate_dyslexia" />
          </h4>
          <ParametersAccessibilityDyslexiaComponent
            open
            buttonsDirection="row"
            delayBetweenButtons={0}
          />
        </section>
      </GameConfigurationAccessibilityContainer>
    </GameConfigurationSectionStyled>
  );
};

export const GameConfigurationComponent: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [step, setStep] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: 0,
      // @ts-ignore
      behavior: "instant",
    });
  }, [step]);

  const buttonsAction = useMemo<ButtonClassicType[]>(() => {
    if (step === 0) {
      return [
        {
          idText: "game_configuration_next",
          key: "next",
        },
      ];
    }
    if (step >= MAX_STEP - 1) {
      return [
        {
          idText: "parameters_back",
          key: "back",
        },
        {
          idText: "game_configuration_finish",
          key: "finish",
        },
      ];
    }
    return [
      {
        idText: "parameters_back",
        key: "back",
      },
      {
        idText: "game_configuration_next",
        key: "next",
      },
    ];
  }, [step]);

  return (
    <GameConfigurationContainerStyled ref={containerRef}>
      <GameConfigurationMainStyled>
        {step === 0 && <StepParametersLanguagesComponent />}
        {step === 1 && <StepParametersDialogueSpeedComponent />}
        {step === 2 && <StepParametersAudioComponent />}
        {step === 3 && <StepParametersAccessibilityComponent />}
      </GameConfigurationMainStyled>
      <GameConfigurationFooterStyled>
        <ButtonClassicGroupComponent
          buttons={buttonsAction}
          show
          direction="row"
          delayBetweenButtons={0}
          onClick={(key: string) => {
            if (key === "next") {
              setStep(step + 1);
            } else if (key === "back") {
              setStep(step - 1);
            } else if (key === "finish") {
              onClose();
              setStep(0);
            }
          }}
        />
      </GameConfigurationFooterStyled>
    </GameConfigurationContainerStyled>
  );
};

const ModalGameConfigurationComponent: React.FC<
  ModalChildrenParametersComponentProps & {
    onClose: () => void;
  }
> = (props) => {
  const { open, onClose, ...rest } = props;

  return (
    <ModalComponent
      title="parameters_game_configuration_title"
      open={open}
      isChildren
      inert={false}
      {...rest}
    >
      <GameConfigurationComponent onClose={onClose} />
    </ModalComponent>
  );
};
export default ModalGameConfigurationComponent;
