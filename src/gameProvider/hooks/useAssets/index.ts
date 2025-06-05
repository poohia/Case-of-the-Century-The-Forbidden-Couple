import { useCallback } from "react";

import assets from "../../../GameDevSoftware/assets.json";
import { AssertAcceptedType, Platform } from "../../../types";
import { GameProviderHooksDefaultInterface } from "..";

export interface useAssetsInterface
  extends GameProviderHooksDefaultInterface,
    ReturnType<typeof useAssets> {}

const useAssets = (
  platform: Platform | null,
  getValueFromConstant: <T = any>(key: string) => T
) => {
  const folderByType = useCallback((type: AssertAcceptedType): string => {
    switch (type) {
      case "image":
        return "images/";
      case "sound":
        return "sounds/";
      case "video":
        return "videos/";
      case "json":
        return "";
    }
  }, []);

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

  const getAsset = useCallback(
    (name: string, type: AssertAcceptedType): string | object => {
      const findAsset = assets.find(
        (asset: { type: string; name: string }) =>
          asset.type === type && asset.name === name.replace("@a:", "")
      );

      if (!findAsset) {
        throw new Error(`Asset not found ${name.replace("@a:", "")}`);
      }

      const typeAsset = folderByType(type);

      if (type === "json") {
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

      return `assets/${typeAsset}${nameAsset}`;
    },
    [folderByType]
  );

  const getAssetImg = useCallback(
    (name: string): string => {
      return getAsset(name, "image") as string;
    },
    [getAsset]
  );
  const getAssetVideo = useCallback(
    (name: string): string => {
      return getAsset(name, "video") as string;
    },
    [getAsset]
  );
  const getAssetSound = useCallback(
    (name: string): string => {
      if (!platform) {
        return getAsset(name, "sound") as string;
      }
      let prefix = "";
      if (platform === "android") {
        prefix = "/android_asset/public/";
      } else if (platform === "ios") {
        prefix = "/";
      }
      return `${prefix}${getAsset(name, "sound") as string}`;
    },
    [platform, getAsset]
  );
  const getConfigurationFile = useCallback(
    <T = {}>(name: string): T => {
      return getAsset(name, "json") as T;
    },
    [getAsset]
  );

  const getAssetByFileName = useCallback(
    (fileName: string): string | object => {
      if (
        fileName.endsWith(".png") ||
        fileName.endsWith(".jpg") ||
        fileName.endsWith(".jpeg")
      ) {
        return getAsset(fileName, "image");
      } else if (fileName.endsWith(".json")) {
        return getAsset(fileName, "json");
      } else if (fileName.endsWith(".mp3")) {
        return getAsset(fileName, "sound");
      } else if (fileName.endsWith(".mp4") || fileName.endsWith(".mkv")) {
        return getAsset(fileName, "video");
      } else {
        throw new Error(`Type of ${fileName} undefined`);
      }
    },
    [getAsset]
  );

  const getAssetFromConstant = useCallback(
    (key: string, type: AssertAcceptedType) => {
      const constantValue = getValueFromConstant(key);
      if (typeof constantValue !== "string") {
        throw new Error(
          `Asset not found, constant value from ${key} isn't a string`
        );
      }
      return getAsset(constantValue, type);
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
    getAssetByFileName,
    getAssetFromConstant,
    getAlt,
  };
};

export default useAssets;
