import LocalStorage from "@awesome-cordova-library/localstorage";
import { useCallback, useEffect, useState } from "react";

import { GameProviderHooksDefaultInterface } from "..";
import { ParametersType, SizeTextTypes, ColorModeTypes } from "../../../types";
import languages from "../../../GameDevSoftware/languages.json";

export interface useParametersInterface
  extends GameProviderHooksDefaultInterface {
  parameters: ParametersType;
  setActivatedMusic: (activatedMusic: number) => void;
  setActivatedSoundsEffect: (activateSoundsEffect: number) => void;
  setActivatedVibration: (activateVibration: boolean) => void;
  setActivatedDyslexia: (activatedDyslexia: boolean) => void;
  setSizeText: (sizeText: SizeTextTypes) => void;
  setColorMode: (colorMode: ColorModeTypes) => void;
  setLocale: (locale: string) => void;
  setParamsValue: <T = any>(key: string, value: T) => void;
}

const useParameters = () => {
  const [loaded, setLoaded] = useState(false);
  const [parameters, setParameters] = useState<ParametersType>(() => {
    return (
      LocalStorage.getItem("parameters") || {
        activatedMusic: 1,
        activatedSoundsEffect: 1,
        activatedVibration: true,
        activatedDyslexia: false,
        locale: null,
        sizeText: "normal",
        colorMode: "normal",
      }
    );
  });

  const setActivatedMusic = useCallback((activatedMusic: number) => {
    if (activatedMusic > 1) {
      activatedMusic = 1;
    } else if (activatedMusic < 0) {
      activatedMusic = 0;
    }
    activatedMusic = Number(activatedMusic.toFixed(2));
    setParameters((_parameters) => ({ ..._parameters, activatedMusic }));
  }, []);

  const setActivatedSoundsEffect = useCallback(
    (activatedSoundsEffect: number) => {
      if (activatedSoundsEffect > 1) {
        activatedSoundsEffect = 1;
      } else if (activatedSoundsEffect < 0) {
        activatedSoundsEffect = 0;
      }
      activatedSoundsEffect = Number(activatedSoundsEffect.toFixed(2));
      setParameters((_parameters) => ({
        ..._parameters,
        activatedSoundsEffect,
      }));
    },
    []
  );

  const setActivatedVibration = useCallback((activatedVibration: boolean) => {
    setParameters((_parameters) => ({ ..._parameters, activatedVibration }));
  }, []);

  const setActivatedDyslexia = useCallback((activatedDyslexia: boolean) => {
    setParameters((_parameters) => ({ ..._parameters, activatedDyslexia }));
  }, []);

  const setSizeText = useCallback((sizeText: SizeTextTypes) => {
    setParameters((_parameters) => ({ ..._parameters, sizeText }));
  }, []);

  const setColorMode = useCallback((colorMode: ColorModeTypes) => {
    setParameters((_parameters) => ({ ..._parameters, colorMode }));
  }, []);

  const setLocale = useCallback((locale: string | null | undefined) => {
    document.documentElement.lang = locale || "en";
    setParameters((_parameters) => ({ ..._parameters, locale }));
  }, []);

  const setParamsValue = useCallback(<T = any>(key: string, value: T) => {
    setParameters((_parameters) => ({ ..._parameters, [key]: value }));
  }, []);

  useEffect(() => {
    const _parameters = LocalStorage.getItem("parameters");
    if (_parameters) {
      setActivatedMusic(_parameters.activatedMusic);
      setActivatedVibration(_parameters.activatedVibration);
      if (languages.find((l) => l.code === _parameters.locale)) {
        setLocale(_parameters.locale);
      } else {
        setLocale(null);
      }
      if (_parameters.colorMode) {
        setColorMode(_parameters.colorMode);
      }
    } else {
      setActivatedMusic(1);
      setActivatedSoundsEffect(1);
      setActivatedVibration(true);
      setLocale(null);
      setParameters({
        activatedMusic: 1,
        activatedSoundsEffect: 1,
        activatedVibration: true,
        locale: null,
        activatedDyslexia: false,
        sizeText: "normal",
        colorMode: "normal",
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
    setActivatedMusic,
    setActivatedSoundsEffect,
    setActivatedVibration,
    setActivatedDyslexia,
    setSizeText,
    setColorMode,
    setLocale,
    setParamsValue,
  };
};

export default useParameters;
