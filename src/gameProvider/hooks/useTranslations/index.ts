import { useState, useCallback, useEffect } from "react";
import { I18n } from "i18n-js";
import useGlobalization from "@awesome-cordova-library/globalization/lib/react";

import modules from "../../../GameDevSoftware/modules/index.json";
import languages from "../../../GameDevSoftware/languages.json";
import { GameProviderHooksDefaultInterface } from "..";
import { parallel } from "async";
import { ParametersType } from "../../../types";
import { i18n } from "../../../App";

export interface useTranslationsInterface
  extends GameProviderHooksDefaultInterface {
  i18n: I18n;
  switchLanguage: (language: string) => void;
  translateText: (textId: string) => string;
}

const useTranslations = (
  parameters: ParametersType,
  setLocale: (locale: string) => void
): useTranslationsInterface => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const { getPreferredLanguage } = useGlobalization();

  const switchLanguage = useCallback(
    (language: string) => {
      console.log("switch languages", language);
      i18n.defaultLocale = language;
      i18n.locale = language;
      setLocale(language);
    },
    [setLocale]
  );

  const translateText = useCallback((textId: string) => {
    return i18n.t(textId.replace("@t:", ""));
  }, []);

  useEffect(() => {
    parallel(
      [
        (callback) => {
          const translationsModule: any = {};
          modules.forEach((m) => {
            languages.forEach(({ code }) => {
              if (typeof translationsModule[code] === "undefined") {
                translationsModule[code] = {};
              }
              translationsModule[code] = {
                ...translationsModule[code],
                ...require(`../../../GameDevSoftware/modules/${m}/translations/${code}.json`),
              };
            });
          });
          languages.forEach(({ code }) => {
            translationsModule[code] = {
              ...translationsModule[code],
              ...require(`../../../translations/${code}.json`),
            };
          });
          i18n.translations = translationsModule;
          callback();
        },
        (callback) => {
          if (parameters.locale) {
            i18n.locale = parameters.locale;
            callback();
          } else {
            getPreferredLanguage().then(({ value }) => {
              const languageFind =
                languages.find((language) => value.includes(language.code)) ||
                languages[0];

              i18n.locale = languageFind.code;
              setLocale(languageFind.code);
            });
          }
        },
      ],
      () => {
        setLoaded(true);
      }
    );
  }, [parameters, getPreferredLanguage, setLocale]);

  return { i18n, loaded, switchLanguage, translateText };
};

export default useTranslations;
