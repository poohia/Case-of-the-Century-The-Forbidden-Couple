import { useCallback, useMemo } from "react";
import globalConstants from "../../../GameDevSoftware/constants.json";
import { GameProviderHooksDefaultInterface } from "..";

export interface useConstantsInterface
  extends GameProviderHooksDefaultInterface,
    ReturnType<typeof useConstants> {}

const useConstants = (isMobileDevice: boolean) => {
  const constants = useMemo(() => globalConstants, []);
  const getValueFromConstant = useCallback(
    <T = any>(key: string): T => {
      const constant = globalConstants.find((constant) => {
        return constant.key === key;
      });

      const value =
        isMobileDevice && constant?.valueMobile
          ? // @ts-ignore
            constant.valueMobile
          : constant?.value;

      if (typeof constant === "undefined" || typeof value === "undefined") {
        throw new Error(`Constant ${key} undefined`);
      }

      return JSON.parse(JSON.stringify(value));
    },
    [isMobileDevice]
  );

  return { constants, loaded: true, getValueFromConstant };
};

export default useConstants;
