import { useCallback, useEffect, useState } from "react";

import { GameProviderHooksDefaultInterface } from "..";
import themeJSON from "../../../GameDevSoftware/theme.json";
import { useAssetsInterface } from "../useAssets";

type ThemeMap = Record<string, Record<string, string>>;

export interface useThemeInterface
  extends GameProviderHooksDefaultInterface, ReturnType<typeof useTheme> {}

const useTheme = (getAsset: useAssetsInterface["getAsset"]) => {
  const [theme, setTheme] = useState<ThemeMap>({});
  const [loaded, setLoaded] = useState<boolean>(false);

  const getThemeValue = useCallback(
    (keyParent: string, key: string): string => {
      const value =
        theme[keyParent] && theme[keyParent][key] ? theme[keyParent][key] : "";
      if (!value) {
        console.warn(
          `Theme valuer with keyParent "${keyParent}" and key "${key}" is empty or dosn't exist`
        );
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

    setTheme(resolveThemeValue(themeJSON) as ThemeMap);
    setLoaded(true);
  }, [getAsset]);

  return {
    theme,
    loaded,
    getThemeValue,
  };
};

export default useTheme;
