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
import { ParametersAccessibilitySizeTextComponent } from "../ModalParametersAccessibilityComponent/ModalParametersAccessibilitySizeTextComponent";
import { ParametersAccessibilityColorModeComponent } from "../ModalParametersAccessibilityComponent/ModalParametersAccessibilityColorModeComponent";
import { ParametersAccessibilityDyslexiaComponent } from "../ModalParametersAccessibilityComponent/ModalParametersAccessibilityDyslexiaComponent";
import { ParametersAccessibilityScreenReaderEnabledComponent } from "../ModalParametersAccessibilityComponent/ModalParametersAccessibilityScreenReaderEnabledComponent";

const MAX_STEP = 4;

type StepComponentProps = {
  sectionRef?: React.Ref<HTMLElement>;
};

const StepParametersLanguagesComponent: React.FC<StepComponentProps> = ({
  sectionRef,
}) => {
  return (
    <GameConfigurationSectionStyled
      ref={sectionRef}
      tabIndex={-1}
      role="region"
      aria-labelledby="game-configuration-languages-title"
    >
      <div>
        <h3 id="game-configuration-languages-title">
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

const StepParametersDialogueSpeedComponent: React.FC<StepComponentProps> = ({
  sectionRef,
}) => {
  return (
    <GameConfigurationSectionStyled
      ref={sectionRef}
      tabIndex={-1}
      role="region"
      aria-labelledby="game-configuration-dialogue-speed-title"
    >
      <div>
        <h3 id="game-configuration-dialogue-speed-title">
          <TranslationComponent id="parameters_dialogue_speed" />
        </h3>
        <div>2/{MAX_STEP}</div>
      </div>
      <div style={{ height: "fit-content" }}>
        <ParametersDialogueSpeedComponent
          open
          buttonsDirection="row"
          delayBetweenButtons={0}
        />
      </div>
    </GameConfigurationSectionStyled>
  );
};

const StepParametersAudioComponent: React.FC<StepComponentProps> = ({
  sectionRef,
}) => {
  const { isMobileDevice } = useGameProvider();
  return (
    <GameConfigurationSectionStyled
      ref={sectionRef}
      tabIndex={-1}
      role="region"
      aria-labelledby="game-configuration-audio-title"
    >
      <div>
        <h3 id="game-configuration-audio-title">
          <TranslationComponent id="game_configuration_volume" />
        </h3>
        <div>3/{MAX_STEP}</div>
      </div>
      <GameConfigurationAudioConfigurationStyled>
        <GameConfigurationAudioOptionsRowStyled>
          <section
            tabIndex={0}
            role="region"
            aria-labelledby="game-configuration-music-title"
          >
            <h4 id="game-configuration-music-title">
              <TranslationComponent id="parameters_audio" />
            </h4>
            <ParametersAudioComponent />
          </section>
          <section
            tabIndex={0}
            role="region"
            aria-labelledby="game-configuration-sound-effect-title"
          >
            <h4 id="game-configuration-sound-effect-title">
              <TranslationComponent id="parameters_activate_sound_effect" />
            </h4>
            <ParametersSoundEffectComponent />
          </section>
        </GameConfigurationAudioOptionsRowStyled>
        {isMobileDevice && (
          <GameConfigurationVibrationSectionStyled
            tabIndex={0}
            role="region"
            aria-labelledby="game-configuration-vibration-title"
          >
            <h4 id="game-configuration-vibration-title">
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

const StepParametersAccessibilityComponent: React.FC<StepComponentProps> = ({
  sectionRef,
}) => {
  return (
    <GameConfigurationSectionStyled
      ref={sectionRef}
      tabIndex={-1}
      role="region"
      aria-labelledby="game-configuration-accessibility-title"
    >
      <div>
        <h3 id="game-configuration-accessibility-title">
          <TranslationComponent id="parameters_accessibility" />
        </h3>
        <div>4/{MAX_STEP}</div>
      </div>
      <GameConfigurationAccessibilityContainer>
        <section
          tabIndex={0}
          role="region"
          aria-labelledby="game-configuration-screen-reader-title"
        >
          <h4 id="game-configuration-screen-reader-title">
            <TranslationComponent id="parameters_screen_reader_enabled" />
          </h4>
          <ParametersAccessibilityScreenReaderEnabledComponent
            open
            buttonsDirection="row"
            delayBetweenButtons={0}
          />
        </section>
        <section
          tabIndex={0}
          role="region"
          aria-labelledby="game-configuration-size-text-title"
        >
          <h4 id="game-configuration-size-text-title">
            <TranslationComponent id="parameters_size_text_title" />
          </h4>
          <ParametersAccessibilitySizeTextComponent
            open
            buttonsDirection="row"
            delayBetweenButtons={0}
          />
        </section>
        <section
          tabIndex={0}
          role="region"
          aria-labelledby="game-configuration-color-mode-title"
        >
          <h4 id="game-configuration-color-mode-title">
            <TranslationComponent id="parameters_color_mode_title" />
          </h4>
          <ParametersAccessibilityColorModeComponent
            open
            buttonsDirection="row"
            delayBetweenButtons={0}
          />
        </section>
        <section
          tabIndex={0}
          role="region"
          aria-labelledby="game-configuration-dyslexia-title"
        >
          <h4 id="game-configuration-dyslexia-title">
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
  const activeSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: 0,
      // @ts-ignore
      behavior: "instant",
    });
    activeSectionRef.current?.focus({ preventScroll: true });
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
      <GameConfigurationMainStyled aria-live="polite">
        {step === 0 && (
          <StepParametersLanguagesComponent sectionRef={activeSectionRef} />
        )}
        {step === 1 && (
          <StepParametersDialogueSpeedComponent sectionRef={activeSectionRef} />
        )}
        {step === 2 && (
          <StepParametersAudioComponent sectionRef={activeSectionRef} />
        )}
        {step === 3 && (
          <StepParametersAccessibilityComponent sectionRef={activeSectionRef} />
        )}
      </GameConfigurationMainStyled>
      <GameConfigurationFooterStyled
        role="navigation"
        aria-label="game configuration navigation"
      >
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
