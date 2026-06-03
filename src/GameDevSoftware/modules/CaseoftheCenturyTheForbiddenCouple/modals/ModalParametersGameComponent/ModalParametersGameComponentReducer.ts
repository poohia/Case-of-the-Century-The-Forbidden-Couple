interface State {
  openParameters: boolean;
  openCharactersParameters: boolean;
  openScenariosParameters: boolean;
  openNotesInspecteurParameters: boolean;
  openInterrogatoires: boolean;
}

type Action =
  | "openParameters"
  | "closeParameters"
  | "openCharactersParameters"
  | "closeCharactersParameters"
  | "openScenariosParameters"
  | "closeScenariosParameters"
  | "openNotesInspecteurParameters"
  | "closeNotesInspecteurParameters"
  | "openInterrogatoireParameters"
  | "closeInterrogatoireParameters";

export const defaultState: State = {
  openParameters: false,
  openCharactersParameters: false,
  openScenariosParameters: false,
  openNotesInspecteurParameters: false,
  openInterrogatoires: false,
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
    case "openInterrogatoireParameters":
      return { ...defaultState, openInterrogatoires: true };
    case "closeNotesInspecteurParameters":
    case "closeScenariosParameters":
    case "closeCharactersParameters":
    case "closeParameters":
    case "closeInterrogatoireParameters":
      return defaultState;
  }
};

export default modalParametersGameComponentReducer;
