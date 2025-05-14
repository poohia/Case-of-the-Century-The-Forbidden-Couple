import LocalStorage from "@awesome-cordova-library/localstorage";
import { useCallback, useEffect, useMemo, useState } from "react";

import { GameProviderHooksDefaultInterface } from "..";
import { ParametersType } from "../../../types";
import languages from "../../../GameDevSoftware/languages.json";

export interface useParametersInterface
  extends GameProviderHooksDefaultInterface {
  parameters: ParametersType;
  setActivatedSound: (activateSound: boolean) => void;
  setActivatedVibration: (activateVibration: boolean) => void;
  setLocale: (locale: string) => void;
  setParamsValue: <T = any>(key: string, value: T) => void;
}

const useParameters = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [parameters, setParameters] = useState<ParametersType>(() => {
    return (
      LocalStorage.getItem<ParametersType>("parameters") || {
        activedSound: true,
        activatedVibration: true,
        locale: null,
      }
    );
  });

  const setActivatedSound = useCallback((activedSound: boolean) => {
    setParameters((_parameters) => ({ ..._parameters, activedSound }));
  }, []);

  const setActivatedVibration = useCallback((activatedVibration: boolean) => {
    setParameters((_parameters) => ({ ..._parameters, activatedVibration }));
  }, []);

  const setLocale = useCallback((locale: string | null | undefined) => {
    setParameters((_parameters) => ({ ..._parameters, locale }));
  }, []);

  const setParamsValue = useCallback(<T = any>(key: string, value: T) => {
    setParameters((_parameters) => {
      _parameters[key] = value;
      return _parameters;
    });
  }, []);

  useEffect(() => {
    const _parameters = LocalStorage.getItem<ParametersType>("parameters");
    if (_parameters) {
      setActivatedSound(_parameters.activedSound);
      setActivatedVibration(_parameters.activatedVibration);
      if (languages.find((l) => l.code === _parameters.locale)) {
        setLocale(_parameters.locale);
      } else {
        setLocale(null);
      }
    } else {
      setActivatedSound(true);
      setActivatedVibration(true);
      setLocale(null);
      setParameters({
        activedSound: true,
        activatedVibration: true,
        lcoale: null,
      });
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      LocalStorage.setItem("parameters", parameters);
    }
  }, [loaded, parameters]);

  return {
    loaded,
    parameters,
    setActivatedSound,
    setActivatedVibration,
    setLocale,
    setParamsValue,
  };
};

export default useParameters;
