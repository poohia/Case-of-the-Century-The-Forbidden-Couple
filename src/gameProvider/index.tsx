import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

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
  useAssets,
  useVibrate,
} from "./hooks";
import useParameters from "./hooks/useParameters";

interface GameContextInterface extends GameProviderHooksInterface {}

// export function createCtx<ContextType>() {
//   const ctx = createContext<ContextType | undefined>(undefined);
//   console.log("🚀 ~ ctx:", ctx);
//   function useCtx() {
//     const c = useContext(ctx);
//     if (!c) {
//       throw new Error("useCtx must be inside a Provider with a value");
//     }
//     return c;
//   }
//   return [useCtx, ctx.Provider] as const;
// }

// const [useGameProvider, CtxProvider] = createCtx<GameContextInterface>();

// @ts-ignore
const Ctx = createContext<GameContextInterface>({});
const useGameProvider = () => {
  return useContext(Ctx);
};

type GameProviderProps = {
  children: ReactNode;
};

const GameProvider = ({ children }: GameProviderProps) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  useStatusBarConfig();
  const {
    loaded: loadedParameters,
    parameters,
    setLocale,
    ...useParametersRest
  } = useParameters();

  const {
    loaded: loadedRouter,
    route,
    params,
    pushNextScene,
    ...useRouterRest
  } = useRouter();
  const { loaded: loadedEnv, env, getEnvVar, ...useEnvRest } = useEnv();
  const { loaded: loadedSave, ...useSaveRest } = useSave(pushNextScene);

  const {
    loaded: loadedSplashscreen,
    SplashScreenComponent,
    showSplashscreen,
  } = useSplashscreen(getEnvVar);

  const { loaded: loadedFonts, FontStyle, ...useFontsRest } = useFonts();

  const {
    loaded: loadedApplication,
    appConfig,
    background,
    primaryFont,
    platform,
    isMobileDevice,
    ...useApplicationRest
  } = useApplication(loadedSplashscreen);

  const { loaded: loadedSmartAppBanner, SmartAppBanner } = useSmartAppBanner(
    appConfig,
    env,
    platform,
    getEnvVar
  );

  const { loaded: loadedScreenOrientation, ScreenOrientationForce } =
    useScreenOrientation(appConfig, env, isMobileDevice, getEnvVar);

  const { getValueFromConstant, ...useConstatsRest } =
    useConstants(isMobileDevice);

  const { getAssetSound, ...useAssetsRest } = useAssets(
    platform,
    getValueFromConstant
  );

  const { loaded: loadedTranslations, ...useTranslationsRest } =
    useTranslations(parameters, isMobileDevice, setLocale);

  const { loaded: loadedSound, ...useSoundRest } = useSound(
    parameters.activedSound,
    platform,
    getAssetSound
  );

  const { ...useVibrateRest } = useVibrate(
    platform,
    parameters.activatedVibration
  );

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

  return (
    <Ctx.Provider
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
        ...useAssetsRest,
        ...useVibrateRest,
        appConfig,
        parameters,
        env,
        loaded,
        platform,
        route,
        params,
        background,
        primaryFont,
        isMobileDevice,
        setLocale,
        pushNextScene,
        getEnvVar,
        getValueFromConstant,
        getAssetSound,
      }}
    >
      <>
        <ScreenOrientationForce />
        {loaded && <SmartAppBanner />}
        <FontStyle />
        <GlobalCSSComponent
          background={background}
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
    </Ctx.Provider>
  );
};

export { useGameProvider };
export default GameProvider;
