import LocalStorage from "@awesome-cordova-library/localstorage";
import { useEffect, useMemo, useState } from "react";
import { GameProviderHooksDefaultInterface } from "..";
import { ParametersType } from "../../../types";
import languages from "../../../GameDevSoftware/languages.json";

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
  const [activatedVibration, setActivatedVibration] = useState<boolean>(true);
  const [locale, setLocale] = useState<string | null | undefined>();

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
      if (languages.find((l) => l.code === _parameters.locale)) {
        setLocale(_parameters.locale);
      } else {
        setLocale(null);
      }
    } else {
      setActivatedSound(true);
      setActivatedVibration(true);
      setLocale(null);
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
  };
};

export default useParameters;
