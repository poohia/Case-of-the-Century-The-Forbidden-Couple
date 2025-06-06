import LocalStorage from "@awesome-cordova-library/localstorage";

import { ParamsRoute, Route } from "../../../types";

type State = {
  route: Route;
  params?: ParamsRoute;
};
type Action = {
  type: "push" | "nextScene";
  value: {
    route: Route;
    params?: ParamsRoute;
  };
};

export const defaultState: State = {
  route:
    process.env.NODE_ENV === "development"
      ? LocalStorage.getItem<Route>("last-path") || "home"
      : "home",
};

const RouterReducer = (state: State, action: Action): State => {
  const { type, value } = action;
  switch (type) {
    case "push":
      if (process.env.NODE_ENV === "development") {
        LocalStorage.setItem<Route>("last-path", value.route);
      }
      return { ...value };
    default:
      return state;
  }
};

export default RouterReducer;
