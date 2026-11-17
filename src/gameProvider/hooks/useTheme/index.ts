import { useCallback, useEffect, useState } from "react";

import { GameProviderHooksDefaultInterface } from "..";
import themeJSON from "../../../GameDevSoftware/theme.json";
import themeModesJSON from "../../../GameDevSoftware/theme.modes.json";
import { ColorModeTypes } from "../../../types";
import { useAssetsInterface } from "../useAssets";

export type ThemeMap = Record<string, Record<string, string>>;

const mergeTheme = (base: ThemeMap, overrides: ThemeMap): ThemeMap => {
  const merged: ThemeMap = { ...base };
  Object.entries(overrides).forEach(([group, values]) => {
    merged[group] = { ...(base[group] ?? {}), ...values };
  });
  return merged;
};

export interface useThemeInterface
  extends GameProviderHooksDefaultInterface, ReturnType<typeof useTheme> {}

const useTheme = (
  getAsset: useAssetsInterface["getAsset"],
  colorMode: ColorModeTypes = "normal"
) => {
  const [theme, setTheme] = useState<ThemeMap>({});
  const [loaded, setLoaded] = useState<boolean>(false);

  const getThemeValue = useCallback(
    (keyParent: string, key: string): string => {
      const value = theme[keyParent]?.[key];
      if (value === undefined) {
        console.warn(
          `Theme value with keyParent "${keyParent}" and key "${key}" doesn't exist`
        );
        return "";
      }
      return value;
    },
    [theme]
  );

  useEffect(() => {
    const resolveThemeValue = (value: unknown): unknown => {
      if (typeof value === "string") {
        if (value.startsWith("@f:")) {
          return value.replace("@f:", "");
        }
        if (value.startsWith("@c:")) {
          return value.replace("@c:", "");
        }

        if (value.startsWith("@a:")) {
          const assetValue = getAsset(value);
          return typeof assetValue === "string" ? assetValue : "";
        }

        return value;
      }

      if (value && typeof value === "object") {
        return Object.fromEntries(
          Object.entries(value).map(([key, entryValue]) => [
            key,
            resolveThemeValue(entryValue),
          ])
        );
      }

      return "";
    };

    const overrides =
      (themeModesJSON as unknown as Record<string, ThemeMap>)[colorMode] ?? {};
    setTheme(
      resolveThemeValue(
        mergeTheme(themeJSON as unknown as ThemeMap, overrides)
      ) as ThemeMap
    );
    setLoaded(true);
  }, [getAsset, colorMode]);

  return {
    theme,
    loaded,
    getThemeValue,
  };
};

export default useTheme;
