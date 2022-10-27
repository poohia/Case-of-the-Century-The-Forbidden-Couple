import { createContext, useContext, ReactNode, useMemo } from "react";
import { GlobalCSSComponent } from "../components";

import {
  useTranslations,
  GameProviderHooksInterface,
  useRouter,
  useEnv,
  useSave,
  useApplication,
  useConstants,
} from "./hooks";
import useParameters from "./hooks/useParameters";

interface GameContextInterface extends GameProviderHooksInterface {}

export function createCtx<ContextType>() {
  const ctx = createContext<ContextType | undefined>(undefined);
  function useCtx() {
    const c = useContext(ctx);
    if (!c) throw new Error("useCtx must be inside a Provider with a value");
    return c;
  }
  return [useCtx, ctx.Provider] as const;
}

const [useGameProvider, CtxProvider] = createCtx<GameContextInterface>();

type GameProviderProps = {
  children: ReactNode;
};

const GameProvider = ({ children }: GameProviderProps) => {
  const {
    loaded: loadedParameters,
    parameters,
    setLocale,
    ...useParametersReturns
  } = useParameters();
  const {
    loaded: loadedApplication,
    backgroundColor,
    ...useApplicationReturns
  } = useApplication();
  const { loaded: loadedTranslations, ...useTranslationsReturns } =
    useTranslations(parameters, setLocale);

  const {
    loaded: loadedRouter,
    pushNextScene,
    ...useRouterReturns
  } = useRouter();
  const { loaded: loadedEnv, ...useEnvReturns } = useEnv();
  const { loaded: loadedSave, ...useSaveReturns } = useSave(pushNextScene);
  const { loaded: loadedConstants, ...useConstatsReturns } = useConstants();

  const loaded = useMemo(
    () =>
      loadedParameters &&
      loadedApplication &&
      loadedTranslations &&
      loadedRouter &&
      loadedEnv &&
      loadedSave,
    [
      loadedParameters,
      loadedApplication,
      loadedTranslations,
      loadedRouter,
      loadedEnv,
      loadedSave,
    ]
  );

  if (!loaded) return <div>loading...</div>;

  return (
    <CtxProvider
      value={{
        ...useParametersReturns,
        ...useTranslationsReturns,
        ...useRouterReturns,
        ...useEnvReturns,
        ...useSaveReturns,
        ...useApplicationReturns,
        ...useConstatsReturns,
        parameters,
        loaded,
        backgroundColor,
        setLocale,
        pushNextScene,
      }}
    >
      <GlobalCSSComponent backgroundColor={backgroundColor} />

      {children}
    </CtxProvider>
  );
};

export { useGameProvider };
export default GameProvider;
