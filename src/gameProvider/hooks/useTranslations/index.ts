import { useState, useCallback, useEffect } from "react";
import useGlobalization from "@awesome-cordova-library/globalization/lib/react";

import languages from "../../../GameDevSoftware/languages.json";
import { GameProviderHooksDefaultInterface } from "..";
import { ParametersType } from "../../../types";

export interface useTranslationsInterface
  extends GameProviderHooksDefaultInterface,
    ReturnType<typeof useTranslations> {}

export type TextTransformOptions = {
  capitalize?: boolean;
  toLowercase?: boolean;
  toUppercase?: boolean;
};

const useTranslations = (
  parameters: ParametersType,
  setLocale: (locale: string) => void
) => {
  const [translations, setTranslations] = useState<
    { key: string; text: string }[]
  >([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const { getPreferredLanguage } = useGlobalization();

  const loadLanguage = useCallback(async (language: string) => {
    setTranslations(require(`../../../translations/${language}.json`));
    return;
  }, []);

  const switchLanguage = useCallback(
    (language: string) => {
      setLocale(language);
    },
    [setLocale]
  );

  const translateText = useCallback(
    (
      key: string,
      values: { key: string; value: string }[] = [],
      defaultValue: string = key,
      options?: TextTransformOptions
    ) => {
      let translation =
        translations.find((t) => t.key === key.replace("@t:", ""))?.text ||
        defaultValue;
      values.forEach(
        (value) =>
          (translation = translation.replace(`{${value.key}}`, value.value))
      );
      if (translation === key) {
        console.warn(
          `Translation: id '${key}' not found on language '${parameters.locale}'`
        );
      }
      if (options?.capitalize) {
        translation =
          translation.charAt(0).toUpperCase() + translation.slice(1);
      } else if (options?.toLowercase) {
        translation = translation.toLocaleLowerCase();
      } else if (options?.toUppercase) {
        translation = translation.toLocaleUpperCase();
      }
      return translation;
    },
    [translations, parameters]
  );

  useEffect(() => {
    if (parameters.locale === undefined) return;
    if (parameters.locale) {
      loadLanguage(parameters.locale).then(() => setLoaded(true));
    } else {
      getPreferredLanguage().then(({ value }) => {
        const languageFind =
          languages.find((language) => value.includes(language.code)) ||
          languages[0];

        setLocale(languageFind.code);
        loadLanguage(languageFind.code).then(() => setLoaded(true));
      });
    }
  }, [parameters, loadLanguage, getPreferredLanguage, setLocale]);

  return { translations, loaded, switchLanguage, translateText };
};

export default useTranslations;
