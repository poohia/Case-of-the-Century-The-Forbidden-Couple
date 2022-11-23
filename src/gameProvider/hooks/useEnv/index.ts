import { useCallback, useMemo } from "react";
import { GameProviderHooksDefaultInterface } from "..";
import { EnvType } from "../../../types";

export interface useEnvInterface extends GameProviderHooksDefaultInterface {
  env: EnvType;
  isDev: boolean;
  isProd: boolean;
  getEnvVar: (key: string) => string | undefined;
}

const useEnv = (): useEnvInterface => {
  const env: EnvType = useMemo(() => {
    if (process.env.REACT_APP_ENV) {
      return process.env.REACT_APP_ENV as EnvType;
    } else {
      return "development";
    }
  }, []);
  const isDev = useMemo(() => env === "development", [env]);
  const isProd = useMemo(() => env === "production", [env]);
  const loaded = useMemo(() => true, []);

  const getEnvVar = useCallback((key: string): string | undefined => {
    return process.env[`REACT_APP_${key}`];
  }, []);

  return {
    loaded,
    env,
    isDev,
    isProd,
    getEnvVar,
  };
};

export default useEnv;
