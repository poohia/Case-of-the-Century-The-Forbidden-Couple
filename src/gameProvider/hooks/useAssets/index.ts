import { useCallback } from "react";

import assets from "../../../GameDevSoftware/assets.json";
import { Platform } from "../../../types";
import { GameProviderHooksDefaultInterface } from "..";

export interface useAssetsInterface
  extends GameProviderHooksDefaultInterface, ReturnType<typeof useAssets> {}

const useAssets = (
  platform: Platform | null,
  getValueFromConstant: <T = any>(key: string) => T
) => {
  const getAlt = useCallback((name: string) => {
    const findAsset = assets.find(
      (asset: { type: string; name: string }) =>
        asset.name === name.replace("@a:", "")
    );

    if (!findAsset) {
      throw new Error(`Asset not found ${name.replace("@a:", "")}`);
    }

    // @ts-ignore
    return findAsset.alt || "";
  }, []);

  const getAsset = useCallback((name: string): string | object => {
    if (name.startsWith("assets/")) {
      return name;
    }
    const findAsset = assets.find(
      (asset: { type: string; name: string }) =>
        asset.name === name.replace("@a:", "")
    );

    if (!findAsset) {
      throw new Error(`Asset not found ${name.replace("@a:", "")}`);
    }

    if (findAsset.type === "json") {
      return JSON.parse(
        JSON.stringify(
          require(
            `../../../GameDevSoftware/configurationsFiles/${name.replace(
              "@a:",
              ""
            )}`
          ).default
        )
      );
    }

    const { name: nameAsset } = findAsset;

    return `assets/${findAsset.type}/${nameAsset}`;
  }, []);

  const getAssetImg = useCallback(
    (name: string): string => {
      return getAsset(name) as string;
    },
    [getAsset]
  );
  const getAssetVideo = useCallback(
    (name: string): string => {
      return getAsset(name) as string;
    },
    [getAsset]
  );
  const getAssetSound = useCallback(
    (name: string): string => {
      if (!platform) {
        return getAsset(name) as string;
      }
      let prefix = "";
      if (platform === "android") {
        prefix = "/android_asset/public/";
      } else if (platform === "ios") {
        prefix = "/";
      }
      return `${prefix}${getAsset(name) as string}`;
    },
    [platform, getAsset]
  );
  const getConfigurationFile = useCallback(
    <T = {}>(name: string): T => {
      return getAsset(name) as T;
    },
    [getAsset]
  );
  const getAssetFromConstant = useCallback(
    (key: string) => {
      const constantValue = getValueFromConstant(key);
      if (typeof constantValue !== "string") {
        throw new Error(
          `Asset not found, constant value from ${key} isn't a string`
        );
      }
      return getAsset(constantValue);
    },
    [getAsset]
  );

  return {
    loaded: true,
    getAsset,
    getAssetImg,
    getAssetVideo,
    getAssetSound,
    getConfigurationFile,
    getAssetFromConstant,
    getAlt,
  };
};

export default useAssets;
