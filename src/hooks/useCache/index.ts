import { useCallback, useRef } from "react";

import { useGameProvider } from "../../gameProvider";
import caches from "../../GameDevSoftware/caches.json";
import { AssertAcceptedType } from "../../types";

type CacheEntry = {
  sceneId: number;
  assets: string[];
};

type GetAssetObjectFn = (name: string) => { type: string; name: string };
type GetAssetFn = (name: string) => string | object;

const typedCaches = caches as CacheEntry[];

const useCache = (
  getAssetObjectArg?: GetAssetObjectFn,
  getAssetArg?: GetAssetFn
) => {
  const gameProvider = useGameProvider();

  const getAssetObject =
    getAssetObjectArg || (gameProvider.getAssetObject as GetAssetObjectFn);
  const getAsset = getAssetArg || (gameProvider.getAsset as GetAssetFn);

  const loadedAssetsRef = useRef<Set<string>>(new Set());
  const loadingAssetsRef = useRef<Map<string, Promise<void>>>(new Map());

  const preloadByType = useCallback(
    (type: AssertAcceptedType, src: string): Promise<void> => {
      return new Promise((resolve) => {
        if (type === "image") {
          const img = new Image();
          img.decoding = "async";

          const onDone = () => {
            img.onload = null;
            img.onerror = null;
            resolve();
          };

          img.onload = onDone;
          img.onerror = onDone;
          img.src = src;

          if (img.complete) {
            onDone();
          }
          return;
        }

        resolve();
      });
    },
    []
  );

  const fetchCacheAssets = useCallback(
    async (assetKeys: string[]) => {
      if (!assetKeys?.length) {
        return;
      }

      if (
        typeof getAssetObject !== "function" ||
        typeof getAsset !== "function"
      ) {
        return;
      }

      const preloadPromises = assetKeys.map((assetKey) => {
        let assetObj: { type: string; name: string } | undefined;
        let src: string | object | undefined;

        try {
          assetObj = getAssetObject(assetKey);
          src = getAsset(assetKey);
        } catch {
          return Promise.resolve();
        }

        if (!assetObj || !src || typeof src !== "string") {
          return Promise.resolve();
        }

        const srcString = String(src);

        if (loadedAssetsRef.current.has(srcString)) {
          return Promise.resolve();
        }

        const inFlight = loadingAssetsRef.current.get(srcString);
        if (inFlight) {
          return inFlight;
        }

        const preloadPromise = preloadByType(
          assetObj.type as AssertAcceptedType,
          srcString
        ).finally(() => {
          loadedAssetsRef.current.add(srcString);
          loadingAssetsRef.current.delete(srcString);
        });

        loadingAssetsRef.current.set(srcString, preloadPromise);
        return preloadPromise;
      });

      await Promise.all(preloadPromises);
    },
    [getAssetObject, getAsset, preloadByType]
  );

  const fetchCachesBySceneIds = useCallback(
    async (sceneIds: number[]) => {
      if (!sceneIds?.length) {
        return;
      }

      const assetKeys = sceneIds.flatMap((sceneId) => {
        const normalizedSceneId = Number(sceneId);
        const entry = typedCaches.find(
          (cacheEntry) => cacheEntry.sceneId === normalizedSceneId
        );

        return entry?.assets ?? [];
      });

      await fetchCacheAssets(assetKeys);
    },
    [fetchCacheAssets]
  );

  return { fetchCachesBySceneIds, fetchCacheAssets };
};

export default useCache;
