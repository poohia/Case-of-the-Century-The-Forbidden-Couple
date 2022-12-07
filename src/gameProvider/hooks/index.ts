import { useTranslationsInterface } from "./useTranslations";
import { useRouterInterface } from "./useRouter";
import { useEnvInterface } from "./useEnv";
import { useSaveInterface } from "./useSave";
import { useApplicationInterface } from "./useApplication";
import { useParametersInterface } from "./useParameters";
import { useConstantsInterface } from "./useConstants";
import { useSoundInterface } from "./useSound";

export interface GameProviderHooksDefaultInterface {
  loaded: boolean;
}
export interface GameProviderHooksInterface
  extends useTranslationsInterface,
    useRouterInterface,
    useEnvInterface,
    useSaveInterface,
    useApplicationInterface,
    useParametersInterface,
    useConstantsInterface,
    useSoundInterface {}
export { default as useTranslations } from "./useTranslations";
export { default as useRouter } from "./useRouter";
export { default as useEnv } from "./useEnv";
export { default as useSave } from "./useSave";
export { default as useApplication } from "./useApplication";
export { default as useConstants } from "./useConstants";
export { default as useSound } from "./useSound";
