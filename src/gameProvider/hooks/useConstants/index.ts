import { useCallback, useMemo } from "react";
import globalConstants from "../../../GameDevSoftware/constants.json";
import { ConstantObject } from "../../../types";
import { GameProviderHooksDefaultInterface } from "..";

export interface useConstantsInterface
  extends GameProviderHooksDefaultInterface {
  constants: ConstantObject[];
  getValueFromConstant: (key: string) => any;
}

const useConstants = (): useConstantsInterface => {
  const constants = useMemo(() => globalConstants, []);
  const getValueFromConstant = useCallback((key: string) => {
    const constant = globalConstants.find(
      (constant) => constant.key === key
    )?.value;
    if (typeof constant === "undefined") {
      throw new Error(`Constant ${key} undefined`);
    }
    return JSON.parse(JSON.stringify(constant));
  }, []);

  return { constants, loaded: true, getValueFromConstant };
};

export default useConstants;
