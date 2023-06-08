import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import useNavigationBar from "@awesome-cordova-library/navigationbar/lib/react";
import { GlobalCSSComponent } from "../components";
import { useStatusBarConfig } from "../hooks";
import {
  useTranslations,
  GameProviderHooksInterface,
  useRouter,
  useEnv,
  useSave,
  useApplication,
  useConstants,
  useSound,
  useSplashscreen,
  useFonts,
  useSmartAppBanner,
  useScreenOrientation,
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
  useStatusBarConfig();
  const { setUp } = useNavigationBar();
  const {
    loaded: loadedParameters,
    parameters,
    setLocale,
    ...useParametersRest
  } = useParameters();

  const { loaded: loadedTranslations, ...useTranslationsRest } =
    useTranslations(parameters, setLocale);

  const {
    loaded: loadedRouter,
    route,
    params,
    pushNextScene,
    ...useRouterRest
  } = useRouter();
  const { loaded: loadedEnv, env, getEnvVar, ...useEnvRest } = useEnv();
  const { loaded: loadedSave, ...useSaveRest } = useSave(pushNextScene);
  const { loaded: loadedConstants, ...useConstatsRest } = useConstants();
  const { loaded: loadedSound, ...useSoundRest } = useSound(
    parameters.activedSound
  );
  const {
    loaded: loadedSplashscreen,
    SplashScreenComponent,
    showSplashscreen,
  } = useSplashscreen(getEnvVar);

  const { loaded: loadedFonts, FontStyle, ...useFontsRest } = useFonts();

  const {
    loaded: loadedApplication,
    backgroundColor,
    primaryFont,
    platform,
    isMobileDevice,
    screenorientation,
    ...useApplicationRest
  } = useApplication(loadedSplashscreen);

  const { loaded: loadedSmartAppBanner, SmartAppBanner } = useSmartAppBanner(
    env,
    platform,
    getEnvVar
  );

  const { loaded: loadedScreenOrientation, ScreenOrientationForce } =
    useScreenOrientation(env, isMobileDevice, screenorientation, getEnvVar);

  useEffect(() => {
    if (
      loadedParameters &&
      loadedApplication &&
      loadedTranslations &&
      loadedRouter &&
      loadedEnv &&
      loadedSave &&
      loadedSound &&
      loadedSplashscreen &&
      loadedFonts &&
      loadedSmartAppBanner &&
      loadedScreenOrientation
    ) {
      setLoaded(true);
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
    loadedSplashscreen,
    loadedFonts,
    loadedSmartAppBanner,
    loadedScreenOrientation,
  ]);

  useEffect(() => {
    setUp(true);
  }, [setUp]);

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
        ...useFontsRest,
        parameters,
        env,
        loaded,
        platform,
        route,
        params,
        backgroundColor,
        primaryFont,
        isMobileDevice,
        screenorientation,
        setLocale,
        pushNextScene,
        getEnvVar,
      }}
    >
      <>
        <ScreenOrientationForce />
        {loaded && <SmartAppBanner />}
        <FontStyle />
        <GlobalCSSComponent
          backgroundColor={backgroundColor}
          primaryFont={primaryFont}
          platform={platform}
        />
        {loaded ? (
          children
        ) : (
          <SplashScreenComponent
            onSplashscreenFinished={() => showSplashscreen(false)}
          />
        )}
      </>
    </CtxProvider>
  );
};

export { useGameProvider };
export default GameProvider;
