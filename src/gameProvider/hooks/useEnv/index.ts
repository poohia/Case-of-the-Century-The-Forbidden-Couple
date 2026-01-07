import { useCallback, useEffect, useMemo, useState } from "react";

import { GameProviderHooksDefaultInterface } from "..";
import { EnvType } from "../../../types";
import env_development from "../../../GameDevSoftware/envs/env.development.json";
import env_production from "../../../GameDevSoftware/envs/env.production.json";

export interface useEnvInterface
  extends GameProviderHooksDefaultInterface,
    ReturnType<typeof useEnv> {}

const useEnv = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [variables, setVariables] = useState<Record<string, any>>({});
  const env = useMemo<EnvType>(() => {
    if (process.env.NODE_ENV) {
      return process.env.NODE_ENV;
    } else {
      return "development";
    }
  }, []);
  const demo = useMemo<boolean>(() => {
    return !!(process.env.DEMO && process.env.DEMO === "yes");
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
    demo,
    isDev,
    isProd,
    getEnvVar,
  };
};

export default useEnv;
