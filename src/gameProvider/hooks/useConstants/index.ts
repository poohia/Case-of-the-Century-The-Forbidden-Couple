import { useEffect, useState, useCallback } from "react";
import globalConstants from "../../../GameDevSoftware/constants.json";
import { ConstantObject } from "../../../types";
import modules from "../../../GameDevSoftware/modules/index.json";
import { GameProviderHooksDefaultInterface } from "..";

export interface useConstantsInterface
  extends GameProviderHooksDefaultInterface {
  constants: ConstantObject[];
  getValueFromConstant: (key: string) => any;
}

const useConstants = (): useConstantsInterface => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [constants, setConstants] = useState<ConstantObject[]>();

  const getValueFromConstant = useCallback(
    (key: string) => {
      const constant = constants?.find(
        (constant) => constant.key === key
      )?.value;
      if (typeof constant === "undefined") {
        throw new Error(`Constant ${key} undefined`);
      }
      return JSON.parse(JSON.stringify(constant));
    },
    [constants]
  );

  useEffect(() => {
    setConstants((_) => {
      const _constants: ConstantObject[] = globalConstants;
      modules.forEach((gameModule) => {
        _constants.push(
          ...require(`../../../GameDevSoftware/modules/${gameModule}/constants.json`)
        );
      });
      return Array.from(_constants);
    });
  }, []);

  useEffect(() => {
    if (constants) {
      setLoaded(true);
    }
  }, [constants]);

  return { constants: constants || [], loaded, getValueFromConstant };
};

export default useConstants;
