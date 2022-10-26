import { useEffect, useState, useCallback } from "react";
import globalConstants from "../../GameDevSoftware/constants.json";
import { ConstantObject } from "../../types";
import modules from "../../GameDevSoftware/modules/index.json";

const useConstants = () => {
  const [constants, setConstants] = useState<ConstantObject[]>([]);

  const getValueFromConstant = useCallback(
    (key: string) => {
      const constant = constants.find(
        (constant) => constant.key === key
      )?.value;
      if (!constant) {
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
          ...require(`../../GameDevSoftware/modules/${gameModule}/constants.json`)
        );
      });
      return Array.from(_constants);
    });
  }, []);

  return { constants, getValueFromConstant };
};

export default useConstants;
