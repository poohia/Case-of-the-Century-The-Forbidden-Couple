interface State {
  openParameters: boolean;
  openTextScrollingParameters: boolean;
  openCharactersParameters: boolean;
}

type Action =
  | "openParameters"
  | "closeParameters"
  | "openTextScrollingParameters"
  | "closeTextScrollingParameters"
  | "openCharactersParameters"
  | "closeCharactersParameters";

export const defaultState: State = {
  openParameters: false,
  openTextScrollingParameters: false,
  openCharactersParameters: false,
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
    case "closeCharactersParameters":
    case "closeTextScrollingParameters":
    case "closeParameters":
      return defaultState;
  }
};

export default modalParametersGameComponentReducer;
