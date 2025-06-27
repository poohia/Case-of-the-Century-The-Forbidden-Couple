import { useCallback, useMemo, useReducer, useState } from "react";

import ModalComponent from "../../components/ModalComponent";
import { ButtonClassicType } from "../../types";
import ButtonClassicGroupComponent from "../../components/ButtonClassicGroupComponent";
import { useGameProvider } from "../../../../../gameProvider";
import ModalParametersComponent, {
  ModalParametersComponentContainer,
  ModalParametersComponentProps,
} from "../ModalParametersComponent";
import modalParametersGameComponentReducer, {
  defaultState,
} from "./ModalParametersGameComponentReducer";
import ModalParametersTextScrollingComponent from "../ModalParametersTextScrollingComponent";
import ModalParametersCharacters from "../ModalParametersCharacters";
import ModalParametersScenarios from "../ModalParametersScenarios";

const ModalParametersGameComponent: React.FC<ModalParametersComponentProps> = (
  props
) => {
  const { open, ...rest } = props;

  const [state, dispatch] = useReducer(
    modalParametersGameComponentReducer,
    defaultState
  );

  const {
    openParameters,
    openTextScrollingParameters,
    openCharactersParameters,
    openScenariosParameters,
  } = state;

  const { push, getEnvVar } = useGameProvider();

  const enableSave = useMemo(() => getEnvVar("ENABLE_SAVES"), []);

  const buttonsAction = useMemo<ButtonClassicType[]>(() => {
    const menu = [
      {
        key: "characters",
        idText: "message_1749392775687",
        animate: true,
      },
      {
        key: "scenarios",
        idText: "message_1749392803196",
        animate: true,
      },
      {
        key: "textScrolling",
        idText: "message_1749545275975",
        animate: true,
      },
      {
        key: "parameters",
        idText: "parameters_title",
        animate: true,
      },
      {
        key: "backHome",
        idText: "message_1749394728402",
        animate: true,
      },
    ];

    if (enableSave) {
      menu.push({
        key: "saves",
        idText: "message_1749394479724",
        animate: true,
      });
    }
    return menu;
  }, [enableSave]);

  const handleClickButtonsAction = useCallback((key: string) => {
    switch (key) {
      case "parameters":
        dispatch("openParameters");
        break;
      case "scenarios":
        dispatch("openScenariosParameters");
        break;
      case "characters":
        dispatch("openCharactersParameters");
        break;
      case "textScrolling":
        dispatch("openTextScrollingParameters");
        break;
      case "backHome":
        push("home");
        break;
      case "saves":
        push("saves");
        break;
    }
  }, []);

  return (
    <>
      <ModalComponent
        title="parameters_game_title"
        open={open}
        size="default"
        {...rest}
      >
        <ModalParametersComponentContainer>
          <ButtonClassicGroupComponent
            buttons={buttonsAction}
            show={open}
            onClick={handleClickButtonsAction}
            direction="row"
          />
        </ModalParametersComponentContainer>
      </ModalComponent>
      <ModalParametersComponent
        open={openParameters}
        onClose={() => {
          dispatch("closeParameters");
        }}
      />
      <ModalParametersTextScrollingComponent
        open={openTextScrollingParameters}
        onClose={() => {
          dispatch("closeTextScrollingParameters");
        }}
      />
      <ModalParametersCharacters
        open={openCharactersParameters}
        onClose={() => {
          dispatch("closeCharactersParameters");
        }}
      />
      <ModalParametersScenarios
        open={openScenariosParameters}
        onClose={() => {
          dispatch("closeScenariosParameters");
        }}
      />
    </>
  );
};

export default ModalParametersGameComponent;
