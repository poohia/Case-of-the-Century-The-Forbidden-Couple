import { useCallback, useMemo, useReducer } from "react";
import { GameProviderHooksDefaultInterface } from "..";
import { ParamsRoute, Route } from "../../../types";
import RouterReducer, { defaultState } from "./RouterReducer";

export interface useRouterInterface extends GameProviderHooksDefaultInterface {
  route: Route;
  params?: ParamsRoute;
  push: (route: Route, params?: any) => void;
  pushParameters: (backRoute: Route) => void;
  pushNextScene: (sceneId: number) => void;
}

const useRouter = () => {
  const loaded = useMemo(() => true, []);
  const [state, dispatch] = useReducer(RouterReducer, defaultState);
  const { route, params } = state;

  const push = useCallback((route: Route, params?: any) => {
    dispatch({
      type: "push",
      value: { route, params },
    });
  }, []);

  const pushParameters = useCallback((backRoute: Route) => {
    dispatch({
      type: "push",
      value: { route: "parameters", params: { backRoute } },
    });
  }, []);

  const pushNextScene = useCallback((sceneId: number) => {
    dispatch({
      type: "push",
      value: { route: "scene", params: { sceneId } },
    });
  }, []);

  return {
    loaded,
    route,
    params,
    push,
    pushNextScene,
    pushParameters,
  };
};

export default useRouter;
