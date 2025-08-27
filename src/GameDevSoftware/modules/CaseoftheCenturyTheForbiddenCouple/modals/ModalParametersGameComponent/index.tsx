import { useCallback, useContext, useMemo, useReducer } from "react";

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
import ModalParametersCharacters from "../ModalParametersCharacters";
import ModalParametersScenarios from "../ModalParametersScenarios";
import ModalParametersNotesInspecteur from "../ModalParametersNotesInspecteur";
import NotifyContext from "../../contexts/NotifyContext";

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
    openCharactersParameters,
    openScenariosParameters,
    openNotesInspecteurParameters,
  } = state;

  const { push, getEnvVar } = useGameProvider();
  const { hasCharactersNotify, hasScenariosNotify, hasNotesInspecteurNotify } =
    useContext(NotifyContext);

  const enableSave = useMemo(() => getEnvVar("ENABLE_SAVES"), []);

  const buttonsAction = useMemo<ButtonClassicType[]>(() => {
    const menu: ButtonClassicType[] = [
      {
        key: "characters",
        idText: "message_1749392775687",
        animate: true,
        notify: hasCharactersNotify,
      },
      {
        key: "scenarios",
        idText: "message_1749392803196",
        animate: true,
        notify: hasScenariosNotify,
      },
      {
        key: "notesInspecteur",
        idText: "label_notes_inspecteur",
        animate: true,
        notify: hasNotesInspecteurNotify,
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
  }, [
    enableSave,
    hasCharactersNotify,
    hasScenariosNotify,
    hasNotesInspecteurNotify,
  ]);

  const handleClickButtonsAction = useCallback((key: string) => {
    switch (key) {
      case "parameters":
        dispatch("openParameters");
        break;
      case "scenarios":
        dispatch("openScenariosParameters");
        break;
      case "notesInspecteur":
        dispatch("openNotesInspecteurParameters");
        break;
      case "characters":
        dispatch("openCharactersParameters");
        break;
      case "backHome":
        push("home");
        break;
      case "saves":
        push("saves");
        break;
    }
  }, []);

  if (!open) {
    return <></>;
  }

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
      <ModalParametersNotesInspecteur
        open={openNotesInspecteurParameters}
        onClose={() => {
          dispatch("closeNotesInspecteurParameters");
        }}
      />
    </>
  );
};

export default ModalParametersGameComponent;
