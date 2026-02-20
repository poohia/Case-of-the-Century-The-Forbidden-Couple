import { useEffect, useState } from "react";

import { useCache as useCacheHook } from "../../../hooks";
import { GameProviderHooksDefaultInterface } from "..";

export interface useFontsInterface
  extends GameProviderHooksDefaultInterface, ReturnType<typeof useCache> {}

type GetAssetObjectFn = (name: string) => { type: string; name: string };
type GetAssetFn = (name: string) => string | object;

const useCache = (getAssetObject: GetAssetObjectFn, getAsset: GetAssetFn) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const { fetchCachesBySceneIds } = useCacheHook(getAssetObject, getAsset);

  useEffect(() => {
    fetchCachesBySceneIds([-1])
      .catch(() => {})
      .finally(() => {
        setLoaded(true);
      });
  }, [fetchCachesBySceneIds]);

  return {
    loaded,
  };
};

export default useCache;
