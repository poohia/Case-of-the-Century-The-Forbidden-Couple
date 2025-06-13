interface State {
  openParameters: boolean;
  openTextScrollingParameters: boolean;
  openCharactersParameters: boolean;
  openScenariosParameters: boolean;
}

type Action =
  | "openParameters"
  | "closeParameters"
  | "openTextScrollingParameters"
  | "closeTextScrollingParameters"
  | "openCharactersParameters"
  | "closeCharactersParameters"
  | "openScenariosParameters"
  | "closeScenariosParameters";

export const defaultState: State = {
  openParameters: false,
  openTextScrollingParameters: false,
  openCharactersParameters: false,
  openScenariosParameters: false,
};

const modalParametersGameComponentReducer = (
  _state: State,
  action: Action
): State => {
  switch (action) {
    case "openParameters":
      return { ...defaultState, openParameters: true };
    case "openTextScrollingParameters":
      return { ...defaultState, openTextScrollingParameters: true };
    case "openCharactersParameters":
      return { ...defaultState, openCharactersParameters: true };
    case "openScenariosParameters":
      return { ...defaultState, openScenariosParameters: true };
    case "closeScenariosParameters":
    case "closeCharactersParameters":
    case "closeTextScrollingParameters":
    case "closeParameters":
      return defaultState;
  }
};

export default modalParametersGameComponentReducer;
