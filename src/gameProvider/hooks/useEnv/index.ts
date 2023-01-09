import { useCallback, useEffect, useMemo, useState } from "react";
import { GameProviderHooksDefaultInterface } from "..";
import { EnvType } from "../../../types";
import env_development from "../../../GameDevSoftware/envs/env.development.json";
import env_production from "../../../GameDevSoftware/envs/env.production.json";

export interface useEnvInterface extends GameProviderHooksDefaultInterface {
  env: EnvType;
  isDev: boolean;
  isProd: boolean;
  getEnvVar: <T = any>(key: string) => T | undefined;
}

const useEnv = (): useEnvInterface => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [variables, setVariables] = useState<{ [key: string]: any }>({});
  const env: EnvType = useMemo(() => {
    if (process.env.REACT_APP_ENV) {
      return process.env.REACT_APP_ENV as EnvType;
    } else {
      return "development";
    }
  }, []);
  const isDev = useMemo(() => env === "development", [env]);
  const isProd = useMemo(() => env === "production", [env]);

  const getEnvVar = useCallback(
    <T = any>(key: string): T | undefined => {
      const data = variables[key];
      try {
        return JSON.parse(data);
      } catch (_) {
        return data;
      }
    },
    [variables]
  );

  useEffect(() => {
    if (env === "development") {
      setVariables(env_development);
    } else {
      setVariables(env_production);
    }
    setLoaded(true);
  }, [env]);

  return {
    loaded,
    env,
    isDev,
    isProd,
    getEnvVar,
  };
};

export default useEnv;
