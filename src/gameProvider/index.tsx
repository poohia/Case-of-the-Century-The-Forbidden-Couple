import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { ThemeProvider } from "styled-components";

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
  useHolidaysOverlay,
  useTheme,
  useCache,
} from "./hooks";
import useParameters from "./hooks/useParameters";

interface GameContextInterface extends GameProviderHooksInterface

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
    push,
    pushNextScene,
    ...useRouterRest
  } = useRouter();
  const { loaded: loadedEnv, env, demo, getEnvVar, ...useEnvRest } = useEnv();
  const { loaded: loadedSave, ...useSaveRest } = useSave({
    demo,
    push,
    pushNextScene,
  });

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
  const { HolidaysOverlayComponent, ...useHolidaysOverlayRest } =
    useHolidaysOverlay(getEnvVar);

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

  const { getAssetSound, getAssetObject, getAsset, ...useAssetsRest } = useAssets(
    platform,
    getValueFromConstant
  );

  const { loaded: loadedTranslations, ...useTranslationsRest } =
    useTranslations(parameters, isMobileDevice, setLocale);

  const { loaded: loadedSound, ...useSoundRest } = useSound(
    parameters.activatedMusic,
    parameters.activatedSoundsEffect,
    platform,
    getAssetSound
  );

  const { ...useVibrateRest } = useVibrate(
    platform,
    parameters.activatedVibration
  );

  const { loaded: loadedTheme, theme, ...restTheme } = useTheme(getAsset);
  const {loaded: loadedCache} = useCache(getAssetObject, getAsset);

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
      loadedScreenOrientation &&
      loadedTheme && loadedCache
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
    loadedTheme,
    loadedCache
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
        ...useHolidaysOverlayRest,
        ...useConstatsRest,
        ...useSoundRest,
        ...useFontsRest,
        ...useAssetsRest,
        ...useVibrateRest,
        ...restTheme,
        appConfig,
        parameters,
        env,
        demo,
        loaded,
        platform,
        route,
        params,
        background,
        primaryFont,
        isMobileDevice,
        setLocale,
        push,
        pushNextScene,
        getEnvVar,
        getValueFromConstant,
        getAssetSound,
        getAsset,
        getAssetObject
      }}
    >
      <ThemeProvider theme={theme}>
        <ScreenOrientationForce />
        <HolidaysOverlayComponent />
        {loaded && <SmartAppBanner />}
        <FontStyle />
        <GlobalCSSComponent
          background={background}
          primaryFont={primaryFont}
          platform={platform}
          activatedDyslexia={parameters.activatedDyslexia}
          sizeText={parameters.sizeText || "normal"}
          colorMode={parameters.colorMode || "normal"}
        />
        {loaded ? (
          children
        ) : (
          <SplashScreenComponent
            onSplashscreenFinished={() => showSplashscreen(false)}
          />
        )}
      </ThemeProvider>
    </Ctx.Provider>
  );
};

export { useGameProvider };
export default GameProvider;
