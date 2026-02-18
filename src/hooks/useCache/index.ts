import { useCallback, useRef } from "react";

import { useGameProvider } from "../../gameProvider";
import caches from "../../GameDevSoftware/caches.json";
import { AssertAcceptedType } from "../../types";

type CacheEntry = {
  sceneId: number;
  assets: string[];
};

const typedCaches = caches as CacheEntry[];

const useCache = () => {
  const { getAssetObject, getAsset } = useGameProvider();

  const loadedAssetsRef = useRef<Set<string>>(new Set());

  const fetchCacheAssets = useCallback((assetKeys: string[]) => {
    assetKeys.forEach((assetKey) => {
      const assetObj = getAssetObject(assetKey);
      const src = getAsset(assetKey);

      if (!assetObj || !src) {
        return;
      }

      const srcString = String(src);

      if (loadedAssetsRef.current.has(srcString)) {
        return;
      }
      loadedAssetsRef.current.add(srcString);

      switch (assetObj.type as AssertAcceptedType) {
        case "image": {
          const img = new Image();
          img.decoding = "async";
          img.src = srcString;
          break;
        }

        case "sound": {
          const audio = new Audio();
          audio.preload = "auto";
          audio.src = srcString;
          audio.load();
          break;
        }

        case "video": {
          const video = document.createElement("video");
          video.preload = "metadata";
          video.src = srcString;
          video.load();
          break;
        }

        default:
          break;
      }
    });
  }, []);

  const fetchCachesBySceneIds = useCallback(
    (sceneIds: number[]) => {
      if (!sceneIds?.length) {
        return;
      }

      sceneIds.forEach((sceneId) => {
        const entry = typedCaches.find((c) => c.sceneId === sceneId);
        if (!entry) {
          return;
        }
        fetchCacheAssets(entry.assets);
      });
    },
    [getAssetObject, getAsset]
  );

  return { fetchCachesBySceneIds, fetchCacheAssets };
};

export default useCache;
