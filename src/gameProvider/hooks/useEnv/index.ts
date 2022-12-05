import { useCallback, useMemo } from "react";
import { GameProviderHooksDefaultInterface } from "..";
import { EnvType } from "../../../types";

export interface useEnvInterface extends GameProviderHooksDefaultInterface {
  env: EnvType;
  isDev: boolean;
  isProd: boolean;
  getEnvVar: <T = any>(key: string) => T | undefined;
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

  const getEnvVar = useCallback(<T = any>(key: string): T | undefined => {
    const data = process.env[`REACT_APP_${key}`];
    if (data) {
      return JSON.parse(data);
    }
    return undefined;
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
