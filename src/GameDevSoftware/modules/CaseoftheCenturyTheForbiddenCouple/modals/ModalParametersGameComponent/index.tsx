import { useCallback, useContext, useMemo, useReducer } from "react";

import { useGameProvider } from "../../../../../gameProvider";
import modalParametersGameComponentReducer, {
  defaultState,
} from "./ModalParametersGameComponentReducer";
import ModalParametersCharacters from "../ModalParametersCharacters";
import ModalParametersScenarios from "../ModalParametersScenarios";
import ModalParametersNotesInspecteur from "../ModalParametersNotesInspecteur";
import UnlockContext from "../../contexts/UnlockContext";
import { ButtonClassicGroupComponent } from "../../../../../components";
import ModalComponent, {
  ModalChildrenParametersComponentProps,
} from "../../../../../components/ModalComponent";
import ModalParametersComponent from "../../../../../components/ModalComponent/ModalParametersComponent";
import { ButtonClassicType } from "../../../../../components/ButtonClassicComponent";
import ModalInterrogatoires from "../ModalInterrogatoires";

const ModalParametersGameComponent: React.FC<
  ModalChildrenParametersComponentProps
> = (props) => {
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
    openInterrogatoires,
  } = state;

  const { push, getEnvVar, setOpenParameters } = useGameProvider();
  const {
    hasCharactersNotify,
    hasScenariosNotify,
    hasNotesInspecteurNotify,
    hasInterrogatoireNotify,
  } = useContext(UnlockContext);

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
        key: "interrogatoires",
        idText: "interrogatoires_modal_title",
        animate: true,
        notify: hasInterrogatoireNotify,
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
    hasInterrogatoireNotify,
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
      case "interrogatoires":
        dispatch("openInterrogatoireParameters");
        break;
      case "backHome":
        setOpenParameters(false);
        push("home");
        break;
      case "saves":
        setOpenParameters(false);
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
        inert={
          openParameters ||
          openCharactersParameters ||
          openScenariosParameters ||
          openNotesInspecteurParameters
        }
        {...rest}
      >
        <div className="with-padding">
          <ButtonClassicGroupComponent
            buttons={buttonsAction}
            show={open}
            onClick={handleClickButtonsAction}
            direction="row"
          />
        </div>
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
      <ModalInterrogatoires
        open={openInterrogatoires}
        onClose={() => {
          dispatch("closeInterrogatoireParameters");
        }}
      />
    </>
  );
};

export default ModalParametersGameComponent;
