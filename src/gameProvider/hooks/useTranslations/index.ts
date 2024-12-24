import { useState, useCallback, useEffect, useMemo } from "react";
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
  isMobileDevice: boolean,
  setLocale: (locale: string) => void
) => {
  const [translations, setTranslations] = useState<
    { key: string; text: string; textComputer?: string; textMobile?: string }[]
  >([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const defaultLocale = useMemo(() => languages[0], []);
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

  const formatCodeSameLanguage = useCallback((code: string): string => {
    if (code.includes("id") || code.includes("in")) return "id";
    if (code.includes("nb") || code.includes("nn") || code.includes("no"))
      return "no";
    if (code.includes("ru") || code.includes("be")) return "ru";
    if (code.includes("pt") || code.includes("pt-BR")) return "pt";
    return code;
  }, []);

  const translateText = useCallback(
    (
      key: string,
      values: { key: string; value: string }[] = [],
      defaultValue: string = key,
      options?: TextTransformOptions
    ) => {
      const translationFind = translations.find(
        (t) => t.key === key.replace("@t:", "")
      );
      let translationText = defaultValue;
      if (translationFind) {
        if (translationFind.textComputer && !isMobileDevice) {
          translationText = translationFind.textComputer;
        } else if (translationFind.textMobile && isMobileDevice) {
          translationText = translationFind.textMobile;
        } else {
          translationText = translationFind.text;
        }
      }
      values.forEach(
        (value) =>
          (translationText = translationText.replace(
            `{${value.key}}`,
            value.value
          ))
      );
      if (translationText === key) {
        console.warn(
          `Translation: id '${key}' not found on language '${parameters.locale}'`
        );
      }
      if (options?.capitalize) {
        translationText =
          translationText.charAt(0).toUpperCase() + translationText.slice(1);
      } else if (options?.toLowercase) {
        translationText = translationText.toLocaleLowerCase();
      } else if (options?.toUppercase) {
        translationText = translationText.toLocaleUpperCase();
      }
      return translationText;
    },
    [translations, parameters]
  );

  useEffect(() => {
    if (parameters.locale === undefined) return;
    if (parameters.locale) {
      loadLanguage(parameters.locale).then(() => setLoaded(true));
    } else {
      getPreferredLanguage()
        .then(({ value }) => {
          const languageFind =
            languages.find((language) =>
              formatCodeSameLanguage(value).includes(language.code)
            ) || defaultLocale;

          setLocale(languageFind.code);
          loadLanguage(languageFind.code).then(() => setLoaded(true));
        })
        .catch(() => {
          loadLanguage(defaultLocale.code).then(() => setLoaded(true));
        });
    }
  }, [parameters, loadLanguage, getPreferredLanguage, setLocale]);

  return {
    translations,
    loaded,
    switchLanguage,
    translateText,
  };
};

export default useTranslations;
