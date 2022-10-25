import LocalStorage from "@awesome-cordova-library/localstorage";
import { useEffect, useMemo, useState } from "react";
import { GameProviderHooksDefaultInterface } from "..";
import { ParametersType } from "../../../types";

export interface useParametersInterface
  extends GameProviderHooksDefaultInterface {
  parameters: ParametersType;
  setActivatedSound: (activateSound: boolean) => void;
  setActivatedVibration: (activateVibration: boolean) => void;
  setLocale: (locale: string) => void;
}

const useParameters = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [activedSound, setActivatedSound] = useState<boolean>(true);
  const [activatedVibration, setActivatedVibration] = useState<boolean>(false);
  const [locale, setLocale] = useState<string | undefined>();

  const parameters = useMemo(
    () => ({
      activedSound,
      activatedVibration,
      locale,
    }),
    [activedSound, activatedVibration, locale]
  );

  useEffect(() => {
    const _parameters = LocalStorage.getItem<ParametersType>("parameters");
    if (_parameters) {
      setActivatedSound(_parameters.activedSound);
      setActivatedVibration(_parameters.activatedVibration);
      setLocale(_parameters.locale);
      setLoaded(true);
    } else {
      setLoaded(true);
    }
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
  };
};

export default useParameters;
