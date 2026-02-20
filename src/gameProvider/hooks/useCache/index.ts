import { useEffect, useState } from "react";

import { useCache as useCacheHook } from "../../../hooks";
import { GameProviderHooksDefaultInterface } from "..";
import { useAssetsInterface } from "../useAssets";

export interface useFontsInterface
  extends GameProviderHooksDefaultInterface, ReturnType<typeof useCache> {}

const useCache = (
  getAssetObject: useAssetsInterface["getAssetObject"],
  getAsset: useAssetsInterface["getAsset"]
) => {
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
