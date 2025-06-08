interface State {
  openParameters: boolean;
}

type Action = "openParameters" | "closeParameters";

export const defaultState: State = {
  openParameters: false,
};

const modalParametersGameComponentReducer = (state: State, action: Action) => {
  switch (action) {
    case "openParameters":
      return { ...defaultState, openParameters: true };
    case "closeParameters":
      return defaultState;
  }
};

export default modalParametersGameComponentReducer;
