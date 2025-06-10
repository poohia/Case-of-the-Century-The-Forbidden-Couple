interface State {
  openParameters: boolean;
  openTextScrollingParameters: boolean;
}

type Action =
  | "openParameters"
  | "closeParameters"
  | "openTextScrollingParameters"
  | "closeTextScrollingParameters";

export const defaultState: State = {
  openParameters: false,
  openTextScrollingParameters: false,
};

const modalParametersGameComponentReducer = (
  state: State,
  action: Action
): State => {
  switch (action) {
    case "openParameters":
      return { ...defaultState, openParameters: true };
    case "openTextScrollingParameters":
      return { ...defaultState, openTextScrollingParameters: true };
    case "closeTextScrollingParameters":
    case "closeParameters":
      return defaultState;
  }
};

export default modalParametersGameComponentReducer;
