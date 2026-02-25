import { useCallback, useEffect, useMemo, useReducer } from "react";

import ModalComponent from "..";
import ButtonClassicGroupComponent from "../../ButtonClassicGroupComponent";
import ModalParametersAudioComponent from "./ModalParametersAudioComponent";
import ModalParametersSoundEffectComponent from "./ModalParametersSoundEffectComponent";
import ModalParametersLanguagesComponent from "./ModalParametersLanguagesComponent";
import { useGameProvider } from "../../../gameProvider";
import { ButtonClassicType } from "../../ButtonClassicComponent";
import ModalParametersDialogueSpeedComponent from "./ModalParametersDialogueSpeedComponent";
import ModalParametersAccessibilityComponent from "./ModalParametersAccessibilityComponent";
import ModalParametersVibrationComponent from "./ModalParametersVibrationComponent";

type ParametersState = {
  parameter: boolean;
  parameter_dialogue_speed: boolean;
  parameter_audio: boolean;
  parameter_sound_effect: boolean;
  parameter_languages: boolean;
  parameter_accessibility: boolean;
  parameter_vibration: boolean;
};

type ParametersAction =
  | { type: "OPEN_PARAMETER" }
  | { type: "CLOSE_PARAMETER" }
  | { type: "OPEN_PARAMETER_DIALOGUE_SPEED" }
  | { type: "CLOSE_PARAMETER_DIALOGUE_SPEED" }
  | { type: "OPEN_PARAMETER_AUDIO" }
  | { type: "CLOSE_PARAMETER_AUDIO" }
  | { type: "OPEN_PARAMETER_SOUND_EFFECT" }
  | { type: "CLOSE_PARAMETER_SOUND_EFFECT" }
  | { type: "OPEN_PARAMETER_LANGUAGES" }
  | { type: "CLOSE_PARAMETER_LANGUAGES" }
  | { type: "OPEN_PARAMETER_ACCESSIBILITY" }
  | { type: "CLOSE_PARAMETER_ACCESSIBILITY" }
  | { type: "OPEN_PARAMETER_VIBRATION" }
  | { type: "CLOSE_PARAMETER_VIBRATION" }
  | { type: "RESET" };

const initialState: ParametersState = {
  parameter: false,
  parameter_dialogue_speed: false,
  parameter_audio: false,
  parameter_sound_effect: false,
  parameter_languages: false,
  parameter_accessibility: false,
  parameter_vibration: false,
};

const reducer = (
  state: ParametersState,
  action: ParametersAction
): ParametersState => {
  switch (action.type) {
    case "OPEN_PARAMETER":
      return { ...state, parameter: true };
    case "OPEN_PARAMETER_DIALOGUE_SPEED":
      return { ...state, parameter_dialogue_speed: true };
    case "CLOSE_PARAMETER_DIALOGUE_SPEED":
      return { ...state, parameter_dialogue_speed: false };
    case "OPEN_PARAMETER_AUDIO":
      return { ...state, parameter_audio: true };
    case "CLOSE_PARAMETER_AUDIO":
      return { ...state, parameter_audio: false };
    case "OPEN_PARAMETER_SOUND_EFFECT":
      return { ...state, parameter_sound_effect: true };
    case "CLOSE_PARAMETER_SOUND_EFFECT":
      return { ...state, parameter_sound_effect: false };
    case "OPEN_PARAMETER_LANGUAGES":
      return { ...state, parameter_languages: true };
    case "CLOSE_PARAMETER_LANGUAGES":
      return { ...state, parameter_languages: false };
    case "OPEN_PARAMETER_ACCESSIBILITY":
      return { ...state, parameter_accessibility: true };
    case "CLOSE_PARAMETER_ACCESSIBILITY":
      return { ...state, parameter_accessibility: false };
    case "OPEN_PARAMETER_VIBRATION":
      return { ...state, parameter_vibration: true };
    case "CLOSE_PARAMETER_VIBRATION":
      return { ...state, parameter_vibration: false };
    case "CLOSE_PARAMETER":
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const useHomeParametersReducer = () => useReducer(reducer, initialState);

const ModalParametersComponent: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const { isMobileDevice } = useGameProvider();
  const [state, dispatch] = useHomeParametersReducer();
  const {
    parameter,
    parameter_dialogue_speed,
    parameter_audio,
    parameter_sound_effect,
    parameter_languages,
    parameter_accessibility,
    parameter_vibration,
  } = state;

  const buttonsAction = useMemo<ButtonClassicType[]>(() => {
    const menu = [
      {
        key: "dialogue_speed",
        idText: "parameters_dialogue_speed",
        animate: true,
      },
      {
        key: "audio",
        idText: "parameters_audio",
        animate: true,
      },
      {
        key: "soundEffect",
        idText: "parameters_activate_sound_effect",
        animate: true,
      },
      {
        key: "vibration",
        idText: "parameters_activate_vibration",
        animate: true,
      },
      {
        key: "accessibility",
        idText: "parameters_accessibility",
        animate: true,
      },
      {
        key: "languages",
        idText: "parameters_languages",
        animate: true,
      },
    ];
    if (isMobileDevice) {
      return menu;
    }
    return menu.filter((m) => m.key !== "vibration");
  }, [isMobileDevice]);

  const handleClickButtonsAction = useCallback((key: string) => {
    switch (key) {
      case "dialogue_speed":
        dispatch({ type: "OPEN_PARAMETER_DIALOGUE_SPEED" });
        break;
      case "languages":
        dispatch({ type: "OPEN_PARAMETER_LANGUAGES" });
        break;
      case "audio":
        dispatch({ type: "OPEN_PARAMETER_AUDIO" });
        break;
      case "soundEffect":
        dispatch({ type: "OPEN_PARAMETER_SOUND_EFFECT" });
        break;
      case "vibration":
        dispatch({ type: "OPEN_PARAMETER_VIBRATION" });
        break;
      case "accessibility":
        dispatch({ type: "OPEN_PARAMETER_ACCESSIBILITY" });
        break;
    }
  }, []);

  useEffect(() => {
    if (open) {
      dispatch({ type: "OPEN_PARAMETER" });
    } else {
      dispatch({ type: "CLOSE_PARAMETER" });
    }
  }, [open]);

  return (
    <>
      <ModalComponent
        open={parameter}
        title="parameters_title"
        onClose={onClose}
        inert={
          parameter_audio ||
          parameter_sound_effect ||
          parameter_languages ||
          parameter_dialogue_speed ||
          parameter_accessibility ||
          parameter_vibration
        }
        size="small"
      >
        <div className="with-padding">
          <ButtonClassicGroupComponent
            buttons={buttonsAction}
            show={parameter}
            onClick={handleClickButtonsAction}
          />
        </div>
      </ModalComponent>
      <ModalParametersDialogueSpeedComponent
        open={parameter_dialogue_speed}
        onClose={() => {
          dispatch({ type: "CLOSE_PARAMETER_DIALOGUE_SPEED" });
        }}
      />
      <ModalParametersAudioComponent
        open={parameter_audio}
        onClose={() => {
          dispatch({ type: "CLOSE_PARAMETER_AUDIO" });
        }}
      />
      <ModalParametersSoundEffectComponent
        open={parameter_sound_effect}
        onClose={() => {
          dispatch({ type: "CLOSE_PARAMETER_SOUND_EFFECT" });
        }}
      />
      <ModalParametersLanguagesComponent
        open={parameter_languages}
        onClose={() => {
          dispatch({ type: "CLOSE_PARAMETER_LANGUAGES" });
        }}
      />
      <ModalParametersAccessibilityComponent
        open={parameter_accessibility}
        onClose={() => {
          dispatch({ type: "CLOSE_PARAMETER_ACCESSIBILITY" });
        }}
      />
      <ModalParametersVibrationComponent
        open={parameter_vibration}
        onClose={() => {
          dispatch({ type: "CLOSE_PARAMETER_VIBRATION" });
        }}
      />
    </>
  );
};

export default ModalParametersComponent;
