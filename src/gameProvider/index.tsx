import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { GlobalCSSComponent } from "../components";
import { useScreenOrientationConfig, useStatusBarConfig } from "../hooks";

import {
  useTranslations,
  GameProviderHooksInterface,
  useRouter,
  useEnv,
  useSave,
  useApplication,
  useConstants,
  useSound,
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
  const [loaded, setLoaded] = useState<boolean>(false);
  useScreenOrientationConfig();
  useStatusBarConfig();
  const {
    loaded: loadedParameters,
    parameters,
    setLocale,
    ...useParametersRest
  } = useParameters();
  const {
    loaded: loadedApplication,
    backgroundColor,
    ...useApplicationRest
  } = useApplication();
  const { loaded: loadedTranslations, ...useTranslationsRest } =
    useTranslations(parameters, setLocale);

  const { loaded: loadedRouter, pushNextScene, ...useRouterRest } = useRouter();
  const { loaded: loadedEnv, env, ...useEnvRest } = useEnv();
  const { loaded: loadedSave, ...useSaveRest } = useSave(pushNextScene);
  const { loaded: loadedConstants, ...useConstatsRest } = useConstants();
  const { loaded: loadedSound, ...useSoundRest } = useSound(
    parameters.activedSound
  );

  useEffect(() => {
    if (
      loadedParameters &&
      loadedApplication &&
      loadedTranslations &&
      loadedRouter &&
      loadedEnv &&
      loadedSave &&
      loadedSound
    ) {
      setTimeout(() => setLoaded(true), env === "development" ? 0 : 4000);
    }
  }, [
    env,
    loadedParameters,
    loadedApplication,
    loadedTranslations,
    loadedRouter,
    loadedEnv,
    loadedSave,
    loadedSound,
  ]);

  useEffect(() => {
    // @ts-ignore
    window.navigationbar.hideNavigationBar();
  }, []);

  return (
    <CtxProvider
      value={{
        ...useParametersRest,
        ...useTranslationsRest,
        ...useRouterRest,
        ...useEnvRest,
        ...useSaveRest,
        ...useApplicationRest,
        ...useConstatsRest,
        ...useSoundRest,
        parameters,
        env,
        loaded,
        backgroundColor,
        setLocale,
        pushNextScene,
      }}
    >
      <>
        <GlobalCSSComponent backgroundColor={backgroundColor} />
        {loaded ? children : <div>loading....</div>}
      </>
    </CtxProvider>
  );
};

export { useGameProvider };
export default GameProvider;
