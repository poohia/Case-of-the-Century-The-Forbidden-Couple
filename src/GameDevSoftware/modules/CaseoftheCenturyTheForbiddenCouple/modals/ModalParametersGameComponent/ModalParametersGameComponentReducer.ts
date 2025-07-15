interface State {
  openParameters: boolean;
  openCharactersParameters: boolean;
  openScenariosParameters: boolean;
  openNotesInspecteurParameters: boolean;
}

type Action =
  | "openParameters"
  | "closeParameters"
  | "openCharactersParameters"
  | "closeCharactersParameters"
  | "openScenariosParameters"
  | "closeScenariosParameters"
  | "openNotesInspecteurParameters"
  | "closeNotesInspecteurParameters";

export const defaultState: State = {
  openParameters: false,
  openCharactersParameters: false,
  openScenariosParameters: false,
  openNotesInspecteurParameters: false,
};

const modalParametersGameComponentReducer = (
  _state: State,
  action: Action
): State => {
  switch (action) {
    case "openParameters":
      return { ...defaultState, openParameters: true };
    case "openCharactersParameters":
      return { ...defaultState, openCharactersParameters: true };
    case "openScenariosParameters":
      return { ...defaultState, openScenariosParameters: true };
    case "openNotesInspecteurParameters":
      return { ...defaultState, openNotesInspecteurParameters: true };
    case "closeNotesInspecteurParameters":
    case "closeScenariosParameters":
    case "closeCharactersParameters":
    case "closeParameters":
      return defaultState;
  }
};

export default modalParametersGameComponentReducer;
